import { useRef, useState } from "react";

const WORD = "BURST";

export default function TextEffect11() {
  const containerRef = useRef(null);
  const [particles, setParticles] = useState([]);

  const spawnParticles = (e, letterEl) => {
    const r = letterEl.getBoundingClientRect();
    const cr = containerRef.current.getBoundingClientRect();
    const cx = r.left - cr.left + r.width / 2;
    const cy = r.top - cr.top + r.height / 2;
    const newP = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: cx, y: cy,
      vx: (Math.random() - 0.5) * 120,
      vy: -(Math.random() * 100 + 40),
      color: `hsl(${Math.random() * 60 + 20}, 90%, 65%)`,
      size: Math.random() * 4 + 2,
    }));
    setParticles(prev => [...prev, ...newP]);
    setTimeout(() => setParticles(prev => prev.filter(p => !newP.find(n => n.id === p.id))), 800);
  };

  return (
    <div ref={containerRef} className="w-full h-full bg-[#050510] flex flex-col items-center justify-center gap-6 relative overflow-hidden">
      <div className="flex gap-2">
        {WORD.split("").map((l, i) => (
          <span key={i} className="text-5xl font-black text-white cursor-pointer select-none hover:text-orange-400 transition-colors"
            onMouseEnter={(e) => spawnParticles(e, e.currentTarget)}>
            {l}
          </span>
        ))}
      </div>
      {particles.map(p => (
        <div key={p.id} className="absolute rounded-full pointer-events-none"
          style={{
            left: p.x, top: p.y, width: p.size, height: p.size,
            background: p.color,
            boxShadow: `0 0 6px ${p.color}`,
            animation: "none",
            transform: "translate(-50%,-50%)",
            transition: "transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.8s ease",
          }}
          ref={el => {
            if (el) requestAnimationFrame(() => {
              el.style.transform = `translate(calc(-50% + ${p.vx}px), calc(-50% + ${p.vy}px))`;
              el.style.opacity = "0";
            });
          }}
        />
      ))}
      <p className="text-white/20 text-xs tracking-widest uppercase z-10">Hover each letter</p>
    </div>
  );
}