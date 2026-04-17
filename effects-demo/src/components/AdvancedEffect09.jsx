import { useEffect, useRef, useState } from "react";

export default function AdvancedEffect09() {
  const rafRef = useRef(null);
  const tRef = useRef(0);
  const [style, setStyle] = useState({ weight: 100, width: 75, slant: 0 });

  useEffect(() => {
    const animate = () => {
      tRef.current += 0.02;
      const t = tRef.current;
      setStyle({
        weight: Math.round(100 + (Math.sin(t) * 0.5 + 0.5) * 800),
        width: Math.round(75 + (Math.sin(t * 0.7) * 0.5 + 0.5) * 50),
        slant: Math.round(Math.sin(t * 0.5) * -12),
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="w-full h-full bg-[#050510] flex flex-col items-center justify-center gap-6">
      <span className="text-5xl select-none text-white"
        style={{
          fontVariationSettings: `"wght" ${style.weight}, "wdth" ${style.width}`,
          fontStyle: `oblique ${style.slant}deg`,
          fontFamily: "'Inter', sans-serif",
          transition: "none",
          textShadow: `0 0 ${style.weight / 50}px rgba(139,92,246,0.5)`,
        }}>
        VARIABLE
      </span>
      <div className="flex gap-6 text-xs text-white/30 font-mono">
        <span>wght: {style.weight}</span>
        <span>wdth: {style.width}</span>
        <span>slnt: {style.slant}</span>
      </div>
      <p className="text-white/20 text-xs tracking-widest uppercase">Variable font axes animating</p>
    </div>
  );
}