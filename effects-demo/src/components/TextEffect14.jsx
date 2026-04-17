import { useEffect, useRef } from "react";

export default function TextEffect14() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;

    const particles = [];
    const WORD = "FIRE";
    const letterW = 52, startX = W / 2 - (WORD.length * letterW) / 2;

    const spawn = () => {
      WORD.split("").forEach((_, i) => {
        for (let j = 0; j < 3; j++) {
          particles.push({
            x: startX + i * letterW + letterW / 2 + (Math.random() - 0.5) * 30,
            y: H / 2 + 30,
            vx: (Math.random() - 0.5) * 1.5,
            vy: -(Math.random() * 2 + 1),
            life: 1,
            decay: Math.random() * 0.015 + 0.01,
            size: Math.random() * 12 + 6,
          });
        }
      });
    };

    let t = 0;
    const draw = () => {
      ctx.fillStyle = "rgba(5,5,15,0.3)";
      ctx.fillRect(0, 0, W, H);

      if (t % 2 === 0) spawn();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx + Math.sin(t * 0.05 + i) * 0.3;
        p.y += p.vy;
        p.life -= p.decay;
        p.size *= 0.99;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        const r = Math.round(255);
        const g = Math.round(p.life * 180);
        const b = 0;
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        grd.addColorStop(0, `rgba(${r},${g},${b},${p.life * 0.8})`);
        grd.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }

      // Draw text
      ctx.font = "bold 72px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "rgba(255,200,100,0.9)";
      ctx.fillText(WORD, W / 2, H / 2 + 10);

      t++;
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}