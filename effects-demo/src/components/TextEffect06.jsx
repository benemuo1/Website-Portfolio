import { useRef, useState } from "react";

export default function TextEffect06() {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    setTilt({
      x: ((e.clientY - r.top) / r.height - 0.5) * 30,
      y: ((e.clientX - r.left) / r.width - 0.5) * -30,
    });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const depth = 8;
  const shadows = Array.from({ length: depth }, (_, i) => `${i + 1}px ${i + 1}px 0px rgba(99,102,241,${0.6 - i * 0.06})`).join(", ");

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      className="w-full h-full bg-[#050510] flex flex-col items-center justify-center gap-6 cursor-crosshair"
      style={{ perspective: "600px" }}>
      <div style={{
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 ? "transform 0.5s ease" : "transform 0.08s linear",
        transformStyle: "preserve-3d",
      }}>
        <span className="text-6xl font-black text-white select-none"
          style={{ textShadow: shadows, letterSpacing: "0.05em" }}>
          EXTRUDE
        </span>
      </div>
      <p className="text-white/20 text-xs tracking-widest uppercase">Move mouse to tilt</p>
    </div>
  );
}