import { useState, useEffect, useRef } from "react";

export default function TextEffect03() {
  const [fill, setFill] = useState(0);
  const dirRef = useRef(1);
  const rafRef = useRef(null);

  useEffect(() => {
    const animate = () => {
      setFill(prev => {
        const next = prev + dirRef.current * 0.4;
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
        {/* Outline */}
        <span className="text-6xl font-black" style={{ color: "transparent", WebkitTextStroke: "2px rgba(99,102,241,0.4)" }}>
          LIQUID
        </span>
        {/* Fill layer clipped from bottom */}
        <span className="absolute inset-0 text-6xl font-black overflow-hidden"
          style={{
            color: "transparent",
            WebkitTextStroke: "2px #6366f1",
            WebkitTextFillColor: "#6366f1",
            clipPath: `inset(${100 - fill}% 0 0 0)`,
            filter: "drop-shadow(0 0 12px rgba(99,102,241,0.8))",
          }}>
          LIQUID
        </span>
        {/* Wave on fill surface */}
        <span className="absolute inset-0 text-6xl font-black overflow-hidden"
          style={{
            color: "transparent",
            WebkitTextStroke: "2px rgba(139,92,246,0.6)",
            WebkitTextFillColor: "rgba(139,92,246,0.3)",
            clipPath: `inset(${100 - fill - 3}% 0 ${fill - 1}% 0)`,
          }}>
          LIQUID
        </span>
      </div>
      <p className="text-white/20 text-xs tracking-widest uppercase">Liquid fill animation</p>
    </div>
  );
}