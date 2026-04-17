import { useRef, useState } from "react";

export default function CardEffect23() {
  const ref = useRef(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
  };

  const tiltX = (mouse.y - 0.5) * 25;
  const tiltY = (mouse.x - 0.5) * -25;

  return (
    <div className="w-full h-full bg-[#050510] flex items-center justify-center" style={{ perspective: "600px" }}>
      <div ref={ref} onMouseMove={handleMouseMove} onMouseEnter={() => setHovering(true)} onMouseLeave={() => { setHovering(false); setMouse({ x: 0.5, y: 0.5 }); }}
        className="relative w-48 h-64 rounded-2xl cursor-pointer overflow-hidden"
        style={{
          transform: hovering ? `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)` : "rotateX(0) rotateY(0) scale(1)",
          transition: hovering ? "transform 0.1s ease" : "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
          background: "linear-gradient(135deg, #1e1b4b, #312e81)",
          boxShadow: hovering ? "0 30px 60px rgba(0,0,0,0.5)" : "0 10px 30px rgba(0,0,0,0.3)",
        }}>
        {/* Specular highlight */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(255,255,255,0.25) 0%, transparent 50%)`,
          }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white/60 text-xs tracking-widest uppercase">Tilt + Shine</p>
        </div>
      </div>
    </div>
  );
}