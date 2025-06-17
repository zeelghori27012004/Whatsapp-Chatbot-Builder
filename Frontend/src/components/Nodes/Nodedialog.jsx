import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import {
  getInitialFields,
  NodeFieldRenderer,
} from "../FlowBuilder/HelperFunctions";

function BaseNodeDialog({ node, onClose, onSave, onDelete }) {
  if (!node) return null;

  const [formData, setFormData] = useState({});

  useEffect(() => {
    const initialFields = getInitialFields(node.type) || {};
    const existing = node.data?.properties || {};
    const filteredExisting = Object.fromEntries(
      Object.entries(existing).filter(
        ([key]) => key !== "fields" && key !== "isSelected"
      )
    );
    setFormData({ ...initialFields, ...filteredExisting });
  }, [node]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saving node with formData:", formData);
    onSave({
      ...node,
      data: {
        ...node.data,
        properties: formData,
      },
    });
    onClose();
  };

  return (
    <div
      className="absolute inset-0 bg-opacity-30 z-50 flex justify-end items-end p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-opacity-30 backdrop-grayscale-75 z-0"></div>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-lg shadow-lg shadow-indigo-900 w-[500px] max-h-[90vh] overflow-y-auto relative animate-slide-in-right"
      >
        <button
          onClick={() => {
            onDelete(node.id);
            onClose();
          }}
          className="absolute top-4 right-4 text-red-500 hover:text-red-700"
        >
          <Trash2 className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-bold mb-4">Edit Node: {node.data.label}</h2>

        <NodeFieldRenderer formData={formData} onChange={handleChange} />

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default BaseNodeDialog;
