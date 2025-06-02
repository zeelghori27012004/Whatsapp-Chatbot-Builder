import React, { useCallback } from "react";
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

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const addTextNode = () => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      data: { label: "New Text Node" },
      position: { x: Math.random() * 100, y: Math.random() * 100 },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const clearCanvas = () => {
    setNodes([]);
    setEdges([]);
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div style={{ padding: "10px", background: "#f0f0f0" }}>
        <button onClick={addTextNode} style={{ marginRight: "10px" }}>
          Add Text Node
        </button>
        <button onClick={clearCanvas}>Clear Canvas</button>
      </div>
      <div style={{ width: "100%", height: "90vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </div>
    </div>
  );
}
