import { useRef, useState } from "react";

const CARDS = ["Design","Code","Motion","Brand","UX","Deploy"];

export default function CardEffect28() {
  const ref = useRef(null);
  const [mouse, setMouse] = useState({ x: -999, y: -999 });

  const handleMouseMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
  };
  const handleMouseLeave = () => setMouse({ x: -999, y: -999 });

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      className="w-full h-full bg-[#050510] p-4 grid grid-cols-3 gap-3 content-center">
      {CARDS.map((card, i) => {
        const el = ref.current?.querySelectorAll(".spotlight-card")[i];
        let glow = "none";
        if (el && mouse.x > 0) {
          const r = el.getBoundingClientRect();
          const pr = ref.current.getBoundingClientRect();
          const cx = r.left - pr.left + r.width / 2;
          const cy = r.top - pr.top + r.height / 2;
          const dx = mouse.x - cx, dy = mouse.y - cy;
          const dist = Math.sqrt(dx*dx + dy*dy);
          const intensity = Math.max(0, 1 - dist / 150);
          glow = `radial-gradient(circle at ${mouse.x - (r.left - pr.left)}px ${mouse.y - (r.top - pr.top)}px, rgba(139,92,246,${intensity * 0.3}) 0%, transparent 70%)`;
        }
        return (
          <div key={i} className="spotlight-card rounded-xl p-4 text-center border border-white/5 hover:border-white/20 transition-colors"
            style={{ background: glow !== "none" ? glow : "rgba(255,255,255,0.02)", minHeight: 70 }}>
            <p className="text-white/60 text-xs font-semibold">{card}</p>
          </div>
        );
      })}
    </div>
  );
}