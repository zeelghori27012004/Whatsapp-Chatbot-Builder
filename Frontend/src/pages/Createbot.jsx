import React, { useCallback, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Start" },
    position: { x: 250, y: 5 },
  },
  {
    id: "2",
    data: { label: "Send Message" },
    position: { x: 100, y: 100 },
  },
  {
    id: "3",
    data: { label: "User Response" },
    position: { x: 400, y: 100 },
  },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2", animated: true }];

export default function BotFlowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // State for popup
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodeLabel, setNodeLabel] = useState("");

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addTextNode = () => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      data: { label: "New Text Node" },
      position: { x: Math.random() * 100 + 200, y: Math.random() * 200 + 100 },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const clearCanvas = () => {
    setNodes([]);
    setEdges([]);
  };

  // Handle node click
  const onNodeClick = (_event, node) => {
    setSelectedNode(node);
    setNodeLabel(node.data.label || "");
  };

  // Handle popup save
  const handleSave = () => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === selectedNode.id
          ? { ...n, data: { ...n.data, label: nodeLabel } }
          : n
      )
    );
    setSelectedNode(null);
  };

  // Handle popup close
  const handleClose = () => {
    setSelectedNode(null);
  };

  return (
    <div className="w-full min-h-screen h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
      <div className="p-4 bg-white shadow flex gap-3 items-center">
        <h2 className="text-xl font-bold text-blue-700 mr-4">
          Bot Flow Builder
        </h2>
        <button
          onClick={addTextNode}
          className="border border-blue-400 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Add Text Node
        </button>
        <button
          onClick={clearCanvas}
          className="border border-gray-300 px-4 py-2 rounded bg-white text-gray-700 hover:bg-gray-200 transition"
        >
          Clear Canvas
        </button>
      </div>
      <div className="flex-1 w-full h-full min-h-0 relative">
        {/* Settings Popup */}
        {selectedNode && (
          <div className="absolute top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 p-6 flex flex-col gap-4 animate-slide-in">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-blue-700">
                Node Settings
              </h3>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-red-500 text-xl font-bold"
                title="Close"
              >
                &times;
              </button>
            </div>
            <label className="text-sm font-medium text-gray-700 mb-1">
              Label
            </label>
            <input
              type="text"
              value={nodeLabel}
              onChange={(e) => setNodeLabel(e.target.value)}
              className="border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              onClick={handleSave}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Save
            </button>
          </div>
        )}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background color="#cbd5e1" gap={16} />
        </ReactFlow>
      </div>
      {/* Animation for popup */}
      <style>
        {`
          .animate-slide-in {
            animation: slideInLeft 0.3s cubic-bezier(0.4,0,0.2,1);
          }
          @keyframes slideInLeft {
            from { transform: translateX(-100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}
