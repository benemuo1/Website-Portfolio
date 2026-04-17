import { useEffect, useRef } from "react";

export default function Effect15() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: 200, y: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;

    let t = 0;
    const COLS = 80, ROWS = 60;
    const cw = W / COLS, ch = H / ROWS;

    const draw = () => {
      t += 0.02;
      const mx = mouseRef.current.x, my = mouseRef.current.y;

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const x = col * cw, y = row * ch;
          const cx2 = x + cw / 2, cy2 = y + ch / 2;
          const dx = (cx2 - mx) / W, dy = (cy2 - my) / H;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const wave1 = Math.sin(col * 0.3 + t * 2) * Math.cos(row * 0.2 + t);
          const wave2 = Math.sin(dist * 15 - t * 3) * 0.5;
          const ripple = Math.sin(dist * 20 - t * 4) * Math.exp(-dist * 3) * 2;
          const height = (wave1 + wave2 + ripple) * 0.5 + 0.5;

          const r = Math.round(180 + height * 60);
          const g = Math.round(180 + height * 60);
          const b = Math.round(200 + height * 55);
          const specular = Math.max(0, Math.sin(col * 0.4 + t * 1.5) * Math.cos(row * 0.3 + t)) * 80;

          ctx.fillStyle = `rgb(${Math.min(255,r+specular)},${Math.min(255,g+specular)},${Math.min(255,b+specular)})`;
          ctx.fillRect(x, y, cw + 1, ch + 1);
        }
      }

      // Orb reflections
      [[W*0.3,H*0.4,"255,100,100"],[W*0.7,H*0.5,"100,100,255"],[W*0.5,H*0.25,"100,255,150"]].forEach(([ox,oy,c]) => {
        const grd = ctx.createRadialGradient(ox,oy,0,ox,oy,60);
        grd.addColorStop(0,`rgba(${c},0.4)`);
        grd.addColorStop(1,"transparent");
        ctx.beginPath(); ctx.arc(ox,oy,60,0,Math.PI*2);
        ctx.fillStyle = grd; ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleMouseMove = (e) => {
    const r = canvasRef.current.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} onMouseMove={handleMouseMove} className="w-full h-full cursor-crosshair" />
      <div className="absolute inset-0 flex items-end justify-center pb-6 pointer-events-none">
        <p className="text-black/40 text-xs tracking-widest uppercase">Move mouse to disturb the surface</p>
      </div>
    </div>
  );
}