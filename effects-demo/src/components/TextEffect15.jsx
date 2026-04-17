import { useRef, useState } from "react";

const WORD = "ELASTIC";

export default function TextEffect15() {
  const containerRef = useRef(null);
  const [scales, setScales] = useState(WORD.split("").map(() => ({ x: 1, y: 1 })));

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const letterEls = containerRef.current.querySelectorAll(".el-letter");
    const next = Array.from(letterEls).map(el => {
      const r = el.getBoundingClientRect();
      const lx = r.left - rect.left + r.width / 2;
      const ly = r.top - rect.top + r.height / 2;
      const dx = mx - lx, dy = my - ly;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const RADIUS = 70;
      if (dist < RADIUS) {
        const t = 1 - dist / RADIUS;
        const stretchX = 1 + t * (Math.abs(dx) / RADIUS) * 0.6;
        const stretchY = 1 + t * (Math.abs(dy) / RADIUS) * 0.8;
        return { x: stretchX, y: stretchY };
      }
      return { x: 1, y: 1 };
    });
    setScales(next);
  };

  const handleMouseLeave = () => setScales(WORD.split("").map(() => ({ x: 1, y: 1 })));

  return (
    <div className="w-full h-full bg-[#050510] flex flex-col items-center justify-center gap-6"
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div ref={containerRef} className="flex gap-1 items-center">
        {WORD.split("").map((l, i) => (
          <span key={i} className="el-letter text-5xl font-black text-white inline-block select-none"
            style={{
              transform: `scaleX(${scales[i].x}) scaleY(${scales[i].y})`,
              transition: scales[i].x === 1 ? "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)" : "transform 0.05s linear",
              color: `hsl(${200 + i * 20}, 80%, ${50 + (scales[i].x - 1) * 100}%)`,
              display: "inline-block",
            }}>
            {l}
          </span>
        ))}
      </div>
      <p className="text-white/20 text-xs tracking-widest uppercase">Hover near letters to stretch</p>
    </div>
  );
}