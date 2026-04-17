import { useEffect, useRef, useState } from "react";

export default function LoaderEffect30() {
  const [t, setT] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    const animate = () => { frame++; setT(frame); rafRef.current = requestAnimationFrame(animate); };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const phase = (t * 0.02) % (Math.PI * 2);
  const lerp = (Math.sin(phase) + 1) / 2;

  // Morph between circle (r=50%) and square (r=0%)
  const r = lerp * 50;
  const hue = (t * 1.5) % 360;
  const size = 80 + Math.sin(phase * 2) * 10;

  return (
    <div className="w-full h-full bg-[#050510] flex flex-col items-center justify-center gap-6">
      <div style={{
        width: size, height: size,
        borderRadius: `${r}%`,
        background: `hsl(${hue},80%,60%)`,
        boxShadow: `0 0 30px hsl(${hue},80%,50%)`,
        transform: `rotate(${t * 0.5}deg)`,
        transition: "border-radius 0.05s",
      }} />
      <p className="text-white/20 text-xs tracking-widest uppercase">Morphing shape loader</p>
    </div>
  );
}