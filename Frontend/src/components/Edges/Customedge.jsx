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

  const label = data?.label || "Edge";

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: "#4B5563", // Tailwind slate-600
          strokeWidth: 2,
        }}
      />

      <foreignObject
        width={140}
        height={32}
        x={labelX - 70}
        y={labelY - 16}
        className="pointer-events-none"
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className="px-3 py-1 text-xs rounded-full shadow-sm bg-white border border-gray-300 text-gray-700 flex items-center gap-1">
            <span>{label}</span>
            <span className="text-gray-500">→</span>
          </div>
        </div>
      </foreignObject>
    </>
  );
}
