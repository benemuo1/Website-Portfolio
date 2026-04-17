import { useRef, useState } from "react";

const ITEMS = ["Portfolio","About","Work","Contact","Blog"];

export default function CursorEffect04() {
  const ref = useRef(null);
  const [offsets, setOffsets] = useState(ITEMS.map(() => ({ x: 0, y: 0 })));

  const handleMouseMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const mx = e.clientX - r.left, my = e.clientY - r.top;
    const els = ref.current.querySelectorAll(".mag-item");
    setOffsets(Array.from(els).map(el => {
      const er = el.getBoundingClientRect();
      const cx = er.left - r.left + er.width / 2;
      const cy = er.top - r.top + er.height / 2;
      const dx = mx - cx, dy = my - cy;
      const dist = Math.sqrt(dx*dx + dy*dy);
      const RADIUS = 100, STRENGTH = 0.35;
      if (dist < RADIUS) {
        const force = (1 - dist / RADIUS) * STRENGTH;
        return { x: dx * force, y: dy * force };
      }
      return { x: 0, y: 0 };
    }));
  };
  const handleMouseLeave = () => setOffsets(ITEMS.map(() => ({ x: 0, y: 0 })));

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      className="w-full h-full bg-[#050510] flex flex-wrap items-center justify-center gap-4 p-8">
      {ITEMS.map((item, i) => (
        <div key={i} className="mag-item px-6 py-3 border border-white/10 rounded-xl text-white font-semibold text-sm cursor-pointer hover:border-purple-400/50 transition-colors"
          style={{
            transform: `translate(${offsets[i].x}px, ${offsets[i].y}px)`,
            transition: offsets[i].x === 0 ? "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)" : "transform 0.05s linear",
            boxShadow: offsets[i].x !== 0 ? "0 0 20px rgba(139,92,246,0.3)" : "none",
          }}>
          {item}
        </div>
      ))}
    </div>
  );
}