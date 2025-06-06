import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";

function EdgeDialog({ edge, onClose, onSave, onDelete }) {
  const [label, setLabel] = useState("");

  useEffect(() => {
    setLabel(edge?.label || "");
  }, [edge]);

  const handleSave = () => {
    onSave({ ...edge, label });
    onClose();
  };

  const handleDelete = () => {
    onDelete(edge.id);
    onClose();
  };

  if (!edge) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        {/* Delete Icon */}
        <button
          onClick={handleDelete}
          className="absolute top-4 right-4 text-red-500 hover:text-red-700"
          title="Delete edge"
        >
          <Trash2 className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-bold mb-4">Edit Edge {edge.id}</h2>

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Label
        </label>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
          placeholder="Edge label"
        />

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
  );
}

export default EdgeDialog;
