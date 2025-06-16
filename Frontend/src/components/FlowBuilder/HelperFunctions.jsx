import { Plus, X } from "lucide-react";
import { ActionButtons } from "../Nodes/NodeWrapper";

export function getNodeLabel(type) {
  const map = {
    start: "User Message",
    // TriggerNewChat: "New Chat",
    message: "Send Text",
    buttons: "Give Options",
    // ActionSendMedia: "Send Media",
    // ActionQuickReply: "Quick Reply",
    // ActionDelay: "Delay",
    // ActionSetVariable: "Set Variable",
    // ActionApiCall: "API Call",
    condition: "Keyword Match",
    // ConditionVariable: "Variable Check",
    // ControlGoto: "Go To Node",
    end: "End Flow",
    // ConditionInputAsk: "Ask Input",
    // ConditionAiGpt: "GPT Reply",
    // ConditionDebugLog: "Get Log",
  };
  return map[type] || type;
}
export function getNodeCategory(type) {
  const map = {
    TriggerUserMessage: "start",
    // TriggerNewChat: "New Chat",
    ActionSendText: "message",
    ActionButtons: "buttons",
    // ActionSendMedia: "Send Media",
    // ActionQuickReply: "Quick Reply",
    // ActionDelay: "Delay",
    // ActionSetVariable: "Set Variable",
    // ActionApiCall: "API Call",
    ConditionKeyword: "condition",
    // ConditionVariable: "Variable Check",
    // ControlGoto: "Go To Node",
    ControlEndFlow: "end",
    // ConditionInputAsk: "Ask Input",
    // ConditionAiGpt: "GPT Reply",
    // ConditionDebugLog: "Get Log",
  };
  return map[type] || type;
}
// export function getNodeCategory(type) {
//   if (type.startsWith("Trigger")) return "trigger";
//   if (type.startsWith("Action")) return "action";
//   if (type.startsWith("Condition")) return "condition";
//   if (type.startsWith("Control")) return "control";
//   if (type.startsWith("Input")) return "input";
//   if (type.startsWith("Ai")) return "ai";
//   if (type.startsWith("Debug")) return "debug";
//   return "unknown";
// }

export function getInitialFields(type) {
  switch (type) {
    case "start":
      return { quickReply: "" };
    case "message":
      return { message: "" };
    case "ActionDelay":
      return { seconds: 2 };
    case "buttons":
      return { message: "", buttons: [""] };
    case "condition":
      return { keywords: "" };
    case "ActionSetVariable":
      return { variable: "", value: "" };
    case "ActionApiCall":
      return { url: "", method: "GET" };
    default:
      return { quickReply: "" };
  }
}

export function NodeFieldRenderer({ formData, onChange }) {
  const keys = Object.keys(formData);

  if (keys.length === 0)
    return <p className="mb-2">No editable fields for this node.</p>;

  return (
    <>
      {keys.map((key, idx) => {
        if (key === "buttons" && Array.isArray(formData.buttons)) {
          return (
            <div key={idx} className="mb-4">
              <label className="text-sm font-medium capitalize block mb-2">
                Button Options
              </label>

              {formData.buttons.map((btn, i) => (
                <div key={i} className="flex items-center mb-2 space-x-2">
                  <input
                    type="text"
                    value={btn}
                    onChange={(e) => {
                      const updated = [...formData.buttons];
                      updated[i] = e.target.value;
                      onChange("buttons", updated);
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                    placeholder={`Button ${i + 1}`}
                  />
                  <button
                    onClick={() => {
                      const updated = formData.buttons.filter(
                        (_, j) => j !== i
                      );
                      onChange("buttons", updated);
                    }}
                    className="text-red-500 hover:text-red-700"
                    disabled={formData.buttons.length <= 1}
                    title="Remove Button"
                  >
                    <X />
                  </button>
                </div>
              ))}

              {formData.buttons.length < 3 && (
                <button
                  onClick={() => onChange("buttons", [...formData.buttons, ""])}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-400 flex justify-center items-center"
                >
                  <Plus /> Add Button
                </button>
              )}
            </div>
          );
        }

        // default renderer for other types
        const value = formData[key];
        const isBoolean = typeof value === "boolean";
        const label = key.replace(/([a-z])([A-Z])/g, "$1 $2");

        return (
          <div key={idx} className="mb-4">
            <label className="text-sm font-medium capitalize block mb-1">
              {label}
            </label>

            {isBoolean ? (
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => onChange(key, e.target.checked)}
                className="w-5 h-5"
              />
            ) : (
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(key, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            )}
          </div>
        );
      })}
    </>
  );
}
