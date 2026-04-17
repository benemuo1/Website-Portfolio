import { useEffect, useRef } from "react";

export default function NewEffect07() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;
    const cx = W/2, cy = H/2;
    const SEGMENTS = 12;
    let t = 0;

    const draw = () => {
      ctx.fillStyle = "rgba(5,5,20,0.08)";
      ctx.fillRect(0, 0, W, H);
      t += 0.008;

      const SHAPES = 6;
      for (let seg = 0; seg < SEGMENTS; seg++) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate((seg / SEGMENTS) * Math.PI * 2);
        if (seg % 2 === 0) ctx.scale(1, -1);

        for (let s = 0; s < SHAPES; s++) {
          const angle = t * (s + 1) * 0.3 + s * 1.2;
          const r = 30 + s * 18 + Math.sin(t * 0.7 + s) * 15;
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r * 0.5;
          const size = 8 + Math.sin(t + s * 0.8) * 4;
          const hue = (t * 30 + s * 50 + seg * 20) % 360;

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${hue},80%,60%,0.5)`;
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + Math.cos(angle + 1) * size * 2, y + Math.sin(angle + 1) * size);
          ctx.strokeStyle = `hsla(${hue+40},80%,70%,0.3)`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}