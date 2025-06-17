// Constants for labeling and category mapping
const NODE_TYPES = {
  start: "User Message",
  message: "Send Text",
  buttons: "Decision Buttons",
  apiCall: "API Call",
  keywordMatch: "Keyword Match",
  end: "End Flow",
};

export function getNodeLabel(type) {
  return NODE_TYPES[type] || type;
}

const NODE_CATEGORY_MAP = {
  TriggerUserMessage: "start",
  ActionSendText: "message",
  ActionButtons: "buttons",
  ActionApiCall: "apiCall",
  ConditionKeyword: "keywordMatch",
  ControlEndFlow: "end",
};

export function getNodeCategory(type) {
  return NODE_CATEGORY_MAP[type] || type;
}

// Field definitions per node type
const nodeFieldMap = {
  start: { quickReply: "" },
  message: { message: "" },
  buttons: { message: "", buttons: [""] },
  keywordMatch: { keywords: "" },
  apiCall: {
    requestName: "",
    method: "GET",
    url: "",
    authType: "none",
    headers: [],
    username: "",
    password: "",
    bearerToken: "",
    accessToken: "",
  },
};

export function getInitialFields(type) {
  return { ...(nodeFieldMap[type] || { quickReply: "" }) };
}

// Component for rendering fields
import { Plus, X } from "lucide-react";
import { useState } from "react";

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
              <label className="text-sm font-medium block mb-2">
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
                  className="mt-2 text-sm text-blue-600 hover:text-blue-400 flex items-center"
                >
                  <Plus className="mr-1" /> Add Button
                </button>
              )}
            </div>
          );
        }

        if (key === "headers" && Array.isArray(formData.headers)) {
          return (
            <div key={key} className="mb-4">
              <label className="text-sm font-medium block mb-2">Headers</label>
              {formData.headers.map((header, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={header.key}
                    placeholder="Key"
                    onChange={(e) => {
                      const updated = [...formData.headers];
                      updated[i] = { ...updated[i], key: e.target.value };
                      onChange("headers", updated);
                    }}
                    className="flex-1 px-3 py-2 border rounded-md"
                  />
                  <input
                    type="text"
                    value={header.value}
                    placeholder="Value"
                    onChange={(e) => {
                      const updated = [...formData.headers];
                      updated[i] = { ...updated[i], value: e.target.value };
                      onChange("headers", updated);
                    }}
                    className="flex-1 px-3 py-2 border rounded-md"
                  />
                  <button
                    onClick={() => {
                      const updated = formData.headers.filter(
                        (_, j) => j !== i
                      );
                      onChange("headers", updated);
                    }}
                    className="text-red-500"
                  >
                    <X />
                  </button>
                </div>
              ))}
              <button
                onClick={() =>
                  onChange("headers", [
                    ...formData.headers,
                    { key: "", value: "" },
                  ])
                }
                className="text-blue-600 hover:text-blue-400 text-sm flex items-center"
              >
                <Plus className="mr-1" /> Add Header
              </button>
            </div>
          );
        }

        // Conditional fields based on authType
        if (key === "authType") {
          return (
            <div key={key} className="mb-4">
              <label className="text-sm font-medium block mb-1">
                Authentication Method
              </label>
              <div className="flex gap-4 mt-1">
                {["none", "basic", "bearer", "custom"].map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-1 text-sm cursor-pointer"
                  >
                    <input
                      type="radio"
                      checked={formData.authType === type}
                      onChange={() => onChange("authType", type)}
                    />
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </label>
                ))}
              </div>

              {/* Fields based on selected type */}
              {formData.authType === "basic" && (
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="mt-2 space-y-2"
                  autoComplete="on"
                >
                  <input
                    type="text"
                    name="username"
                    autoComplete="username"
                    value={formData.username || ""}
                    onChange={(e) => onChange("username", e.target.value)}
                    placeholder="Username"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  <input
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    value={formData.password || ""}
                    onChange={(e) => onChange("password", e.target.value)}
                    placeholder="Password"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </form>
              )}

              {formData.authType === "bearer" && (
                <input
                  type="text"
                  value={formData.bearerToken || ""}
                  onChange={(e) => onChange("bearerToken", e.target.value)}
                  placeholder="Bearer Token"
                  className="mt-2 w-full px-3 py-2 border rounded-md"
                />
              )}

              {formData.authType === "custom" && (
                <input
                  type="text"
                  value={formData.accessToken || ""}
                  onChange={(e) => onChange("accessToken", e.target.value)}
                  placeholder="Access Token"
                  className="mt-2 w-full px-3 py-2 border rounded-md"
                />
              )}
            </div>
          );
        }

        // Default rendering
        const value = formData[key];
        if (
          [
            "buttons",
            "headers",
            "authType",
            "username",
            "password",
            "bearerToken",
            "accessToken",
          ].includes(key)
        )
          return null;

        return (
          <div key={idx} className="mb-4">
            <label className="text-sm font-medium capitalize block mb-1">
              {key.replace(/([a-z])([A-Z])/g, "$1 $2")}
            </label>
            {typeof value === "boolean" ? (
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
