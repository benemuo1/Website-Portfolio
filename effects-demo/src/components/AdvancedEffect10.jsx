import { useRef, useState, useEffect } from "react";

const ITEMS = ["Drag me", "Physics", "Inertia", "Spring"];
const COLORS = ["#6366f1","#ec4899","#10b981","#f59e0b"];

export default function AdvancedEffect10() {
  const containerRef = useRef(null);
  const [cards, setCards] = useState(ITEMS.map((label, i) => ({
    id: i, label, color: COLORS[i],
    x: 40 + i * 60, y: 60 + (i % 2) * 80,
    vx: 0, vy: 0,
  })));
  const draggingRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const animate = () => {
      setCards(prev => prev.map(c => {
        if (draggingRef.current?.id === c.id) return c;
        const vx = c.vx * 0.88, vy = c.vy * 0.88;
        return { ...c, x: c.x + vx, y: c.y + vy, vx, vy };
      }));
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const onMouseDown = (e, id) => {
    const r = containerRef.current.getBoundingClientRect();
    draggingRef.current = { id, ox: e.clientX - r.left, oy: e.clientY - r.top, lx: e.clientX, ly: e.clientY };
    e.preventDefault();
  };

  const onMouseMove = (e) => {
    if (!draggingRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const vx = e.clientX - draggingRef.current.lx;
    const vy = e.clientY - draggingRef.current.ly;
    draggingRef.current.lx = e.clientX; draggingRef.current.ly = e.clientY;
    setCards(prev => prev.map(c => c.id === draggingRef.current.id ? { ...c, x: x - 50, y: y - 20, vx, vy } : c));
  };

  const onMouseUp = () => { draggingRef.current = null; };

  return (
    <div ref={containerRef} onMouseMove={onMouseMove} onMouseUp={onMouseUp}
      className="w-full h-full bg-[#050510] relative overflow-hidden select-none">
      {cards.map(c => (
        <div key={c.id} onMouseDown={(e) => onMouseDown(e, c.id)}
          className="absolute px-5 py-3 rounded-xl font-bold text-white text-sm cursor-grab active:cursor-grabbing"
          style={{
            left: c.x, top: c.y,
            background: c.color,
            boxShadow: `0 8px 30px ${c.color}66`,
            userSelect: "none",
          }}>
          {c.label}
        </div>
      ))}
      <p className="absolute bottom-4 left-0 right-0 text-center text-white/20 text-xs tracking-widest uppercase pointer-events-none">Drag cards — they have inertia</p>
    </div>
  );
}