// pages/CreateBot.jsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import {
  MessageSquareText,
  Zap,
  HelpCircle,
  Trash2,
  Save,
  Play,
  X,
} from "lucide-react";
import { useParams } from "react-router-dom";

const nodeTemplates = {
  trigger: { label: "Trigger Node" },
  condition: { label: "Condition Node" },
  action: { label: "Action Node" },
};

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Start Trigger" },
    position: { x: 250, y: 5 },
  },
];

export default function CreateBot() {
  const { id: projectId } = useParams();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodeLabel, setNodeLabel] = useState("");
  const [isSimulatorOpen, setSimulatorOpen] = useState(false);
  const reactFlowWrapper = useRef(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );

  const onNodeClick = (_event, node) => {
    setSelectedNode(node);
    setNodeLabel(node.data.label || "");
  };

  const handleSaveLabel = () => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === selectedNode.id
          ? { ...n, data: { ...n.data, label: nodeLabel } }
          : n
      )
    );
    setSelectedNode(null);
  };

  const handleClosePopup = () => setSelectedNode(null);

  const handleDeleteNode = () => {
    if (!selectedNode) return;
    setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));
    setEdges((eds) =>
      eds.filter(
        (e) => e.source !== selectedNode.id && e.target !== selectedNode.id
      )
    );
    setSelectedNode(null);
  };

  const addNode = (type, position = { x: 250, y: 100 }) => {
    const newId = (nodes.length + 1).toString();
    const label = nodeTemplates[type]?.label || "Node";

    const newNode = {
      id: newId,
      data: { label },
      position,
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const clearCanvas = () => {
    if (window.confirm("Clear all nodes and edges?")) {
      setNodes([]);
      setEdges([]);
    }
  };

    const saveBot = async () => {
      const botName = prompt("Enter a name for your bot:");
      if (!botName) return;

      const payload = {
        name: botName,
        fileTree: { nodes, edges },
      };

      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/projects/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error("Failed to save bot");
        alert("Bot saved successfully!");
      } catch (err) {
        console.error(err);
        alert("Failed to save bot");
      }
    };

  const fetchBotFlow = async () => {
    if (!projectId) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:3000/projects/get-project/${projectId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (data?.project?.fileTree) {
        setNodes(data.project.fileTree.nodes || []);
        setEdges(data.project.fileTree.edges || []);
      }
    } catch (err) {
      console.error("Error fetching bot flow:", err);
    }
  };

  useEffect(() => {
    fetchBotFlow();
  }, [projectId]);

  const handleDrop = (event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData("type");
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };
    addNode(type, position);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  return (
    <div className="w-full h-screen flex">
      <div className="w-64 bg-white border-r p-4 shadow flex flex-col gap-4">
        <h2 className="text-lg font-bold">Bot Builder</h2>
        {Object.keys(nodeTemplates).map((type) => (
          <div
            key={type}
            draggable
            onDragStart={(e) => e.dataTransfer.setData("type", type)}
            className="cursor-move px-4 py-2 bg-gray-100 border rounded hover:bg-gray-200"
          >
            {nodeTemplates[type].label}
          </div>
        ))}
        <hr className="my-2" />
        <button
          onClick={clearCanvas}
          className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200"
        >
          <Trash2 size={16} className="inline-block mr-1" /> Clear
        </button>
        <button
          onClick={saveBot}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          <Save size={16} className="inline-block mr-1" /> Save
        </button>
        <button
          onClick={() => setSimulatorOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          <Play size={16} className="inline-block mr-1" /> Preview
        </button>
      </div>

      <div
        className="flex-1 relative"
        ref={reactFlowWrapper}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {selectedNode && (
          <div className="absolute top-0 left-0 h-full w-80 bg-white shadow-xl z-50 p-6 flex flex-col gap-4 animate-slide-in">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-blue-700">Edit Node</h3>
              <button onClick={handleClosePopup}>&times;</button>
            </div>
            <input
              type="text"
              value={nodeLabel}
              onChange={(e) => setNodeLabel(e.target.value)}
              className="border px-3 py-2 rounded"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSaveLabel}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={handleDeleteNode}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
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
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </div>

      {/* Chatbot Simulator */}
      {isSimulatorOpen && (
        <div className="fixed right-4 bottom-4 w-80 h-96 bg-white shadow-lg z-50 p-4 rounded-lg flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold">Simulator</h4>
            <button onClick={() => setSimulatorOpen(false)}>&times;</button>
          </div>
          <div className="flex-1 border rounded p-2 overflow-y-auto text-sm text-gray-700 bg-gray-50">
            <p className="italic text-gray-500">
              [This is a placeholder for simulating your bot responses based on
              the flow...]
            </p>
          </div>
          <input
            type="text"
            placeholder="Type a message..."
            className="mt-2 px-3 py-2 border rounded w-full"
          />
        </div>
      )}

      <style>
        {`
          .animate-slide-in {
            animation: slideInLeft 0.3s ease-out;
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
