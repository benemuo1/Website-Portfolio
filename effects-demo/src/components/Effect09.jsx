import { useRef, useState } from "react";

export default function Effect09() {
  const ref = useRef(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
  };

  const edgeDist = Math.max(
    Math.abs(mouse.x - 0.5) * 2,
    Math.abs(mouse.y - 0.5) * 2
  );
  const shift = edgeDist * 12;
  const angle = Math.atan2(mouse.y - 0.5, mouse.x - 0.5);
  const dx = Math.cos(angle) * shift;
  const dy = Math.sin(angle) * shift;

  return (
    <div ref={ref} onMouseMove={handleMouseMove}
      className="relative w-full h-full overflow-hidden bg-[#080808] flex items-center justify-center cursor-crosshair">
      {/* Background orbs */}
      {[["255,50,100","20%","40%"],["50,150,255","65%","55%"],["100,255,150","45%","25%"]].map(([c,x,y],i) => (
        <div key={i} className="absolute rounded-full pointer-events-none"
          style={{ left:x, top:y, width:120, height:120, transform:"translate(-50%,-50%)",
            background:`radial-gradient(circle, rgba(${c},0.7) 0%, transparent 70%)`, filter:"blur(20px)" }} />
      ))}
      {/* Chromatic text layers */}
      <div className="relative select-none">
        <span className="absolute text-5xl font-black tracking-tight"
          style={{ color: "rgba(255,0,0,0.7)", transform: `translate(${-dx}px, ${-dy}px)`, filter: "blur(0.5px)" }}>
          CHROMA
        </span>
        <span className="absolute text-5xl font-black tracking-tight"
          style={{ color: "rgba(0,255,0,0.7)", transform: `translate(0px, 0px)` }}>
          CHROMA
        </span>
        <span className="absolute text-5xl font-black tracking-tight"
          style={{ color: "rgba(0,100,255,0.7)", transform: `translate(${dx}px, ${dy}px)`, filter: "blur(0.5px)" }}>
          CHROMA
        </span>
        <span className="text-5xl font-black tracking-tight text-transparent">CHROMA</span>
      </div>
      <div className="absolute inset-0 flex items-end justify-center pb-6">
        <p className="text-white/30 text-xs tracking-widest uppercase">Move to edges for max aberration</p>
      </div>
    </div>
  );
}