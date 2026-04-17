import { useRef } from "react";

const CARDS = [
  { color: "#6366f1", label: "01", title: "Discovery" },
  { color: "#ec4899", label: "02", title: "Design" },
  { color: "#10b981", label: "03", title: "Develop" },
  { color: "#f59e0b", label: "04", title: "Deploy" },
  { color: "#ef4444", label: "05", title: "Deliver" },
];

export default function ScrollEffect10() {
  const ref = useRef(null);

  return (
    <div className="w-full h-full bg-[#050510] flex flex-col justify-center overflow-hidden">
      <p className="text-white/20 text-xs tracking-widest uppercase text-center mb-4">Scroll horizontally →</p>
      <div ref={ref} className="flex gap-4 overflow-x-scroll px-6 pb-2" style={{ scrollbarWidth: "none" }}>
        {CARDS.map((card, i) => (
          <div key={i} className="shrink-0 w-40 h-40 rounded-2xl flex flex-col items-center justify-center gap-2 border border-white/10"
            style={{ background: `${card.color}22`, borderColor: `${card.color}44` }}>
            <span className="text-3xl font-black" style={{ color: card.color }}>{card.label}</span>
            <span className="text-white/60 text-sm font-medium">{card.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}