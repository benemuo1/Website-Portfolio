import { useRef, useState } from "react";

const RAYS = Array.from({ length: 12 }, (_, i) => ({
  angle: (i / 12) * 60 - 30,
  width: Math.random() * 40 + 20,
  opacity: Math.random() * 0.2 + 0.08,
  delay: i * 0.4,
  duration: Math.random() * 4 + 4,
}));

export default function Effect04() {
  const ref = useRef(null);
  const [origin, setOrigin] = useState({ x: 50, y: 0 });

  const handleMouseMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    setOrigin({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <div ref={ref} onMouseMove={handleMouseMove} className="relative w-full h-full overflow-hidden bg-[#080410] cursor-crosshair">
      {/* Source glow */}
      <div className="absolute rounded-full pointer-events-none"
        style={{
          left: `${origin.x}%`, top: `${origin.y}%`,
          width: 80, height: 80,
          transform: "translate(-50%,-50%)",
          background: "radial-gradient(circle, rgba(255,220,100,1) 0%, rgba(255,160,40,0.6) 40%, transparent 70%)",
          filter: "blur(6px)",
          boxShadow: "0 0 60px 20px rgba(255,200,60,0.4)",
        }}
      />
      {/* Rays */}
      {RAYS.map((ray, i) => (
        <div key={i} className="absolute pointer-events-none origin-top"
          style={{
            left: `${origin.x}%`, top: `${origin.y}%`,
            width: `${ray.width}px`,
            height: "120%",
            transform: `translateX(-50%) rotate(${ray.angle}deg)`,
            background: `linear-gradient(to bottom, rgba(255,200,80,${ray.opacity + 0.1}) 0%, rgba(255,160,40,${ray.opacity}) 30%, transparent 80%)`,
            animation: `godRayPulse ${ray.duration}s ease-in-out ${ray.delay}s infinite`,
            filter: "blur(8px)",
          }}
        />
      ))}
      <div className="absolute inset-0 flex items-end justify-center pb-6">
        <p className="text-white/30 text-xs tracking-widest uppercase">Move mouse to reposition light source</p>
      </div>
    </div>
  );
}