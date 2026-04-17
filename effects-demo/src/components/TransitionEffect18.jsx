import { useState } from "react";

export default function TransitionEffect18() {
  const [active, setActive] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const [page, setPage] = useState(1);

  const trigger = (e) => {
    if (active) return;
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
    setActive(true);
    setTimeout(() => setPage(p => p === 1 ? 2 : 1), 400);
    setTimeout(() => setActive(false), 800);
  };

  return (
    <div className="w-full h-full relative overflow-hidden cursor-pointer flex items-center justify-center"
      style={{ background: page === 1 ? "#0a0520" : "#200a05" }} onClick={trigger}>
      <div className="text-center select-none z-10">
        <p className="text-4xl font-black text-white mb-2">Page {page}</p>
        <p className="text-white/40 text-xs tracking-widest uppercase">Click anywhere</p>
      </div>
      <div className="absolute pointer-events-none rounded-full"
        style={{
          left: `${origin.x}%`, top: `${origin.y}%`,
          width: active ? "300%" : "0%",
          paddingBottom: active ? "300%" : "0%",
          transform: "translate(-50%,-50%)",
          background: page === 1 ? "#ec4899" : "#6366f1",
          transition: active ? "width 0.5s cubic-bezier(0.4,0,0.2,1), padding-bottom 0.5s cubic-bezier(0.4,0,0.2,1)" : "none",
          opacity: active ? 1 : 0,
        }} />
    </div>
  );
}