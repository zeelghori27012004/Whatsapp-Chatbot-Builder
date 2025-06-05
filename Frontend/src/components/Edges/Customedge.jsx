import { BaseEdge, getSmoothStepPath } from "@xyflow/react";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  data,
}) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 10,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: "gray",
          strokeWidth: 2,
        }}
      />

      {/* Label */}
      <foreignObject
        width={100}
        height={30}
        x={labelX - 50}
        y={labelY - 15}
        className="pointer-events-none"
      >
        <div className="w-full h-full flex items-center justify-center text-xs text-white bg-slate-600 rounded px-2 py-1 ">
          {data?.label || "Edge Label"}
        </div>
      </foreignObject>
    </>
  );
}
