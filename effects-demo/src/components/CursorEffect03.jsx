import { useRef, useState } from "react";

export default function CursorEffect03() {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: -300, y: -300 });

  const handleMouseMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <div ref={ref} onMouseMove={handleMouseMove}
      className="w-full h-full relative overflow-hidden cursor-none bg-[#050510]">
      {/* Hidden content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 select-none">
        <p className="text-white text-3xl font-black">SECRET CONTENT</p>
        <p className="text-white/60 text-sm">Move the spotlight to reveal</p>
        <div className="flex gap-4 mt-2">
          {["Design","Code","Create"].map(w => (
            <span key={w} className="px-4 py-2 border border-white/20 rounded-lg text-white/80 text-sm">{w}</span>
          ))}
        </div>
      </div>
      {/* Dark overlay with spotlight hole */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 100px at ${pos.x}px ${pos.y}px, transparent 0%, transparent 60px, rgba(5,5,16,0.97) 120px)`,
        }} />
      <div className="absolute pointer-events-none rounded-full"
        style={{
          left: pos.x, top: pos.y,
          width: 8, height: 8,
          transform: "translate(-50%,-50%)",
          background: "rgba(255,255,255,0.8)",
          boxShadow: "0 0 20px rgba(255,255,255,0.4)",
        }} />
    </div>
  );
}