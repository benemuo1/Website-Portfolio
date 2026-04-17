import { useEffect, useRef } from "react";

export default function GenEffect46() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;

    const particles = Array.from({ length: 300 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      color: `hsla(${Math.random() * 60 + 180},80%,65%,0.6)`,
      speed: Math.random() * 1.5 + 0.5,
    }));

    let t = 0;
    ctx.fillStyle = "#050510";
    ctx.fillRect(0, 0, W, H);

    const draw = () => {
      ctx.fillStyle = "rgba(5,5,16,0.015)";
      ctx.fillRect(0, 0, W, H);

      t += 0.003;
      particles.forEach(p => {
        const angle = (Math.sin(p.x * 0.006 + t) + Math.cos(p.y * 0.006 + t * 0.7)) * Math.PI * 2;
        const px = p.x, py = p.y;
        p.x += Math.cos(angle) * p.speed;
        p.y += Math.sin(angle) * p.speed;

        if (p.x < 0 || p.x > W || p.y < 0 || p.y > H) {
          p.x = Math.random() * W; p.y = Math.random() * H; return;
        }

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}