import { useState } from "react";

export default function TransitionEffect17() {
  const [zooming, setZooming] = useState(false);
  const [page, setPage] = useState(1);

  const trigger = () => {
    if (zooming) return;
    setZooming(true);
    setTimeout(() => setPage(p => p === 1 ? 2 : 1), 350);
    setTimeout(() => setZooming(false), 700);
  };

  return (
    <div className="w-full h-full relative overflow-hidden cursor-pointer flex items-center justify-center"
      style={{ background: page === 1 ? "#0a0520" : "#05200a" }} onClick={trigger}>
      <div className="text-center select-none z-10"
        style={{
          transform: zooming ? "scale(8)" : "scale(1)",
          opacity: zooming ? 0 : 1,
          transition: "transform 0.35s cubic-bezier(0.4,0,1,1), opacity 0.35s ease",
        }}>
        <p className="text-4xl font-black text-white mb-2">Page {page}</p>
        <p className="text-white/40 text-xs tracking-widest uppercase">Click to zoom transition</p>
      </div>
    </div>
  );
}