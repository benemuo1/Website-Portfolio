import { useEffect, useRef } from "react";

export default function LoaderEffect31() {
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
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#050510";
      ctx.fillRect(0, 0, W, H);

      const POINTS = 8;
      const BASE_R = 50;
      ctx.beginPath();
      for (let i = 0; i <= POINTS; i++) {
        const angle = (i / POINTS) * Math.PI * 2 - Math.PI / 2;
        const noise = Math.sin(angle * 3 + t * 0.04) * 15 + Math.cos(angle * 2 - t * 0.03) * 10;
        const r = BASE_R + noise;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();

      const hue = (t * 0.8) % 360;
      const grd = ctx.createRadialGradient(cx - 15, cy - 15, 0, cx, cy, 70);
      grd.addColorStop(0, `hsl(${hue + 40},90%,75%)`);
      grd.addColorStop(1, `hsl(${hue},80%,50%)`);
      ctx.fillStyle = grd;
      ctx.shadowColor = `hsl(${hue},80%,60%)`;
      ctx.shadowBlur = 30;
      ctx.fill();
      ctx.shadowBlur = 0;

      t++;
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}