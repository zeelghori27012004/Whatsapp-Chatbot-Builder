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
import NodeDialog from "../Nodes/Nodedialog";
import BaseNodeDialog from "../Nodes/Nodedialog";
import EdgeDialog from "../Edges/Edgedialog";

const edgeTypes = {
  testingEdge: CustomEdge,
};

function FlowCanvas({ nodes, setNodes, edges, setEdges }) {
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => addEdge({ ...params, type: "testingEdge" }, eds)),
    [setEdges]
  );

  const handleNodeClick = (event, node) => {
    event.preventDefault();
    // console.log("Node clicked:", node);
    setSelectedNode(node);
  };

  const handleEdgeClick = (event, edge) => {
    event.preventDefault();
    setSelectedEdge(edge);
  };

  const handleCloseEdgeDialog = () => {
    setSelectedEdge(null);
  };
  const handleDeleteEdge = (edgeId) => {
    setEdges((eds) => eds.filter((edge) => edge.id !== edgeId));
    handleCloseEdgeDialog();
  };

  const handleDeleteNode = (nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
    );
    handleCloseNodeDialog();
  };
  const handleCloseNodeDialog = () => {
    setSelectedNode(null);
  };

  const handleSaveNode = (updatedNode) => {
    setNodes((nds) =>
      nds.map((node) => (node.id === updatedNode.id ? updatedNode : node))
    );
    handleCloseNodeDialog();
  };

  const handleSaveEdge = (updatedEdge) => {
    setEdges((eds) =>
      eds.map((edge) => (edge.id === updatedEdge.id ? updatedEdge : edge))
    );
    handleCloseEdgeDialog();
  };

  return (
    <div className="h-[100vh] w-[90vw] bg-slate-300 relative">
      <ReactFlow
        nodes={nodes.map((node) => ({
          ...node,
          data: {
            ...node.data,
            isSelected: selectedNode?.id === node.id,
          },
        }))}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        onEdgeClick={handleEdgeClick}
        fitView
      >
        <Background color="#000" gap="15" />
        <Controls />
      </ReactFlow>

      {selectedNode && (
        <BaseNodeDialog
          node={selectedNode}
          onClose={handleCloseNodeDialog}
          onDelete={handleDeleteNode}
          onSave={handleSaveNode}
        />
      )}
      {selectedEdge && (
        <EdgeDialog
          edge={selectedEdge}
          onDelete={handleDeleteEdge}
          onClose={handleCloseEdgeDialog}
          onSave={handleSaveEdge}
        />
      )}
    </div>
  );
}

export default FlowCanvas;
