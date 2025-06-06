import { useState, useRef, useCallback, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FlowCanvas from "./Flowcanvas";
import { useParams } from "react-router-dom";
import FlowBuilderLeftSidebar from "./Flowbuilderleftsidebar";
import FlowBuilderRightSidebar from "./Flowbuilderrightsidebar";
import {
  updateProjectFlow,
  getProjectById,
} from "../../services/projectService";

function FlowBuilder() {
  const { id: projectId } = useParams();

  const reactFlowWrapper = useRef(null);

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const onReset = useCallback(() => {
    setNodes([]);
    setEdges([]);
    saveFlow();
  }, [setNodes, setEdges]);

  const onAddNode = useCallback(
    (type) => {
      if (!reactFlowWrapper.current) return;
      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = {
        x: bounds.width / 2,
        y: bounds.height / 2,
      };
      const id = `${type}-${+new Date()}`;
      const newNode = {
        id,
        type,
        position,
        data: { label: type.replace(/(Trigger|Action|Condition)$/, "") },
      };
      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes]
  );

  useEffect(() => {
    const fetchProjectFlow = async () => {
      try {
        const projectFlow = await getProjectById(projectId);
        if (projectFlow && projectFlow.fileTree) {
          setNodes(projectFlow.fileTree.nodes || []);
          setEdges(projectFlow.fileTree.edges || []);
        }
      } catch (error) {
        console.error("Failed to fetch flow:", error);
        toast.error("Failed to load flow.");
      }
    };

    fetchProjectFlow();
  }, [projectId]);

  const saveFlow = async () => {
    const fileTree = { nodes, edges };
    try {
      const data = await updateProjectFlow(projectId, fileTree);
      console.log("Flow updated:", data);
      toast.success("Flow saved successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to save flow");
    }
  };

  return (
    <div className="relative h-screen w-full bg-gray-100 overflow-hidden">
      <ToastContainer position="top-center" autoClose={2000} />

      <FlowBuilderLeftSidebar onAddNode={onAddNode} />

      <div
        ref={reactFlowWrapper}
        style={{
          position: "absolute",
          top: 0,
          left: "80px",
          right: "80px",
          bottom: 0,
        }}
      >
        <FlowCanvas
          nodes={nodes}
          setNodes={setNodes}
          edges={edges}
          setEdges={setEdges}
        />
      </div>

      <FlowBuilderRightSidebar onReset={onReset} onSave={saveFlow} />
    </div>
  );
}

export default FlowBuilder;
