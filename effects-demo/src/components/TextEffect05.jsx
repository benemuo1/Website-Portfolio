import { useEffect, useState, useRef } from "react";

const PHRASES = ["Web Developer", "Full-Stack Engineer", "UI Designer", "Creative Coder"];

export default function TextEffect05() {
  const [displayed, setDisplayed] = useState("");
  const [cursor, setCursor] = useState(true);
  const phaseRef = useRef(0);
  const indexRef = useRef(0);
  const deletingRef = useRef(false);

  useEffect(() => {
    const cursorInterval = setInterval(() => setCursor(c => !c), 530);
    const type = () => {
      const phrase = PHRASES[phaseRef.current];
      if (!deletingRef.current) {
        if (indexRef.current < phrase.length) {
          setDisplayed(phrase.slice(0, ++indexRef.current));
          setTimeout(type, 80);
        } else {
          setTimeout(() => { deletingRef.current = true; type(); }, 1800);
        }
      } else {
        if (indexRef.current > 0) {
          setDisplayed(phrase.slice(0, --indexRef.current));
          setTimeout(type, 40);
        } else {
          deletingRef.current = false;
          phaseRef.current = (phaseRef.current + 1) % PHRASES.length;
          setTimeout(type, 400);
        }
      }
    };
    type();
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="w-full h-full bg-[#050510] flex flex-col items-center justify-center gap-4">
      <p className="text-white/30 text-sm tracking-widest uppercase">I am a</p>
      <div className="flex items-center gap-1 h-14">
        <span className="text-3xl font-bold text-purple-400">{displayed}</span>
        <span className="text-3xl font-bold text-purple-300" style={{ opacity: cursor ? 1 : 0, transition: "opacity 0.1s" }}>|</span>
      </div>
    </div>
  );
}