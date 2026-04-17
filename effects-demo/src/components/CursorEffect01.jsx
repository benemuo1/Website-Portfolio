import { useEffect, useRef, useState } from "react";

export default function CursorEffect01() {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState([]);
  const [clicking, setClicking] = useState(false);
  const posRef = useRef({ x: -100, y: -100 });
  const trailRef = useRef([]);

  useEffect(() => {
    const el = ref.current;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      posRef.current = { x, y };
      trailRef.current = [{ x, y, id: Date.now() }, ...trailRef.current.slice(0, 10)];
      setPos({ x, y });
      setTrail([...trailRef.current]);
    };
    el.addEventListener("mousemove", move);
    el.addEventListener("mousedown", () => setClicking(true));
    el.addEventListener("mouseup", () => setClicking(false));
    return () => el.removeEventListener("mousemove", move);
  }, []);

  return (
    <div ref={ref} className="w-full h-full bg-[#050510] flex items-center justify-center cursor-none overflow-hidden relative">
      {trail.map((t, i) => (
        <div key={t.id} className="absolute rounded-full pointer-events-none"
          style={{
            left: t.x, top: t.y,
            width: 12 - i, height: 12 - i,
            transform: "translate(-50%,-50%)",
            background: `rgba(167,139,250,${0.6 - i * 0.05})`,
            filter: `blur(${i * 0.5}px)`,
          }} />
      ))}
      <div className="absolute pointer-events-none rounded-full"
        style={{
          left: pos.x, top: pos.y,
          width: clicking ? 16 : 24, height: clicking ? 16 : 24,
          transform: "translate(-50%,-50%)",
          border: "2px solid rgba(167,139,250,0.9)",
          boxShadow: "0 0 15px rgba(167,139,250,0.6)",
          transition: "width 0.1s, height 0.1s",
        }} />
      <div className="absolute pointer-events-none rounded-full"
        style={{
          left: pos.x, top: pos.y,
          width: 4, height: 4,
          transform: "translate(-50%,-50%)",
          background: "white",
        }} />
      <p className="text-white/20 text-xs tracking-widest uppercase select-none">Move mouse inside</p>
    </div>
  );
}