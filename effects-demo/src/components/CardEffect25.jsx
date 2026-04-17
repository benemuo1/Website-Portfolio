import { useRef, useState } from "react";

export default function CardEffect25() {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    setOffset({ x: dx * 0.3, y: dy * 0.3 });
  };
  const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <div className="w-full h-full bg-[#050510] flex items-center justify-center">
      <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
        className="px-8 py-4 rounded-xl font-bold text-white cursor-pointer select-none"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          transition: offset.x === 0 ? "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)" : "transform 0.1s linear",
          background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
          boxShadow: `${-offset.x * 0.5}px ${-offset.y * 0.5}px 30px rgba(99,102,241,0.5)`,
        }}>
        Magnetic Button
      </div>
    </div>
  );
}