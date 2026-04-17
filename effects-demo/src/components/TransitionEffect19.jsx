import { useState, useEffect, useRef } from "react";

export default function TransitionEffect19() {
  const [glitching, setGlitching] = useState(false);
  const [page, setPage] = useState(1);
  const [offsets, setOffsets] = useState([0, 0, 0]);

  const trigger = () => {
    if (glitching) return;
    setGlitching(true);
    let t = 0;
    const interval = setInterval(() => {
      setOffsets([(Math.random()-0.5)*20, (Math.random()-0.5)*20, (Math.random()-0.5)*20]);
      t++;
      if (t === 6) { setPage(p => p === 1 ? 2 : 1); }
      if (t > 12) { clearInterval(interval); setGlitching(false); setOffsets([0,0,0]); }
    }, 60);
  };

  return (
    <div className="w-full h-full relative overflow-hidden cursor-pointer flex items-center justify-center bg-[#050505]" onClick={trigger}>
      <div className="relative select-none text-center">
        <span className="absolute text-4xl font-black text-red-500/70" style={{ transform: `translate(${offsets[0]}px,0)`, mixBlendMode:"screen" }}>Page {page}</span>
        <span className="absolute text-4xl font-black text-blue-400/70" style={{ transform: `translate(${offsets[1]}px,0)`, mixBlendMode:"screen" }}>Page {page}</span>
        <span className="text-4xl font-black text-white" style={{ transform: `translate(${offsets[2]}px,0)`, display:"block" }}>Page {page}</span>
        <p className="text-white/40 text-xs tracking-widest uppercase mt-2">Click to glitch transition</p>
      </div>
    </div>
  );
}