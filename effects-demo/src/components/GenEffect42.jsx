import { useEffect, useRef } from "react";

export default function GenEffect42() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;
    let t = 0;

    const draw = () => {
      ctx.fillStyle = "rgba(5,5,16,0.04)";
      ctx.fillRect(0, 0, W, H);

      const A = W * 0.38, B = H * 0.38;
      const a = 3, b = 2, delta = t * 0.005;
      const STEPS = 500;

      ctx.beginPath();
      for (let i = 0; i <= STEPS; i++) {
        const angle = (i / STEPS) * Math.PI * 2;
        const x = cx + A * Math.sin(a * angle + delta);
        const y = cy + B * Math.sin(b * angle);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      const hue = (t * 0.5) % 360;
      ctx.strokeStyle = `hsla(${hue},80%,65%,0.6)`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      t++;
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full bg-[#050510]" />;
}