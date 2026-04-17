import { useEffect, useRef, useState } from "react";

export default function TextEffect20() {
  const [shimmer, setShimmer] = useState(0);
  const rafRef = useRef(null);
  const tRef = useRef(0);

  useEffect(() => {
    const animate = () => {
      tRef.current += 0.02;
      setShimmer(Math.sin(tRef.current) * 0.5 + 0.5);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="w-full h-full bg-[#050510] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center select-none">
        {/* Real text */}
        <span className="text-6xl font-black text-white"
          style={{ textShadow: "0 0 20px rgba(139,92,246,0.6)" }}>
          MIRROR
        </span>
        {/* Divider */}
        <div className="w-full h-px my-1"
          style={{ background: `rgba(139,92,246,${0.2 + shimmer * 0.3})`, boxShadow: `0 0 ${8 + shimmer * 12}px rgba(139,92,246,0.4)` }} />
        {/* Reflection */}
        <span className="text-6xl font-black"
          style={{
            color: "transparent",
            WebkitTextStroke: "1px rgba(139,92,246,0.3)",
            transform: "scaleY(-1)",
            display: "block",
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 70%)",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 70%)",
            filter: `blur(${shimmer * 1.5}px)`,
            backgroundImage: `linear-gradient(to bottom, rgba(139,92,246,${0.3 + shimmer * 0.2}), transparent)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: `rgba(139,92,246,${0.25 + shimmer * 0.15})`,
          }}>
          MIRROR
        </span>
      </div>
      <p className="text-white/20 text-xs tracking-widest uppercase mt-6">Shimmering floor reflection</p>
    </div>
  );
}