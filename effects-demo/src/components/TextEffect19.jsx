import { useEffect, useState } from "react";

const WORD = "GRAVITY";

export default function TextEffect19() {
  const [positions, setPositions] = useState(WORD.split("").map(() => ({ y: -120, vy: 0, settled: false })));

  const drop = () => {
    setPositions(WORD.split("").map(() => ({ y: -120, vy: 0, settled: false })));
    const GRAVITY = 0.8, BOUNCE = 0.45, FLOOR = 0;
    const delays = WORD.split("").map((_, i) => i * 80);
    const states = WORD.split("").map(() => ({ y: -120, vy: 0, settled: false, started: false }));

    delays.forEach((delay, i) => {
      setTimeout(() => { states[i].started = true; }, delay);
    });

    const interval = setInterval(() => {
      let allSettled = true;
      states.forEach((s, i) => {
        if (!s.started || s.settled) return;
        allSettled = false;
        s.vy += GRAVITY;
        s.y += s.vy;
        if (s.y >= FLOOR) {
          s.y = FLOOR;
          s.vy *= -BOUNCE;
          if (Math.abs(s.vy) < 1) { s.vy = 0; s.settled = true; }
        }
      });
      setPositions(states.map(s => ({ ...s })));
      if (allSettled) clearInterval(interval);
    }, 16);
  };

  useEffect(() => { drop(); }, []);

  return (
    <div className="w-full h-full bg-[#050510] flex flex-col items-center justify-center gap-6 cursor-pointer overflow-hidden"
      onClick={drop}>
      <div className="flex gap-1 items-end" style={{ height: 80 }}>
        {WORD.split("").map((l, i) => (
          <span key={i} className="text-5xl font-black text-white select-none inline-block"
            style={{
              transform: `translateY(${positions[i].y}px)`,
              color: `hsl(${i * 40 + 200}, 80%, 65%)`,
              textShadow: `0 0 15px hsl(${i * 40 + 200}, 80%, 65%)`,
            }}>
            {l}
          </span>
        ))}
      </div>
      <p className="text-white/20 text-xs tracking-widest uppercase">Click to drop again</p>
    </div>
  );
}