import { useRef, useState } from "react";

export default function CardEffect21() {
  const ref = useRef(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
  };
  const handleMouseLeave = () => setMouse({ x: 0.5, y: 0.5 });

  const hue = mouse.x * 360;
  const tiltX = (mouse.y - 0.5) * 30;
  const tiltY = (mouse.x - 0.5) * -30;

  return (
    <div className="w-full h-full bg-[#050510] flex items-center justify-center" style={{ perspective: "600px" }}>
      <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
        className="relative w-48 h-64 rounded-2xl cursor-pointer"
        style={{
          transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          transition: "transform 0.1s ease",
          background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
          boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 30px hsla(${hue},80%,50%,0.2)`,
        }}>
        {/* Holographic sheen */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 opacity-40"
            style={{
              background: `conic-gradient(from ${mouse.x * 360}deg at ${mouse.x * 100}% ${mouse.y * 100}%, #ff0080, #ff8c00, #40e0d0, #ff0080)`,
              mixBlendMode: "overlay",
            }} />
          <div className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
            }} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white/60 text-xs tracking-widest uppercase">Holographic</p>
        </div>
      </div>
    </div>
  );
}