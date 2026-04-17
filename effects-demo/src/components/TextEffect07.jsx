import { useState, useRef } from "react";

const WORD = "SHATTER";

export default function TextEffect07() {
  const [shards, setShards] = useState(null);
  const [hidden, setHidden] = useState(false);
  const timeoutRef = useRef(null);

  const explode = () => {
    if (shards) return;
    const newShards = WORD.split("").map((l, i) => ({
      l, i,
      vx: (Math.random() - 0.5) * 300,
      vy: -(Math.random() * 200 + 100),
      rot: (Math.random() - 0.5) * 720,
      color: `hsl(${Math.random() * 60 + 20}, 90%, 65%)`,
    }));
    setShards(newShards);
    setHidden(true);
    timeoutRef.current = setTimeout(() => { setShards(null); setHidden(false); }, 1200);
  };

  return (
    <div className="w-full h-full bg-[#050510] flex flex-col items-center justify-center gap-6 cursor-pointer relative overflow-hidden"
      onClick={explode}>
      {/* Base text */}
      <span className="text-5xl font-black text-white select-none"
        style={{ opacity: hidden ? 0 : 1, transition: "opacity 0.05s" }}>
        {WORD}
      </span>
      {/* Shards */}
      {shards && shards.map((s, i) => (
        <span key={i} className="absolute text-5xl font-black pointer-events-none select-none"
          style={{
            color: s.color,
            textShadow: `0 0 20px ${s.color}`,
            animation: "none",
            transform: `translate(${s.vx * 0}px, ${s.vy * 0}px) rotate(0deg)`,
            left: `calc(50% + ${(i - WORD.length / 2) * 38}px)`,
            top: "50%",
            marginTop: "-30px",
            transition: "transform 1s cubic-bezier(0.25,0.46,0.45,0.94), opacity 1s ease",
            transitionDelay: `${i * 30}ms`,
          }}
          ref={el => {
            if (el) {
              requestAnimationFrame(() => {
                el.style.transform = `translate(${s.vx}px, ${s.vy}px) rotate(${s.rot}deg)`;
                el.style.opacity = "0";
              });
            }
          }}>
          {s.l}
        </span>
      ))}
      <p className="text-white/20 text-xs tracking-widest uppercase z-10">Click to shatter</p>
    </div>
  );
}