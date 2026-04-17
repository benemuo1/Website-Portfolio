import { useState } from "react";

export default function CardEffect24() {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="w-full h-full bg-[#050510] flex flex-col items-center justify-center gap-4" style={{ perspective: "800px" }}>
      <div onClick={() => setFlipped(f => !f)} className="relative w-44 h-60 cursor-pointer"
        style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)", transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)" }}>
        {/* Front */}
        <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-3"
          style={{ backfaceVisibility: "hidden", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", boxShadow: "0 20px 40px rgba(99,102,241,0.3)" }}>
          <span className="text-4xl">✦</span>
          <p className="text-white font-bold text-sm">Front Side</p>
          <p className="text-white/50 text-xs">Click to flip</p>
        </div>
        {/* Back */}
        <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-3"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", background: "linear-gradient(135deg,#ec4899,#f43f5e)", boxShadow: "0 20px 40px rgba(236,72,153,0.3)" }}>
          <span className="text-4xl">◈</span>
          <p className="text-white font-bold text-sm">Back Side</p>
          <p className="text-white/50 text-xs">Click to flip back</p>
        </div>
      </div>
    </div>
  );
}