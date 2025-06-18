import React from "react";

export function DefaultField({ formData, onChange, fieldKey, label }) {
  const displayLabel = label || fieldKey.replace(/([a-z])([A-Z])/g, "$1 $2");

  return (
    <div className="mb-4">
      <label className="text-sm font-medium capitalize block mb-1">
        {displayLabel}
      </label>
      <input
        type="text"
        value={formData[fieldKey] ?? ""}
        onChange={(e) => onChange(fieldKey, e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
    </div>
  );
}
