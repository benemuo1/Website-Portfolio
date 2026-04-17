import { useEffect, useState, useRef } from "react";

const WORD = "NEON";
const COLORS = ["#ff2d78", "#ff2d78", "#ff2d78", "#00f0ff"];

export default function TextEffect08() {
  const [flicker, setFlicker] = useState(Array(WORD.length).fill(1));
  const rafRef = useRef(null);

  useEffect(() => {
    const glitch = () => {
      const idx = Math.floor(Math.random() * WORD.length);
      const times = Math.floor(Math.random() * 4) + 2;
      let count = 0;
      const interval = setInterval(() => {
        setFlicker(prev => prev.map((v, i) => i === idx ? (count % 2 === 0 ? 0.1 : 1) : v));
        count++;
        if (count >= times * 2) { clearInterval(interval); setFlicker(Array(WORD.length).fill(1)); }
      }, 80);
    };
    const timer = setInterval(glitch, 1500 + Math.random() * 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6 bg-[#050505]">
      <div className="flex gap-2">
        {WORD.split("").map((l, i) => (
          <span key={i} className="text-6xl font-black select-none"
            style={{
              color: COLORS[i],
              opacity: flicker[i],
              textShadow: `0 0 10px ${COLORS[i]}, 0 0 30px ${COLORS[i]}, 0 0 60px ${COLORS[i]}, 0 0 100px ${COLORS[i]}`,
              transition: "opacity 0.05s",
              fontFamily: "monospace",
            }}>
            {l}
          </span>
        ))}
      </div>
      <p className="text-white/20 text-xs tracking-widest uppercase">Neon flicker simulation</p>
    </div>
  );
}