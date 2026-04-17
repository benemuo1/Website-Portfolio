import { useRef, useState, useEffect } from "react";

const LAYERS = [
  { depth: 0.02, items: [{ x: 20, y: 30, size: 180, color: "99,102,241" }, { x: 75, y: 60, size: 140, color: "139,92,246" }] },
  { depth: 0.06, items: [{ x: 50, y: 20, size: 100, color: "236,72,153" }, { x: 30, y: 70, size: 80, color: "59,130,246" }] },
  { depth: 0.12, items: [{ x: 80, y: 25, size: 60, color: "16,185,129" }, { x: 15, y: 55, size: 50, color: "245,158,11" }] },
  { depth: 0.20, items: [{ x: 60, y: 75, size: 35, color: "239,68,68" }, { x: 40, y: 45, size: 30, color: "255,255,255" }] },
];

export default function Effect01() {
  const ref = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    setMouse({ x: (e.clientX - r.left - r.width / 2) / r.width, y: (e.clientY - r.top - r.height / 2) / r.height });
  };

  return (
    <div ref={ref} onMouseMove={handleMouseMove} className="relative w-full h-full overflow-hidden bg-[#05050f] cursor-crosshair">
      {LAYERS.map((layer, li) =>
        layer.items.map((item, ii) => (
          <div key={`${li}-${ii}`} className="absolute rounded-full pointer-events-none transition-transform duration-75"
            style={{
              left: `${item.x}%`, top: `${item.y}%`,
              width: item.size, height: item.size,
              transform: `translate(${mouse.x * layer.depth * -600}px, ${mouse.y * layer.depth * -600}px) translate(-50%,-50%)`,
              background: `radial-gradient(circle, rgba(${item.color},${0.9 - li * 0.15}) 0%, transparent 70%)`,
              filter: `blur(${li * 6 + 4}px)`,
            }}
          />
        ))
      )}
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-white/30 text-sm tracking-widest uppercase">Move mouse</p>
      </div>
    </div>
  );
}