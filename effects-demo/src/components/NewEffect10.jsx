import { useEffect, useRef, useState } from "react";

export default function NewEffect10() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const particlesRef = useRef([]);

  const spawn = (x, y) => {
    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 2;
      particlesRef.current.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random()-0.5) * 0.3,
        w: Math.random() * 10 + 4,
        h: Math.random() * 5 + 2,
        hue: Math.random() * 360,
        life: 1,
      });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;

    // Auto spawn
    spawn(W/2, H/2);
    const autoTimer = setInterval(() => spawn(Math.random()*W, Math.random()*H*0.5), 2000);

    const draw = () => {
      ctx.fillStyle = "rgba(5,5,20,0.2)";
      ctx.fillRect(0, 0, W, H);

      particlesRef.current = particlesRef.current.filter(p => p.life > 0);
      particlesRef.current.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        p.vy += 0.2; // gravity
        p.vx *= 0.99;
        p.rotation += p.rotSpeed;
        p.life -= 0.012;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.life;
        ctx.fillStyle = `hsl(${p.hue},90%,60%)`;
        ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
        ctx.restore();
        ctx.globalAlpha = 1;
      });

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(rafRef.current); clearInterval(autoTimer); };
  }, []);

  const handleClick = (e) => {
    const r = canvasRef.current.getBoundingClientRect();
    spawn(e.clientX - r.left, e.clientY - r.top);
  };

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} onClick={handleClick} className="w-full h-full cursor-pointer" />
      <p className="absolute bottom-4 left-0 right-0 text-center text-white/20 text-xs tracking-widest uppercase pointer-events-none">Click to burst confetti</p>
    </div>
  );
}