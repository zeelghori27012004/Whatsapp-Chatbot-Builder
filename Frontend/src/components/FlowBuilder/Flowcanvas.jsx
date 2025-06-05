import {
  ReactFlow,
  Background,
  Controls,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useState } from "react";
import CustomEdge from "../Edges/Customedge";
import nodeTypes from "../Nodes/NodeTypes";

const edgeTypes = {
  testingEdge: CustomEdge,
};

const triggerNodes = [
  {
    id: "1",
    type: "FirstVisitTrigger",
    position: { x: 100, y: 100 },
    data: { data: { label: "Trigger: First Visit" } },
  },
];

// Initial condition nodes
const conditionNodes = [
  {
    id: "2",
    type: "ReturningVisitorCondition",
    position: { x: 300, y: 250 },
    data: { label: "Condition: User is New" },
  },
];

// Initial action nodes
const actionNodes = [
  {
    id: "3",
    type: "AskaQuestionAction",
    position: { x: 500, y: 100 },
    data: { label: "Action: Send Welcome Message" },
  },
];

// Combine all nodes
const initialNodes = [...triggerNodes, ...conditionNodes, ...actionNodes];

// Initial edges
const initialEdges = [
  {
    id: "1-2",
    source: "1",
    target: "2",
    label: "Trigger → Condition",
    type: "testingEdge",
  },
  {
    id: "2-3",
    source: "2",
    target: "3",
    label: "Condition → Action",
    type: "testingEdge",
  },
];

function FlowCanvas() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => addEdge({ ...params, type: "testingEdge" }, eds)),
    []
  );

  return (
    <div className="h-[100vh] w-[90vw] bg-slate-300">
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background color="#000" gap="15" />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default FlowCanvas;
