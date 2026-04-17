import { useEffect, useState, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
const WORD = "DECODE";

export default function TextEffect01() {
  const [letters, setLetters] = useState(WORD.split("").map(() => CHARS[Math.floor(Math.random() * CHARS.length)]));
  const [solved, setSolved] = useState(Array(WORD.length).fill(false));
  const intervalRef = useRef(null);

  const scramble = () => {
    setSolved(Array(WORD.length).fill(false));
    let step = 0;
    intervalRef.current = setInterval(() => {
      setLetters(prev => prev.map((_, i) =>
        solved[i] || (step > i * 6) ? WORD[i] : CHARS[Math.floor(Math.random() * CHARS.length)]
      ));
      setSolved(prev => prev.map((s, i) => s || step > i * 6 + 20));
      step++;
      if (step > WORD.length * 6 + 25) clearInterval(intervalRef.current);
    }, 40);
  };

  useEffect(() => { scramble(); return () => clearInterval(intervalRef.current); }, []);

  return (
    <div className="w-full h-full bg-[#050510] flex flex-col items-center justify-center gap-6 cursor-pointer" onClick={scramble}>
      <div className="flex gap-1">
        {letters.map((l, i) => (
          <span key={i} className="text-5xl font-black font-mono"
            style={{ color: solved[i] ? "#a78bfa" : "#22c55e", textShadow: solved[i] ? "0 0 20px #a78bfa" : "0 0 10px #22c55e" }}>
            {l}
          </span>
        ))}
      </div>
      <p className="text-white/20 text-xs tracking-widest uppercase">Click to re-scramble</p>
    </div>
  );
}