import { useEffect, useState, useRef } from "react";

const WORDS = ["CREATE", "DESIGN", "BUILD", "LAUNCH"];

export default function TextEffect10() {
  const [current, setCurrent] = useState(0);
  const [letters, setLetters] = useState(WORDS[0].split(""));
  const [morphing, setMorphing] = useState(Array(6).fill(false));
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      const next = (current + 1) % WORDS.length;
      const from = WORDS[current].padEnd(6).split("");
      const to = WORDS[next].padEnd(6).split("");
      let step = 0;
      const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const interval = setInterval(() => {
        setLetters(from.map((l, i) => {
          if (step > i * 4 + 12) return to[i];
          if (step > i * 4) return CHARS[Math.floor(Math.random() * CHARS.length)];
          return l;
        }));
        setMorphing(from.map((_, i) => step > i * 4 && step <= i * 4 + 12));
        step++;
        if (step > 6 * 4 + 14) clearInterval(interval);
      }, 40);
      setCurrent(next);
    }, 2000);
    return () => clearInterval(timerRef.current);
  }, [current]);

  return (
    <div className="w-full h-full bg-[#050510] flex flex-col items-center justify-center gap-6">
      <div className="flex gap-0.5 h-16 items-center">
        {letters.map((l, i) => (
          <span key={i} className="text-5xl font-black w-10 text-center inline-block select-none"
            style={{
              color: morphing[i] ? "#f59e0b" : "#e2e8f0",
              textShadow: morphing[i] ? "0 0 20px #f59e0b" : "none",
              transform: morphing[i] ? "scaleY(1.1)" : "scaleY(1)",
              transition: "color 0.1s, transform 0.1s",
            }}>
            {l.trim() || "\u00a0"}
          </span>
        ))}
      </div>
      <p className="text-white/20 text-xs tracking-widest uppercase">Morphing between words</p>
    </div>
  );
}