import { useEffect, useRef, useState } from "react";

export default function LoaderEffect33() {
  const [progress, setProgress] = useState(0);
  const dirRef = useRef(1);
  const rafRef = useRef(null);

  useEffect(() => {
    const animate = () => {
      setProgress(prev => {
        const next = prev + dirRef.current * 0.4;
        if (next >= 100) { dirRef.current = -1; return 100; }
        if (next <= 0)   { dirRef.current =  1; return 0; }
        return next;
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const circumference = 2 * Math.PI * 45;
  const hue = progress * 1.2;

  return (
    <div className="w-full h-full bg-[#050510] flex flex-col items-center justify-center gap-6">
      <div className="relative" style={{ width: 110, height: 110 }}>
        <svg width="110" height="110" viewBox="0 0 110 110">
          <circle cx="55" cy="55" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
          <circle cx="55" cy="55" r="45" fill="none"
            stroke={`hsl(${hue},80%,60%)`} strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress / 100)}
            strokeLinecap="round"
            transform="rotate(-90 55 55)"
            style={{ filter: `drop-shadow(0 0 8px hsl(${hue},80%,60%))`, transition: "stroke-dashoffset 0.05s" }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-black text-lg">{Math.round(progress)}%</span>
        </div>
      </div>
      <p className="text-white/20 text-xs tracking-widest uppercase">Progress fill loader</p>
    </div>
  );
}