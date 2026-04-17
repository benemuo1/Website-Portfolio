import { useState } from "react";

const SHARDS = Array.from({ length: 16 }, (_, i) => ({
  x: (i % 4) * 25, y: Math.floor(i / 4) * 25,
  vx: (Math.random() - 0.5) * 200, vy: (Math.random() - 0.5) * 200,
  rot: (Math.random() - 0.5) * 360,
}));

export default function TransitionEffect16() {
  const [shattering, setShattering] = useState(false);
  const [page, setPage] = useState(1);

  const trigger = () => {
    if (shattering) return;
    setShattering(true);
    setTimeout(() => { setPage(p => p === 1 ? 2 : 1); setShattering(false); }, 800);
  };

  return (
    <div className="w-full h-full relative overflow-hidden cursor-pointer" onClick={trigger}
      style={{ background: page === 1 ? "#0a0520" : "#200a05" }}>
      <div className="absolute inset-0 flex items-center justify-center select-none">
        <div className="text-center" style={{ opacity: shattering ? 0 : 1, transition: "opacity 0.1s" }}>
          <p className="text-4xl font-black text-white mb-2">Page {page}</p>
          <p className="text-white/40 text-xs tracking-widest uppercase">Click to shatter</p>
        </div>
      </div>
      {shattering && SHARDS.map((s, i) => (
        <div key={i} className="absolute pointer-events-none"
          style={{
            left: `${s.x}%`, top: `${s.y}%`,
            width: "25%", height: "25%",
            background: page === 1 ? "#6366f1" : "#f59e0b",
            opacity: 0,
            transform: `translate(${s.vx}px, ${s.vy}px) rotate(${s.rot}deg)`,
            transition: "transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.7s ease",
          }}
          ref={el => { if (el) requestAnimationFrame(() => { el.style.opacity = "0.9"; el.style.transform = `translate(${s.vx * 0}px,${s.vy * 0}px) rotate(0deg)`; }); }}
        />
      ))}
    </div>
  );
}