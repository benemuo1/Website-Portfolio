import { useState } from "react";

const PAGES = [
  { bg: "#0a0520", color: "#a78bfa", label: "Page One" },
  { bg: "#200a05", color: "#f97316", label: "Page Two" },
  { bg: "#05200a", color: "#10b981", label: "Page Three" },
];

export default function TransitionEffect20() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [dir, setDir] = useState(1);

  const go = (d) => {
    if (transitioning) return;
    setDir(d);
    setTransitioning(true);
    setTimeout(() => { setCurrent(p => (p + d + PAGES.length) % PAGES.length); setTransitioning(false); }, 400);
  };

  const page = PAGES[current];

  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center"
      style={{ background: page.bg, transition: "background 0.4s ease" }}>
      <div className="text-center select-none z-10"
        style={{
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? `translateX(${dir * 40}px)` : "translateX(0)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}>
        <p className="text-4xl font-black mb-4" style={{ color: page.color }}>{page.label}</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => go(-1)} className="px-4 py-2 rounded-lg border border-white/20 text-white/60 text-sm hover:border-white/40">← Prev</button>
          <button onClick={() => go(1)} className="px-4 py-2 rounded-lg border border-white/20 text-white/60 text-sm hover:border-white/40">Next →</button>
        </div>
      </div>
    </div>
  );
}