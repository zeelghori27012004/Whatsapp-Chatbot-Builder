// FlowBuilderLeftSidebar.jsx
import React from "react";
import {
  Zap,
  ListChecks,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function FlowBuilderLeftSidebar({ leftOpen, setLeftOpen }) {
  return (
    <div
      className={`absolute top-0 left-0 h-full z-10 bg-white shadow-md transition-all duration-300 flex flex-col ${
        leftOpen ? "w-64 p-4" : "w-20 p-2 items-center"
      }`}
    >
      <div className="w-full flex justify-between items-center mb-4">
        <h1 className="text-md font-bold text-center w-full">Node Selector</h1>
        {leftOpen && (
          <button onClick={() => setLeftOpen(false)}>
            <ChevronLeft />
          </button>
        )}
      </div>

      {[
        {
          label: "Trigger",
          icon: <Zap className="w-5 h-5" />,
          options: ["First Visit", "User Starts Chat", "Timeout"],
        },
        {
          label: "Condition",
          icon: <ListChecks className="w-5 h-5" />,
          options: ["User Input", "User Property", "Time Check"],
        },
        {
          label: "Action",
          icon: <CheckCircle2 className="w-5 h-5" />,
          options: ["Send Message", "Redirect", "End Chat"],
        },
      ].map((section, idx) => (
        <div
          key={idx}
          className="relative group mb-4 w-full flex flex-col items-center"
        >
          <button
            className={`flex items-center ${
              leftOpen
                ? "w-full px-4 py-2 rounded-full justify-start"
                : "w-12 h-12 justify-center rounded-full"
            } bg-indigo-500 text-white hover:bg-indigo-600 transition-all duration-300`}
          >
            {section.icon}
            {leftOpen && <span className="ml-2">{section.label}</span>}
          </button>

          {!leftOpen && (
            <span className="text-xs mt-1 text-center">{section.label}</span>
          )}

          <div className="absolute top-0 left-full ml-2 w-40 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 scale-95 group-hover:scale-100 transition-all duration-300 z-20 pointer-events-none group-hover:pointer-events-auto">
            <ul className="text-sm py-2">
              {section.options.map((item, i) => (
                <li
                  key={i}
                  className="px-4 py-2 hover:bg-indigo-100 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      {!leftOpen && (
        <button
          onClick={() => setLeftOpen(true)}
          className="absolute top-1/2 -right-5 transform -translate-y-1/2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 shadow"
          aria-label="Open left sidebar"
        >
          <ChevronRight />
        </button>
      )}
    </div>
  );
}
