import { useState, useRef, useCallback } from "react";
import FlowCanvas from "./Flowcanvas";
import FlowBuilderLeftSidebar from "./Flowbuilderleftsidebar";
import FlowBuilderRightSidebar from "./Flowbuilderrightsidebar";

function FlowBuilder() {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  const reactFlowWrapper = useRef(null);

  // Hold nodes and edges state here so sidebar and canvas can share
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  // Add node at center of canvas view on sidebar click
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
        data: { label: `${type} node` },
      };
      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes]
  );

  return (
    <div className="relative h-screen w-full bg-gray-100 overflow-hidden">
      <FlowBuilderLeftSidebar
        leftOpen={leftOpen}
        setLeftOpen={setLeftOpen}
        onAddNode={onAddNode}
      />

      <div
        ref={reactFlowWrapper}
        style={{
          position: "absolute",
          top: 0,
          left: leftOpen ? "250px" : "80px", // Adjust based on sidebar width
          right: rightOpen ? "250px" : "80px", // Adjust based on sidebar width
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

      <FlowBuilderRightSidebar
        rightOpen={rightOpen}
        setRightOpen={setRightOpen}
      />
    </div>
  );
}

export default FlowBuilder;
