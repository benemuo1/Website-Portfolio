import { useEffect, useRef } from "react";

export default function PhysicsEffect38() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;

    const balls = Array.from({ length: 12 }, (_, i) => ({
      x: Math.random() * (W - 40) + 20,
      y: Math.random() * (H / 2),
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 2,
      r: Math.random() * 15 + 10,
      color: `hsl(${i * 30},80%,60%)`,
      restitution: 0.7 + Math.random() * 0.2,
    }));

    const draw = () => {
      ctx.fillStyle = "rgba(5,5,16,0.4)";
      ctx.fillRect(0, 0, W, H);

      balls.forEach(b => {
        b.vy += 0.3;
        b.x += b.vx; b.y += b.vy;
        if (b.x - b.r < 0) { b.x = b.r; b.vx *= -b.restitution; }
        if (b.x + b.r > W) { b.x = W - b.r; b.vx *= -b.restitution; }
        if (b.y + b.r > H) { b.y = H - b.r; b.vy *= -b.restitution; b.vx *= 0.98; }

        const grd = ctx.createRadialGradient(b.x - b.r * 0.3, b.y - b.r * 0.3, 0, b.x, b.y, b.r);
        grd.addColorStop(0, "rgba(255,255,255,0.4)");
        grd.addColorStop(1, b.color);
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.shadowColor = b.color;
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}