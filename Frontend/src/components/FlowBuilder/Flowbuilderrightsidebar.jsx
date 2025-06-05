// FlowBuilderRightSidebar.jsx
import React from "react";
import {
  Save,
  RotateCw,
  Eye,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function FlowBuilderRightSidebar({ rightOpen, setRightOpen }) {
  return (
    <div
      className={`absolute top-0 right-0 h-full z-10 bg-white shadow-md transition-all duration-300 flex flex-col items-center ${
        rightOpen ? "w-64 p-4" : "w-20 p-2"
      }`}
    >
      <div className="w-full flex justify-between items-center mb-4">
        <h1 className="text-md font-bold text-center w-full">Flow Builder</h1>
        {rightOpen && (
          <button onClick={() => setRightOpen(false)}>
            <ChevronRight className="transform" />
          </button>
        )}
      </div>

      {[
        {
          label: "Save",
          icon: <Save className="w-5 h-5" />,
        },
        {
          label: "Reset",
          icon: <RotateCw className="w-5 h-5" />,
        },
        {
          label: "Preview",
          icon: <Eye className="w-5 h-5" />,
        },
        {
          label: "Export",
          icon: <Download className="w-5 h-5" />,
        },
      ].map((btn, idx) => (
        <div key={idx} className="flex flex-col items-center mb-4 w-full">
          <button
            className={`flex items-center ${
              rightOpen
                ? "w-full px-4 py-2 rounded-full justify-start"
                : "w-12 h-12 justify-center rounded-full"
            } bg-indigo-500 text-white hover:bg-indigo-600 transition-all duration-300`}
          >
            {btn.icon}
            {rightOpen && <span className="ml-2">{btn.label}</span>}
          </button>
          {!rightOpen && (
            <span className="text-xs mt-1 text-center">{btn.label}</span>
          )}
        </div>
      ))}

      {!rightOpen && (
        <button
          onClick={() => setRightOpen(true)}
          className="absolute top-1/2 -left-5 transform -translate-y-1/2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 shadow"
          aria-label="Open right sidebar"
        >
          <ChevronLeft />
        </button>
      )}
    </div>
  );
}
