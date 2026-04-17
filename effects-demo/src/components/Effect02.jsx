import { useRef, useState } from "react";

export default function Effect02() {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = ((e.clientY - r.top) / r.height - 0.5) * 30;
    const y = ((e.clientX - r.left) / r.width - 0.5) * -30;
    setTilt({ x, y });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      className="relative w-full h-full bg-[#0a0a1a] flex items-center justify-center cursor-crosshair"
      style={{ perspective: "800px" }}>
      <div className="relative w-48 h-64 rounded-2xl"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.1s ease-out",
          transformStyle: "preserve-3d",
          background: "linear-gradient(135deg, #1e1b4b, #312e81, #4c1d95)",
          boxShadow: `${-tilt.y * 2}px ${tilt.x * 2}px 40px rgba(139,92,246,0.5), inset 0 0 30px rgba(255,255,255,0.05)`,
        }}>
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-purple-400/40 blur-sm" />
          <div className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-indigo-400/30 blur-md" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white/60 text-xs tracking-widest uppercase">Tilt me</p>
        </div>
      </div>
    </div>
  );
}