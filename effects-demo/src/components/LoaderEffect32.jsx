import { useEffect, useRef, useState } from "react";

const ORBITS = [
  { radius: 20, speed: 0.08, size: 8,  color: "#a78bfa", offset: 0 },
  { radius: 38, speed: 0.05, size: 6,  color: "#ec4899", offset: 1 },
  { radius: 55, speed: 0.03, size: 10, color: "#10b981", offset: 2 },
];

export default function LoaderEffect32() {
  const [t, setT] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    const animate = () => { frame++; setT(frame); rafRef.current = requestAnimationFrame(animate); };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="w-full h-full bg-[#050510] flex flex-col items-center justify-center gap-6">
      <div className="relative" style={{ width: 130, height: 130 }}>
        {/* Orbit rings */}
        {ORBITS.map((o, i) => (
          <div key={i} className="absolute rounded-full border border-white/5"
            style={{ width: o.radius * 2, height: o.radius * 2, left: 65 - o.radius, top: 65 - o.radius }} />
        ))}
        {/* Center dot */}
        <div className="absolute w-3 h-3 rounded-full bg-white"
          style={{ left: 65 - 6, top: 65 - 6, boxShadow: "0 0 10px white" }} />
        {/* Orbiting dots */}
        {ORBITS.map((o, i) => {
          const angle = t * o.speed + o.offset * 2;
          const x = 65 + Math.cos(angle) * o.radius - o.size / 2;
          const y = 65 + Math.sin(angle) * o.radius - o.size / 2;
          return (
            <div key={i} className="absolute rounded-full"
              style={{ left: x, top: y, width: o.size, height: o.size,
                background: o.color, boxShadow: `0 0 10px ${o.color}` }} />
          );
        })}
      </div>
      <p className="text-white/20 text-xs tracking-widest uppercase">Orbital loader</p>
    </div>
  );
}