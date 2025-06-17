import projectModel from "../models/project.model.js";
import redisClient from "./redis.service.js";
import generateReply from "./gptService.js";
import { sendWhatsappMessage } from "./whatsapp.service.js";

// Main function called by the webhook controller
export async function processMessage({
  projectId,
  senderWaPhoneNo,
  messageText,
}) {
  const userStateKey = `flow-state:${senderWaPhoneNo}:${projectId}`;

  const fileTree = await getProjectFileTree(projectId);
  if (!fileTree) return;

  // Check if awaiting button response
  let awaiting;
  try {
    const awaitingStr = await redisClient.get(`${userStateKey}:awaitingButtonResponse`);
    if (awaitingStr) awaiting = JSON.parse(awaitingStr);
  } catch (error) {
    console.error("Redis read error:", error);
  }

  if (awaiting) {
    const { nodeId, buttons } = awaiting;
    const cleanedInput = messageText.trim().toLowerCase();

    const matchedLabel = buttons.find(
      (btn) => btn.trim().toLowerCase() === cleanedInput
    );

    if (matchedLabel) {
      const normalizedLabel = matchedLabel.toLowerCase().replace(/\s+/g, "_");
      const nextNodeId = findNextNode(nodeId, fileTree.edges, normalizedLabel);

      if (nextNodeId) {
        try {
          await redisClient.set(userStateKey, nextNodeId, "EX", 3600);
          await redisClient.del(`${userStateKey}:awaitingButtonResponse`);
          await redisClient.del(`${userStateKey}:buttonInvalidCount`);
        } catch (err) {
          console.error("Redis error while setting nextNodeId:", err);
        }

        await executeNode(nextNodeId, {
          projectId,
          senderWaPhoneNo,
          messageText,
          fileTree,
          userStateKey,
        });
        return;
      }
    } else {
      // Handle invalid response with retry tracking
      const invalidCountKey = `${userStateKey}:buttonInvalidCount`;
      let invalidCount = 0;
      try {
        const countStr = await redisClient.get(invalidCountKey);
        invalidCount = countStr ? parseInt(countStr, 10) : 0;
      } catch (err) {
        console.error("Error reading invalid count from Redis:", err);
      }

      invalidCount += 1;

      if (invalidCount >= 3) {
        console.warn(`User ${senderWaPhoneNo} exceeded invalid attempts. Ending flow.`);

        await redisClient.del(userStateKey);
        await redisClient.del(`${userStateKey}:awaitingButtonResponse`);
        await redisClient.del(invalidCountKey);

        const endNode = fileTree.nodes.find((n) => n.type === "end");
        if (endNode) {
          await executeNode(endNode.id, {
            projectId,
            senderWaPhoneNo,
            messageText,
            fileTree,
            userStateKey,
          });
        } else {
          await sendWhatsappMessage({
            to: senderWaPhoneNo,
            text: "Too many invalid responses. Ending conversation.",
            projectId,
          });
        }

        return;
      }

      try {
        await redisClient.set(invalidCountKey, invalidCount.toString(), "EX", 3600);
      } catch (err) {
        console.error("Error saving invalid count to Redis:", err);
      }

      await sendWhatsappMessage({
        to: senderWaPhoneNo,
        text: `Invalid response. Please choose one of the buttons. (${invalidCount}/3 attempts used)`,
        projectId,
      });
      return;
    }
  }

  // Start or continue normal flow
  let currentNodeId;
  try {
    currentNodeId = await redisClient.get(userStateKey);
  } catch (err) {
    console.error("Redis error while getting currentNodeId:", err);
  }

  if (!currentNodeId) {
    const startNode = fileTree.nodes.find((node) => node.type === "start");
    if (!startNode) {
      console.error("No start node found.");
      return;
    }
    currentNodeId = startNode.id;
  }

  await executeNode(currentNodeId, {
    projectId,
    senderWaPhoneNo,
    messageText,
    fileTree,
    userStateKey,
  });
}

// Execute a node
async function executeNode(nodeId, context) {
  const { fileTree, userStateKey } = context;
  const node = fileTree.nodes.find((n) => n.id === nodeId);
  if (!node) {
    console.error(`Node with ID ${nodeId} not found.`);
    await redisClient.del(userStateKey);
    return;
  }

  console.log(`Executing node ${node.id} of type ${node.type}`);

  const quickReply = node.data?.properties?.quickReply;
  if (quickReply) {
    await sendWhatsappMessage({
      to: context.senderWaPhoneNo,
      text: quickReply,
      projectId: context.projectId,
    });
  }

  let nextNodeId = null;

  switch (node.type) {
    case "start":
      nextNodeId = findNextNode(node.id, fileTree.edges);
      break;

    case "message":
      const message = node.data?.properties?.message || "Default message";
      await sendWhatsappMessage({
        to: context.senderWaPhoneNo,
        text: message,
        projectId: context.projectId,
      });
      nextNodeId = findNextNode(node.id, fileTree.edges);
      break;

    case "keywordMatch":
      const keywords = (node.data?.properties?.keywords || "")
        .split(",")
        .map((k) => k.trim().toLowerCase());

      const matches = keywords.some((k) =>
        context.messageText.toLowerCase().includes(k)
      );

      nextNodeId = findNextNode(
        node.id,
        fileTree.edges,
        matches ? "true" : "false"
      );

      if (!nextNodeId) {
        console.warn("No matching keyword edge. Ending flow.");
        await redisClient.del(userStateKey);
        return;
      }
      break;

    case "buttons":
      const buttonText = node.data?.properties?.message || "Choose an option:";
      const buttons = node.data?.properties?.buttons || [];

      const formattedButtons = buttons.map((btn) => ({
        type: "reply",
        reply: {
          id: btn.toLowerCase().replace(/\s+/g, "_"),
          title: btn,
        },
      }));

      await sendWhatsappMessage({
        to: context.senderWaPhoneNo,
        text: buttonText,
        projectId: context.projectId,
        buttons: formattedButtons,
      });

      try {
        await redisClient.set(
          `${userStateKey}:awaitingButtonResponse`,
          JSON.stringify({
            nodeId: node.id,
            buttons: buttons.map((btn) => btn.trim().toLowerCase()),
          }),
          "EX",
          3600
        );
        await redisClient.del(`${userStateKey}:buttonInvalidCount`);
      } catch (err) {
        console.error("Redis error while setting button state:", err);
      }
      return;

    case "end":
      console.log("Flow ended by end node.");
      await redisClient.del(userStateKey);
      return;

    default:
      console.warn(`Unsupported node type: ${node.type}`);
      await sendWhatsappMessage({
        to: context.senderWaPhoneNo,
        text: "Something went wrong. Please try again later.",
        projectId: context.projectId,
      });
      await redisClient.del(userStateKey);
      return;
  }

  const waitForReply = node.data?.properties?.waitForUserReply === true;

  if (nextNodeId) {
    try {
      await redisClient.set(userStateKey, nextNodeId, "EX", 3600);
    } catch (err) {
      console.error("Redis error while setting next node:", err);
    }

    if (!waitForReply) {
      await executeNode(nextNodeId, context);
    } else {
      console.log(`Waiting for user reply before continuing from node ${node.id}`);
    }
  } else {
    console.log(`Flow ended. No next node from ${node.id}.`);
    await redisClient.del(userStateKey);
  }
}

// Fetch fileTree from DB
async function getProjectFileTree(projectId) {
  try {
    const project = await projectModel.findById(projectId).select("fileTree");
    return project?.fileTree || null;
  } catch (error) {
    console.error("Error fetching project fileTree:", error);
    return null;
  }
}

// Find next node from edge based on label
function findNextNode(sourceNodeId, edges, conditionLabel = null) {
  if (conditionLabel) {
    return (
      edges.find((e) => e.source === sourceNodeId && e.label === conditionLabel)
        ?.target || null
    );
  }
  return edges.find((e) => e.source === sourceNodeId)?.target || null;
}
