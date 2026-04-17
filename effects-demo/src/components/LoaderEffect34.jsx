import { useEffect, useRef, useState } from "react";

export default function LoaderEffect34() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const phaseRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;

    // Target: a star shape
    const STAR_POINTS = 20;
    const targets = Array.from({ length: STAR_POINTS * 2 }, (_, i) => {
      const angle = (i / (STAR_POINTS * 2)) * Math.PI * 2;
      const r = i % 2 === 0 ? 50 : 22;
      return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r };
    });

    const particles = targets.map((t, i) => ({
      x: Math.random() * W, y: Math.random() * H,
      tx: t.x, ty: t.y,
      color: `hsl(${(i / targets.length) * 280 + 200},80%,65%)`,
      size: Math.random() * 3 + 2,
    }));

    let t = 0;
    const draw = () => {
      ctx.fillStyle = "rgba(5,5,16,0.3)";
      ctx.fillRect(0, 0, W, H);

      const gather = (Math.sin(t * 0.02) + 1) / 2;
      phaseRef.current = gather;

      particles.forEach(p => {
        const sx = Math.random() * W, sy = Math.random() * H;
        p.x += (p.tx - p.x) * (0.04 + gather * 0.06);
        p.y += (p.ty - p.y) * (0.04 + gather * 0.06);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (0.5 + gather * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.4 + gather * 0.6;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      t++;
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}