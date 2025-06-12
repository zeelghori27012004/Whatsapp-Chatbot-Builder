import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { getInitialFields } from "../FlowBuilder/HelperFunctions"; // make sure it's imported

function BaseNodeDialog({ node, onClose, onSave, onDelete }) {
  if (!node) return null;

  const [formData, setFormData] = useState({});

  useEffect(() => {
    const initialFields = getInitialFields(node.type) || {};
    const existing = node.data?.properties?.fields || {};
    setFormData({ ...initialFields, ...existing });
  }, [node]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave({
      ...node,
      data: {
        ...node.data,
        fields: formData,
      },
    });
    onClose();
  };

  const renderFields = () => {
    const keys = Object.keys(formData);
    if (keys.length === 0) return <p>No editable fields for this node.</p>;

    return keys.map((key, idx) => (
      <div key={idx} className="mb-4">
        <label className="text-sm font-medium capitalize block mb-1">
          {key.replace(/([a-z])([A-Z])/g, "$1 $2")}
        </label>
        <input
          type="text"
          value={formData[key]}
          onChange={(e) => handleChange(key, e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
    ));
  };

  return (
    <div className="fixed inset-0 bg-opacity-30 z-50">
      <div className="absolute bottom-6 right-6">
        <div className="bg-white p-6 rounded-lg shadow-lg shadow-indigo-900 w-96 relative animate-slide-in-right">
          <button
            onClick={() => {
              onDelete(node.id);
              onClose();
            }}
            className="absolute top-4 right-4 text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-5 h-5" />
          </button>

          <h2 className="text-lg font-bold mb-4">
            Edit Node: {node.data.label}
          </h2>
          {renderFields()}

          <div className="flex justify-end gap-2">
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
    </div>
  );
}

export default BaseNodeDialog;
