// src/components/fields/StartFields.jsx
import React from "react";
import { DefaultField } from "./DefaultField";
import { BooleanField } from "./BooleanField";
import { ArrayInput } from "./ArrayInput";
import { X } from "lucide-react";
export function StartFields({ formData, onChange }) {
  return (
    <>
      <ArrayInput
        label="Keywords/Phrases to Match"
        items={formData.keywords || []}
        onChange={(newKeywords) => onChange("keywords", newKeywords)}
        newItemValue=""
        addButtonLabel="Add Keyword/Phrase"
        maxItems={5}
        minItems={1}
        placeholder="Keyword"
        renderItem={({
          item,
          index,
          onChange,
          onRemove,
          isRemoveDisabled,
          placeholder,
        }) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              value={item}
              onChange={(e) => onChange(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              placeholder={placeholder}
            />
            <button
              onClick={onRemove}
              className="text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isRemoveDisabled}
              title="Remove Keyword"
            >
              <X />
            </button>
          </div>
        )}
      />
      <BooleanField
        formData={formData}
        onChange={onChange}
        fieldKey="waitForReply"
        label="Wait for user reply after trigger"
      />
    </>
  );
}
