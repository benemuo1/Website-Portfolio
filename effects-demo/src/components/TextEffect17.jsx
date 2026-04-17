import { useEffect, useState } from "react";

const WORD = "SPLIT";

export default function TextEffect17() {
  const [offset, setOffset] = useState(0);
  const dirRef = { current: 1 };

  useEffect(() => {
    let dir = 1;
    let val = 0;
    let pausing = false;
    let pauseTimer = null;
    const interval = setInterval(() => {
      if (pausing) return;
      val += dir * 0.8;
      if (val >= 20) { val = 20; dir = -1; pausing = true; pauseTimer = setTimeout(() => { pausing = false; }, 600); }
      if (val <= 0)  { val = 0;  dir =  1; pausing = true; pauseTimer = setTimeout(() => { pausing = false; }, 600); }
      setOffset(val);
    }, 16);
    return () => { clearInterval(interval); clearTimeout(pauseTimer); };
  }, []);

  return (
    <div className="w-full h-full bg-[#050510] flex flex-col items-center justify-center gap-6 overflow-hidden">
      <div className="relative select-none" style={{ height: 80 }}>
        {/* Top half */}
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: "inset(0 0 50% 0)" }}>
          <span className="text-6xl font-black text-white block"
            style={{ transform: `translateY(${-offset}px)`, textShadow: "0 0 20px rgba(139,92,246,0.5)" }}>
            {WORD}
          </span>
        </div>
        {/* Bottom half */}
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: "inset(50% 0 0 0)" }}>
          <span className="text-6xl font-black text-white block"
            style={{ transform: `translateY(${offset}px)`, textShadow: "0 0 20px rgba(236,72,153,0.5)" }}>
            {WORD}
          </span>
        </div>
        {/* Gap line glow */}
        <div className="absolute left-0 right-0 h-px bg-purple-400/40 pointer-events-none" style={{ top: "50%" }} />
      </div>
      <p className="text-white/20 text-xs tracking-widest uppercase">Horizontal split animation</p>
    </div>
  );
}