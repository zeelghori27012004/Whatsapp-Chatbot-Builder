import { useState } from "react";
import { useVariableContext } from "../../../context/Variable.context";

export default function VariableInsertDropdown({ onInsert }) {
  const { variables } = useVariableContext();
  const [showDropdown, setShowDropdown] = useState(false);

  if (!variables.length) return null;

  const handleSelect = (e) => {
    const selected = e.target.value;
    if (selected) {
      onInsert(`{{${selected}}}`);
      setShowDropdown(false); // auto-close after insert
    }
  };

  return (
    <div className="mb-2 relative inline-block">
      <button
        type="button"
        onClick={() => setShowDropdown(!showDropdown)}
        className="text-sm px-2 py-1 border border-gray-400 rounded-md bg-white hover:bg-gray-100 transition"
      >
        + Variable
      </button>

      {showDropdown && (
        <select
          onChange={handleSelect}
          defaultValue=""
          className="absolute z-10 mt-1 w-40 px-2 py-1 border rounded-md bg-white shadow-md"
        >
          <option value="">Select variable</option>
          {variables.map((v, i) => (
            <option key={i} value={v}>
              {`{{${v}}}`}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
