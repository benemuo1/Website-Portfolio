import { useEffect, useRef } from "react";

export default function AudioEffect55() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;
    let t = 0;

    const draw = () => {
      ctx.fillStyle = "rgba(5,5,16,0.2)";
      ctx.fillRect(0, 0, W, H);
      t += 0.03;

      const POINTS = 200;
      ctx.beginPath();
      for (let i = 0; i <= POINTS; i++) {
        const x = (i / POINTS) * W;
        const freq = i / POINTS;
        const y = H / 2 +
          Math.sin(freq * 12 + t * 4) * 30 +
          Math.sin(freq * 5 - t * 2) * 20 +
          Math.sin(freq * 20 + t * 6) * 10;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }

      const hue = (t * 20) % 360;
      const grd = ctx.createLinearGradient(0, 0, W, 0);
      grd.addColorStop(0, `hsla(${hue},80%,60%,0.8)`);
      grd.addColorStop(0.5, `hsla(${hue + 60},80%,70%,0.9)`);
      grd.addColorStop(1, `hsla(${hue + 120},80%,60%,0.8)`);
      ctx.strokeStyle = grd;
      ctx.lineWidth = 2;
      ctx.shadowColor = `hsl(${hue},80%,60%)`;
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}