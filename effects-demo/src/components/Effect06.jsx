import { useRef, useState } from "react";

const OBJECTS = [
  { x: 15, y: 30, size: 80, depth: 0.1, color: "239,68,68", label: "far" },
  { x: 40, y: 55, size: 60, depth: 0.2, color: "245,158,11", label: "far" },
  { x: 70, y: 25, size: 70, depth: 0.35, color: "16,185,129", label: "mid" },
  { x: 55, y: 70, size: 90, depth: 0.55, color: "59,130,246", label: "mid" },
  { x: 25, y: 65, size: 50, depth: 0.75, color: "139,92,246", label: "near" },
  { x: 80, y: 60, size: 110, depth: 0.9, color: "236,72,153", label: "near" },
];

export default function Effect06() {
  const ref = useRef(null);
  const [focusDepth, setFocusDepth] = useState(0.5);

  const handleMouseMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    setFocusDepth((e.clientX - r.left) / r.width);
  };

  return (
    <div ref={ref} onMouseMove={handleMouseMove} className="relative w-full h-full overflow-hidden bg-[#050510] cursor-crosshair">
      {OBJECTS.map((obj, i) => {
        const dist = Math.abs(obj.depth - focusDepth);
        const blur = dist * 14;
        const opacity = 1 - dist * 0.5;
        return (
          <div key={i} className="absolute rounded-full pointer-events-none"
            style={{
              left: `${obj.x}%`, top: `${obj.y}%`,
              width: obj.size, height: obj.size,
              transform: "translate(-50%,-50%)",
              background: `radial-gradient(circle, rgba(${obj.color},0.9) 0%, transparent 70%)`,
              filter: `blur(${blur}px)`,
              opacity,
              transition: "filter 0.1s, opacity 0.1s",
            }}
          />
        );
      })}
      {/* Focus plane indicator */}
      <div className="absolute top-0 bottom-0 w-0.5 bg-white/20 pointer-events-none"
        style={{ left: `${focusDepth * 100}%`, transition: "left 0.1s" }} />
      <div className="absolute inset-0 flex items-end justify-center pb-6">
        <p className="text-white/30 text-xs tracking-widest uppercase">Move mouse left/right to shift focus plane</p>
      </div>
    </div>
  );
}