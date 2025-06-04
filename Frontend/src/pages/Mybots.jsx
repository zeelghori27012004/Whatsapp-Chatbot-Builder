import React from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";

const Mybots = () => {
  const navigate = useNavigate();

  const handleCreateFlow = () => {
    navigate("/temporaryaddress"); // Adjust this route based on your routing setup
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold text-gray-800">My Bots</h1>
        <button
          onClick={handleCreateFlow}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <PlusCircle size={20} />
          Create Bot Flow
        </button>
      </div>

      <div className="bg-gray-50 p-10 border border-dashed border-gray-300 rounded-xl text-center shadow-inner">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          No Bots Yet
        </h2>
        <p className="text-gray-600 mb-4">
          Start by creating a chatbot using our drag-and-drop flow builder.
        </p>
        <button
          onClick={handleCreateFlow}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
        >
          Create Your First Bot
        </button>
      </div>
    </div>
  );
};

export default Mybots;
