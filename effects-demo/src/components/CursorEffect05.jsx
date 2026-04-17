import { useEffect, useRef, useState } from "react";

export default function CursorEffect05() {
  const ref = useRef(null);
  const [ripples, setRipples] = useState([]);
  const idRef = useRef(0);

  useEffect(() => {
    const el = ref.current;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      if (Math.random() > 0.3) return;
      const id = idRef.current++;
      setRipples(prev => [...prev.slice(-20), { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 1000);
    };
    el.addEventListener("mousemove", move);
    return () => el.removeEventListener("mousemove", move);
  }, []);

  return (
    <div ref={ref} className="w-full h-full bg-[#050510] flex items-center justify-center overflow-hidden relative cursor-crosshair">
      {ripples.map(r => (
        <div key={r.id} className="absolute rounded-full pointer-events-none border border-cyan-400/60"
          style={{
            left: r.x, top: r.y,
            width: 10, height: 10,
            transform: "translate(-50%,-50%)",
            animation: "rippleExpand 1s ease-out forwards",
          }} />
      ))}
      <p className="text-white/20 text-xs tracking-widest uppercase select-none">Move mouse for ripples</p>
    </div>
  );
}