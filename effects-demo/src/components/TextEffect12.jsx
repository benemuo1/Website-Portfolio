import { useEffect, useRef, useState } from "react";

export default function TextEffect12() {
  const [progress, setProgress] = useState(0);
  const dirRef = useRef(1);
  const rafRef = useRef(null);

  useEffect(() => {
    const animate = () => {
      setProgress(prev => {
        const next = prev + dirRef.current * 0.5;
        if (next >= 100) { dirRef.current = -1; return 100; }
        if (next <= 0)   { dirRef.current =  1; return 0; }
        return next;
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="w-full h-full bg-[#050510] flex flex-col items-center justify-center gap-6">
      <div className="relative select-none">
        {/* Ghost outline always visible */}
        <span className="text-6xl font-black"
          style={{ color: "transparent", WebkitTextStroke: "1px rgba(99,102,241,0.15)" }}>
          TRACE
        </span>
        {/* Traced portion revealed left to right */}
        <span className="absolute inset-0 text-6xl font-black overflow-hidden"
          style={{
            color: "transparent",
            WebkitTextStroke: "2px #a78bfa",
            clipPath: `inset(0 ${100 - progress}% 0 0)`,
            filter: "drop-shadow(0 0 8px #a78bfa) drop-shadow(0 0 20px #7c3aed)",
          }}>
          TRACE
        </span>
        {/* Pen tip glow */}
        <span className="absolute inset-0 text-6xl font-black overflow-hidden pointer-events-none"
          style={{
            color: "transparent",
            WebkitTextStroke: "3px white",
            clipPath: `inset(0 ${100 - progress - 2}% 0 ${progress - 2}%)`,
            filter: "blur(2px) brightness(2)",
          }}>
          TRACE
        </span>
      </div>
      <p className="text-white/20 text-xs tracking-widest uppercase">Outline trace animation</p>
    </div>
  );
}