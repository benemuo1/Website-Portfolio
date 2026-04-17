import { useRef, useState } from "react";

const WORD = "DEPTH";
const DEPTHS = [0.8, 0.3, 1.2, 0.5, 1.0];

export default function TextEffect13() {
  const ref = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    setMouse({ x: (e.clientX - r.left - r.width / 2) / r.width, y: (e.clientY - r.top - r.height / 2) / r.height });
  };
  const handleMouseLeave = () => setMouse({ x: 0, y: 0 });

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      className="w-full h-full bg-[#050510] flex flex-col items-center justify-center gap-6 cursor-crosshair">
      <div className="flex gap-2 items-center">
        {WORD.split("").map((l, i) => {
          const d = DEPTHS[i];
          const tx = mouse.x * d * -40;
          const ty = mouse.y * d * -40;
          const blur = Math.abs(d - 0.7) * 2;
          const scale = 0.7 + d * 0.5;
          return (
            <span key={i} className="text-6xl font-black select-none inline-block"
              style={{
                transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
                transition: "transform 0.08s linear",
                color: `hsl(${260 + d * 40}, 80%, ${50 + d * 30}%)`,
                filter: `blur(${blur}px)`,
                textShadow: `0 0 ${20 * d}px hsl(${260 + d * 40}, 80%, 60%)`,
                zIndex: Math.round(d * 10),
              }}>
              {l}
            </span>
          );
        })}
      </div>
      <p className="text-white/20 text-xs tracking-widest uppercase">Move mouse — letters at different depths</p>
    </div>
  );
}