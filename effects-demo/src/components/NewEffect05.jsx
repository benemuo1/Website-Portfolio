import { useEffect, useRef } from "react";

export default function NewEffect05() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;

    const draw = () => {
      ctx.fillStyle = "rgba(5,5,20,0.12)";
      ctx.fillRect(0, 0, W, H);

      const mx = mouseRef.current.x, my = mouseRef.current.y;
      if (mx > 0 && mx < W) {
        for (let i = 0; i < 3; i++) {
          particlesRef.current.push({
            x: mx + (Math.random()-0.5)*10,
            y: my + (Math.random()-0.5)*10,
            vx: (Math.random()-0.5)*1.5,
            vy: -(Math.random()*1.5+0.5),
            life: 1,
            size: Math.random()*20+10,
            hue: Math.random()*60+200,
          });
        }
      }

      particlesRef.current = particlesRef.current.filter(p => p.life > 0);
      particlesRef.current.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        p.vx *= 0.98; p.vy *= 0.98;
        p.size += 0.5;
        p.life -= 0.015;
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        grd.addColorStop(0, `hsla(${p.hue},60%,70%,${p.life * 0.3})`);
        grd.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
        ctx.fillStyle = grd;
        ctx.fill();
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
  const handleMouseLeave = () => { mouseRef.current = { x: -999, y: -999 }; };

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="w-full h-full cursor-none" />
      <p className="absolute bottom-4 left-0 right-0 text-center text-white/20 text-xs tracking-widest uppercase pointer-events-none">Move mouse to create smoke</p>
    </div>
  );
}