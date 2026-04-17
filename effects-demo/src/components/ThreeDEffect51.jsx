import { useRef, useState } from "react";

export default function ThreeDEffect51() {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * 40, y: ((e.clientX - r.left) / r.width - 0.5) * -40 });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const depth = 12;
  const layers = Array.from({ length: depth }, (_, i) => i);

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      className="w-full h-full bg-[#050510] flex items-center justify-center cursor-crosshair"
      style={{ perspective: "500px" }}>
      <div style={{ transformStyle: "preserve-3d", transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transition: tilt.x === 0 ? "transform 0.5s ease" : "transform 0.08s linear" }}>
        {layers.map(i => (
          <span key={i} className="absolute text-5xl font-black select-none"
            style={{
              transform: `translateZ(${-i * 2}px)`,
              color: i === 0 ? "white" : `hsl(${260 + i * 5},80%,${60 - i * 3}%)`,
              textShadow: i === 0 ? "0 0 20px rgba(139,92,246,0.5)" : "none",
              left: "50%", top: "50%", translate: "-50% -50%",
            }}>
            3D TEXT
          </span>
        ))}
        <span className="text-5xl font-black text-transparent select-none">3D TEXT</span>
      </div>
    </div>
  );
}