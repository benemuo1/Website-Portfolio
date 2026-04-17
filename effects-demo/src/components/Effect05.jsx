import { useEffect, useRef } from "react";

function noise(x, y, t) {
  return Math.sin(x * 0.8 + t) * Math.cos(y * 0.6 + t * 0.7) +
         Math.sin(x * 0.3 - t * 0.5) * Math.sin(y * 0.9 + t * 0.3) +
         Math.cos(x * 1.2 + y * 0.4 + t * 0.8) * 0.5;
}

export default function Effect05() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;
    const COLS = 30, ROWS = 22;
    const cw = W / COLS, ch = H / ROWS;

    const particles = Array.from({ length: 200 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: 0, vy: 0,
      color: `hsl(${Math.random() * 60 + 200}, 80%, 65%)`,
      size: Math.random() * 2 + 1,
    }));

    let t = 0;
    const draw = () => {
      ctx.fillStyle = "rgba(5,5,20,0.15)";
      ctx.fillRect(0, 0, W, H);

      t += 0.008;
      particles.forEach(p => {
        const gx = Math.floor(p.x / cw), gy = Math.floor(p.y / ch);
        const angle = noise(gx * 0.3, gy * 0.3, t) * Math.PI * 2;
        p.vx = p.vx * 0.9 + Math.cos(angle) * 0.8;
        p.vy = p.vy * 0.9 + Math.sin(angle) * 0.8;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.7;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}