import { useEffect, useRef, useState } from "react";

function Counter({ target, label, color }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true); }, { threshold: 0.5 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!started) return;
    let current = 0;
    const step = target / 60;
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(Math.round(current));
      if (current >= target) clearInterval(interval);
    }, 16);
    return () => clearInterval(interval);
  }, [started]);
  return (
    <div ref={ref} className="text-center p-4">
      <div className="text-4xl font-black mb-1" style={{ color }}>{count}+</div>
      <div className="text-white/40 text-xs uppercase tracking-widest">{label}</div>
    </div>
  );
}

export default function ScrollEffect13() {
  return (
    <div className="w-full h-full overflow-y-scroll bg-[#050510]" style={{ scrollbarWidth: "none" }}>
      <div style={{ height: 200 }} className="flex items-center justify-center">
        <p className="text-white/20 text-xs tracking-widest uppercase">Scroll down ↓</p>
      </div>
      <div className="grid grid-cols-2 gap-4 p-6">
        <Counter target={150} label="Projects" color="#a78bfa" />
        <Counter target={98} label="Clients" color="#ec4899" />
        <Counter target={8} label="Years" color="#10b981" />
        <Counter target={500} label="Commits" color="#f59e0b" />
      </div>
    </div>
  );
}