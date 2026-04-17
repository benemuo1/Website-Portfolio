import { useRef, useState } from "react";

const WORD = "MAGNETIC";

export default function TextEffect02() {
  const containerRef = useRef(null);
  const [offsets, setOffsets] = useState(WORD.split("").map(() => ({ x: 0, y: 0 })));

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const letterEls = containerRef.current.querySelectorAll(".mag-letter");
    const next = Array.from(letterEls).map(el => {
      const r = el.getBoundingClientRect();
      const lx = r.left - rect.left + r.width / 2;
      const ly = r.top - rect.top + r.height / 2;
      const dx = mx - lx, dy = my - ly;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const RADIUS = 80, STRENGTH = 40;
      if (dist < RADIUS) {
        const force = (1 - dist / RADIUS) * STRENGTH;
        return { x: -(dx / dist) * force, y: -(dy / dist) * force };
      }
      return { x: 0, y: 0 };
    });
    setOffsets(next);
  };

  const handleMouseLeave = () => setOffsets(WORD.split("").map(() => ({ x: 0, y: 0 })));

  return (
    <div className="w-full h-full bg-[#050510] flex flex-col items-center justify-center gap-6"
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div ref={containerRef} className="flex gap-1">
        {WORD.split("").map((l, i) => (
          <span key={i} className="mag-letter text-5xl font-black text-white inline-block select-none"
            style={{
              transform: `translate(${offsets[i].x}px, ${offsets[i].y}px)`,
              transition: offsets[i].x === 0 && offsets[i].y === 0 ? "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)" : "transform 0.05s linear",
              textShadow: `0 0 ${Math.sqrt(offsets[i].x**2+offsets[i].y**2)}px rgba(167,139,250,0.8)`,
            }}>
            {l}
          </span>
        ))}
      </div>
      <p className="text-white/20 text-xs tracking-widest uppercase">Hover near letters</p>
    </div>
  );
}