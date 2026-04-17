import { useEffect, useRef } from "react";

export default function Effect13() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: 200, y: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;

    const puffs = Array.from({ length: 60 }, (_, i) => ({
      x: Math.random() * W, y: H * 0.6 + Math.random() * H * 0.4,
      vx: (Math.random() - 0.5) * 0.4, vy: -(Math.random() * 0.6 + 0.2),
      size: Math.random() * 60 + 30,
      opacity: Math.random() * 0.12 + 0.04,
      life: Math.random(),
      maxLife: Math.random() * 200 + 150,
      hue: Math.random() * 40 + 200,
    }));

    const draw = () => {
      ctx.fillStyle = "rgba(8,5,20,0.15)";
      ctx.fillRect(0, 0, W, H);

      // Orbs glowing through fog
      [[W*0.3,H*0.5,"139,92,246"],[W*0.7,H*0.4,"236,72,153"],[W*0.5,H*0.3,"59,130,246"]].forEach(([x,y,c]) => {
        const grd = ctx.createRadialGradient(x,y,0,x,y,80);
        grd.addColorStop(0,`rgba(${c},0.5)`);
        grd.addColorStop(1,"transparent");
        ctx.beginPath(); ctx.arc(x,y,80,0,Math.PI*2);
        ctx.fillStyle = grd; ctx.fill();
      });

      puffs.forEach(p => {
        p.x += p.vx + (mouseRef.current.x / W - 0.5) * 0.3;
        p.y += p.vy;
        p.size += 0.3;
        p.life++;
        if (p.life > p.maxLife) {
          p.x = Math.random() * W; p.y = H + 20;
          p.size = Math.random() * 40 + 20; p.life = 0;
          p.maxLife = Math.random() * 200 + 150;
        }
        const progress = p.life / p.maxLife;
        const alpha = p.opacity * Math.sin(progress * Math.PI);
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        grd.addColorStop(0, `hsla(${p.hue},30%,70%,${alpha})`);
        grd.addColorStop(1, "transparent");
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
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
        <p className="text-white/30 text-xs tracking-widest uppercase">Move mouse to shift fog drift</p>
      </div>
    </div>
  );
}