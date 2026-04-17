import { useEffect, useRef, useState } from "react";

const WORD = "RAINBOW";

export default function TextEffect18() {
  const [hues, setHues] = useState(WORD.split("").map((_, i) => i * (360 / WORD.length)));
  const rafRef = useRef(null);
  const tRef = useRef(0);

  useEffect(() => {
    const animate = () => {
      tRef.current += 1.5;
      setHues(WORD.split("").map((_, i) => (tRef.current + i * (360 / WORD.length)) % 360));
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="w-full h-full bg-[#050510] flex flex-col items-center justify-center gap-6">
      <div className="flex gap-0.5">
        {WORD.split("").map((l, i) => (
          <span key={i} className="text-6xl font-black select-none inline-block"
            style={{
              color: `hsl(${hues[i]}, 90%, 65%)`,
              textShadow: `0 0 20px hsl(${hues[i]}, 90%, 65%), 0 0 40px hsl(${hues[i]}, 90%, 50%)`,
              transform: `translateY(${Math.sin((tRef.current * 0.05 + i * 0.5)) * 6}px)`,
            }}>
            {l}
          </span>
        ))}
      </div>
      <p className="text-white/20 text-xs tracking-widest uppercase">Staggered hue wave</p>
    </div>
  );
}