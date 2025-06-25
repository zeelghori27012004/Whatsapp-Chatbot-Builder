import React from "react";
import VariableInsertDropdown from "./VariableDropDownField";

export function DefaultField({
  formData,
  onChange,
  fieldKey,
  label,
  showVariableDropdown = true,
  errors,
  required = false,
}) {
  const displayLabel = label || fieldKey.replace(/([a-z])([A-Z])/g, "$1 $2");

  const handleVariableInsert = (variable) => {
    const current = formData[fieldKey] || "";
    onChange(fieldKey, current + variable);
  };

  return (
    <div className="mb-4">
      <label className="text-sm font-medium capitalize block mb-1">
        {displayLabel}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* {showVariableDropdown && (
        <VariableInsertDropdown onInsert={handleVariableInsert} />
      )} */}
      <div className="flex items-center border border-gray-300 rounded-md">
        <input
          type="text"
          value={formData[fieldKey] ?? ""}
          onChange={(e) => onChange(fieldKey, e.target.value)}
          className={`h-10 w-full ${
            errors?.[fieldKey] ? "border-red-500" : ""
          }`}
        />
        {showVariableDropdown && (
          <VariableInsertDropdown onInsert={handleVariableInsert} />
        )}
      </div>
      {errors?.[fieldKey] && (
        <p className="text-red-500 text-sm mt-1">{errors[fieldKey]}</p>
      )}
    </div>
  );
}
