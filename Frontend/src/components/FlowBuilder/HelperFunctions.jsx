export function getNodeLabel(type) {
  const map = {
    TriggerUserMessage: "User Message",
    TriggerNewChat: "New Chat",
    ActionSendText: "Send Text",
    ActionSendMedia: "Send Media",
    ActionQuickReply: "Quick Reply",
    ActionDelay: "Delay",
    ActionSetVariable: "Set Variable",
    ActionApiCall: "API Call",
    ConditionKeyword: "Keyword Match",
    ConditionVariable: "Variable Check",
    ControlGoto: "Go To Node",
    ControlEndFlow: "End Flow",
    ConditionInputAsk: "Ask Input",
    ConditionAiGpt: "GPT Reply",
    ConditionDebugLog: "Get Log",
  };
  return map[type] || type;
}

export function getNodeCategory(type) {
  if (type.startsWith("Trigger")) return "trigger";
  if (type.startsWith("Action")) return "action";
  if (type.startsWith("Condition")) return "condition";
  if (type.startsWith("Control")) return "control";
  if (type.startsWith("Input")) return "input";
  if (type.startsWith("Ai")) return "ai";
  if (type.startsWith("Debug")) return "debug";
  return "unknown";
}

export function getInitialFields(type) {
  switch (type) {
    case "TriggerUserMessage":
      return { prompt: "" };
    case "ActionSendText":
      return { message: "" };
    case "ActionDelay":
      return { seconds: 2 };
    case "ConditionKeyword":
      return { keywords: "" };
    case "ActionSetVariable":
      return { variable: "", value: "" };
    case "ActionApiCall":
      return { url: "", method: "GET" };
    default:
      return {};
  }
}
