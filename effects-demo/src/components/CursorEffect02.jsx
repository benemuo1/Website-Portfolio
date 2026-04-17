import { useEffect, useRef, useState } from "react";

export default function CursorEffect02() {
  const ref = useRef(null);
  const [dots, setDots] = useState([]);
  const idRef = useRef(0);

  useEffect(() => {
    const el = ref.current;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const id = idRef.current++;
      const hue = (id * 8) % 360;
      setDots(prev => [...prev.slice(-40), { id, x: e.clientX - r.left, y: e.clientY - r.top, hue }]);
    };
    el.addEventListener("mousemove", move);
    return () => el.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setDots(prev => prev.slice(-40)), 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={ref} className="w-full h-full bg-[#050510] flex items-center justify-center cursor-none overflow-hidden relative">
      {dots.map((d, i) => {
        const age = dots.length - i;
        const size = Math.max(2, 14 - age * 0.3);
        return (
          <div key={d.id} className="absolute rounded-full pointer-events-none"
            style={{
              left: d.x, top: d.y,
              width: size, height: size,
              transform: "translate(-50%,-50%)",
              background: `hsl(${d.hue},90%,65%)`,
              boxShadow: `0 0 ${size * 2}px hsl(${d.hue},90%,65%)`,
              opacity: 1 - age / 40,
            }} />
        );
      })}
      <p className="text-white/20 text-xs tracking-widest uppercase select-none pointer-events-none">Move mouse for rainbow trail</p>
    </div>
  );
}