import { useEffect, useRef } from "react";

export default function ThreeDEffect49() {
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
      ctx.fillStyle = "rgba(5,5,16,0.3)";
      ctx.fillRect(0, 0, W, H);
      t += 0.02;

      const RINGS = 20, SIDES = 8;
      for (let r = RINGS; r >= 0; r--) {
        const z = ((r / RINGS + t * 0.1) % 1) * 400;
        const scale = 200 / (z + 50);
        const radius = 80 * scale;
        const alpha = z / 400;
        const hue = (r * 20 + t * 30) % 360;

        ctx.beginPath();
        for (let s = 0; s <= SIDES; s++) {
          const angle = (s / SIDES) * Math.PI * 2 + t * 0.3;
          const x = cx + Math.cos(angle) * radius;
          const y = cy + Math.sin(angle) * radius;
          s === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `hsla(${hue},80%,60%,${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}