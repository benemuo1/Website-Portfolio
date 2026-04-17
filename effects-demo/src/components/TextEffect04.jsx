import { useEffect, useState, useRef } from "react";

const WORD = "GLITCH";

export default function TextEffect04() {
  const [glitch, setGlitch] = useState(false);
  const [offsets, setOffsets] = useState(WORD.split("").map(() => ({ x: 0, y: 0, skip: false })));
  const timerRef = useRef(null);

  useEffect(() => {
    const trigger = () => {
      setGlitch(true);
      let ticks = 0;
      const interval = setInterval(() => {
        setOffsets(WORD.split("").map(() => ({
          x: (Math.random() - 0.5) * 16,
          y: (Math.random() - 0.5) * 8,
          skip: Math.random() < 0.15,
        })));
        ticks++;
        if (ticks > 12) {
          clearInterval(interval);
          setGlitch(false);
          setOffsets(WORD.split("").map(() => ({ x: 0, y: 0, skip: false })));
        }
      }, 60);
    };
    timerRef.current = setInterval(trigger, 2500);
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col items-center justify-center gap-6 relative overflow-hidden">
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)" }} />
      <div className="relative flex gap-0.5 select-none">
        {/* Red channel */}
        <span className="absolute text-5xl font-black text-red-500/60"
          style={{ transform: `translate(${glitch ? -4 : 0}px, 0)`, filter: "blur(0.5px)", mixBlendMode: "screen" }}>
          {WORD}
        </span>
        {/* Blue channel */}
        <span className="absolute text-5xl font-black text-blue-400/60"
          style={{ transform: `translate(${glitch ? 4 : 0}px, 0)`, filter: "blur(0.5px)", mixBlendMode: "screen" }}>
          {WORD}
        </span>
        {/* Main letters */}
        {WORD.split("").map((l, i) => (
          <span key={i} className="text-5xl font-black inline-block"
            style={{
              transform: `translate(${offsets[i].x}px, ${offsets[i].y}px)`,
              opacity: offsets[i].skip ? 0 : 1,
              color: glitch ? `hsl(${Math.random()*360},100%,70%)` : "white",
              textShadow: "0 0 10px rgba(255,255,255,0.5)",
              transition: "none",
            }}>
            {l}
          </span>
        ))}
      </div>
      <p className="text-white/20 text-xs tracking-widest uppercase z-10">Auto-glitches every 2.5s</p>
    </div>
  );
}