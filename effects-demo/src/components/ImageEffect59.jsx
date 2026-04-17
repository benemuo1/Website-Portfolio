import { useRef, useState } from "react";

const IMG = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop";

export default function ImageEffect59() {
  const ref = useRef(null);
  const [shift, setShift] = useState(0);

  const handleMouseMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    setShift(Math.abs(e.clientX - r.left - r.width / 2) / r.width * 20);
  };
  const handleMouseLeave = () => setShift(0);

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      className="w-full h-full flex items-center justify-center bg-[#050510] cursor-crosshair overflow-hidden">
      <div className="relative w-4/5 h-4/5 rounded-xl overflow-hidden">
        <img src={IMG} alt="rgb" className="absolute inset-0 w-full h-full object-cover"
          style={{ mixBlendMode: "screen", filter: "url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><filter id='r'><feColorMatrix type='matrix' values='1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/></filter></svg>#r\")", transform: `translateX(${-shift}px)`, opacity: 0.8 }} />
        <img src={IMG} alt="rgb" className="absolute inset-0 w-full h-full object-cover"
          style={{ mixBlendMode: "screen", filter: "url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><filter id='g'><feColorMatrix type='matrix' values='0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0'/></filter></svg>#g\")", opacity: 0.8 }} />
        <img src={IMG} alt="rgb" className="absolute inset-0 w-full h-full object-cover"
          style={{ mixBlendMode: "screen", filter: "url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><filter id='b'><feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0'/></filter></svg>#b\")", transform: `translateX(${shift}px)`, opacity: 0.8 }} />
        <div className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none">
          <p className="text-white/50 text-xs tracking-widest uppercase">Move mouse for RGB split</p>
        </div>
      </div>
    </div>
  );
}