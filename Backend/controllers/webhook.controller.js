import projectModel from "../models/project.model.js";
import { processMessage } from "../services/flowExecutor.service.js";


export const verifyWebhook = async (req, res) => {
  const { projectId } = req.params;
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  try {
    const project = await projectModel.findById(projectId);
    if (!project || !project.whatsappWebhookVerifyToken) {
      throw new Error("Project not found or not configured for WhatsApp.");
    }

    if (mode && token) {
      if (mode === "subscribe" && token === project.whatsappWebhookVerifyToken) {
        console.log("WEBHOOK_VERIFIED");
        res.status(200).send(challenge);
      } else {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.error("Error verifying webhook:", error);
    res.status(500).send(error.message);
  }
};

// This controller handles incoming messages
export const handleIncomingMessage = async (req, res) => {
  const { projectId } = req.params;
  const body = req.body;

  console.log("Incoming webhook:", JSON.stringify(body, null, 2));

  // Check if it's a valid WhatsApp notification
  if (body.object === "whatsapp_business_account") {
    const entry = body.entry[0];
    if (entry.changes) {
      const change = entry.changes[0];
      if (
        change.value.messages &&
        change.value.messages[0] &&
        change.value.messages[0].type === "text"
      ) {
        const message = change.value.messages[0];
        const from = message.from; // Sender's phone number
        const msg_body = message.text.body; // The message text

        console.log(`Message from ${from}: "${msg_body}" for project ${projectId}`);
        
       
        await processMessage({
          projectId,
          senderWaId: from,
          messageText: msg_body,
        });
      }
    }
  }
  res.sendStatus(200);
};