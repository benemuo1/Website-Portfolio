import { useState } from "react";

export default function TransitionEffect15() {
  const [active, setActive] = useState(false);
  const [page, setPage] = useState(1);

  const trigger = () => {
    setActive(true);
    setTimeout(() => { setPage(p => p === 1 ? 2 : 1); }, 400);
    setTimeout(() => setActive(false), 800);
  };

  return (
    <div className="w-full h-full relative overflow-hidden cursor-pointer flex items-center justify-center" onClick={trigger}
      style={{ background: page === 1 ? "#0a0520" : "#05200a" }}>
      <div className="text-center z-10 select-none">
        <p className="text-4xl font-black text-white mb-2">Page {page}</p>
        <p className="text-white/40 text-xs tracking-widest uppercase">Click to transition</p>
      </div>
      {/* Curtain */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: page === 1 ? "#6366f1" : "#ec4899",
          transform: active ? "translateX(0)" : "translateX(-101%)",
          transition: active ? "transform 0.4s cubic-bezier(0.76,0,0.24,1)" : "transform 0.4s cubic-bezier(0.76,0,0.24,1) 0.4s",
        }} />
    </div>
  );
}