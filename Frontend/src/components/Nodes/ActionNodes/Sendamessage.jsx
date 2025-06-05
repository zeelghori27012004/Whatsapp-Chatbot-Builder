import { Handle, Position } from "@xyflow/react";
import { MessageSquare } from "lucide-react";

export default function SendaMessage({ data }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center justify-center bg-red-200 border-2 border-black rounded-full w-15 h-15 shadow-md">
        {/* Left Handle */}
        <Handle
          type="target"
          position={Position.Left}
          className="!w-2 !h-2 !bg-black"
          style={{ top: "50%", transform: "translateY(-50%)", left: -6 }}
        />

        {/* Right Handle */}
        <Handle
          type="source"
          position={Position.Right}
          className="!w-2 !h-2 !bg-black"
          style={{ top: "50%", transform: "translateY(-50%)", right: -6 }}
        />

        {/* Icon */}
        <MessageSquare size={24} color="black" strokeWidth={2} />
      </div>

      {/* Label below the circle */}
      <div className="mt-1 p-2 text-sm text-center text-slate-800 rounded-2xl bg-white">
        Send a Message
      </div>
    </div>
  );
}
