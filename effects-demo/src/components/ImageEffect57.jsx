import { useRef, useState } from "react";

const IMG = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop";

export default function ImageEffect57() {
  const ref = useRef(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
  };
  const handleMouseLeave = () => setMouse({ x: 0.5, y: 0.5 });

  const dx = (mouse.x - 0.5) * 30;
  const dy = (mouse.y - 0.5) * 30;

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      className="w-full h-full flex items-center justify-center bg-[#050510] overflow-hidden cursor-crosshair">
      <div className="relative w-4/5 h-4/5 rounded-xl overflow-hidden">
        <img src={IMG} alt="distort" className="w-full h-full object-cover"
          style={{
            filter: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><filter id='d'><feTurbulence type='turbulence' baseFrequency='0.02' numOctaves='3' result='noise'/><feDisplacementMap in='SourceGraphic' in2='noise' scale='${Math.abs(dx) + Math.abs(dy)}' xChannelSelector='R' yChannelSelector='G'/></filter></svg>#d")`,
            transform: `scale(1.05) translate(${dx * 0.1}px, ${dy * 0.1}px)`,
            transition: "transform 0.1s",
          }} />
        <div className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none">
          <p className="text-white/50 text-xs tracking-widest uppercase">Move mouse to distort</p>
        </div>
      </div>
    </div>
  );
}