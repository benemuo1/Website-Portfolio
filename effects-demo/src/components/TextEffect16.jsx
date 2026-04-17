import { useEffect, useRef, useState } from "react";

export default function TextEffect16() {
  const [blur, setBlur] = useState(0);
  const [spread, setSpread] = useState(0);
  const dirRef = useRef(1);
  const rafRef = useRef(null);

  useEffect(() => {
    const animate = () => {
      setBlur(prev => {
        const next = prev + dirRef.current * 0.06;
        if (next >= 6) { dirRef.current = -1; return 6; }
        if (next <= 0) { dirRef.current =  1; return 0; }
        return next;
      });
      setSpread(prev => {
        const next = prev + dirRef.current * 0.04;
        return Math.max(0, Math.min(8, next));
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="w-full h-full bg-[#f5f0e8] flex flex-col items-center justify-center gap-6">
      <span className="text-6xl font-black select-none"
        style={{
          color: `rgba(10,10,30,${1 - blur / 12})`,
          filter: `blur(${blur}px)`,
          textShadow: `0 0 ${spread * 3}px rgba(10,10,80,0.3), 0 0 ${spread * 6}px rgba(10,10,80,0.15)`,
          letterSpacing: `${blur * 0.5}px`,
        }}>
        INK
      </span>
      <p className="text-black/20 text-xs tracking-widest uppercase">Ink bleeding on paper</p>
    </div>
  );
}