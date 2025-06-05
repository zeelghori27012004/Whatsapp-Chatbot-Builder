import {
  ReactFlow,
  Background,
  Controls,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import FirstVisit from "./Nodes/TriggerNodes/Firstvisit";
import { useCallback, useState } from "react";
import VisitorReturnstoSite from "./Nodes/TriggerNodes/Visitorreturnstosite";
import VisitorClicksOnChatIcon from "./Nodes/TriggerNodes/Visitorclicksonchaticon";
import SendaMessage from "./Nodes/ActionNodes/Sendamessage";
import AskaQuestion from "./Nodes/ActionNodes/Askaquestion";
import ReturningVisitor from "./Nodes/ConditionNodes/Returningvisitor";
import CustomEdge from "./Edges/customeEdge";

const nodeTypes = {
  testingTrigger: FirstVisit,
  testingTrigger2: VisitorReturnstoSite,
  testingTrigger3: VisitorClicksOnChatIcon,
  testingTrigger4: SendaMessage,
  testingTrigger5: AskaQuestion,
  testingTrigger6: ReturningVisitor,
};

const edgeTypes = {
  testingEdge: CustomEdge,
};

const triggerNodes = [
  {
    id: "trigger-1",
    type: "testingTrigger",
    position: { x: 100, y: 100 },
    data: { data: { label: "Trigger: First Visit" } },
  },
];

// Initial condition nodes
const conditionNodes = [
  {
    id: "condition-1",
    type: "testingTrigger6",
    position: { x: 300, y: 250 },
    data: { label: "Condition: User is New" },
  },
];

// Initial action nodes
const actionNodes = [
  {
    id: "action-1",
    type: "testingTrigger4",
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
    source: "trigger-1",
    target: "condition-1",
    label: "Trigger → Condition",
    type: "testingEdge",
  },
  {
    id: "2-3",
    source: "condition-1",
    target: "action-1",
    label: "Condition → Action",
    type: "testingEdge",
  },
];

function CreateFlow() {
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
    <div className="h-[91vh] w-[100vw] bg-slate-300">
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

export default CreateFlow;
