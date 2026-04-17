import { useEffect, useRef } from "react";

export default function LoaderEffect29() {
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
      const RUNGS = 10, RADIUS = 50, TWIST = t * 0.05;

      for (let i = 0; i < RUNGS; i++) {
        const progress = i / RUNGS;
        const y = cy - RADIUS + progress * RADIUS * 2;
        const angle = progress * Math.PI * 4 + TWIST;
        const x1 = cx + Math.cos(angle) * 30;
        const x2 = cx + Math.cos(angle + Math.PI) * 30;
        const hue = (progress * 180 + t * 2) % 360;

        // Strands
        if (i > 0) {
          const prevY = cy - RADIUS + ((i-1) / RUNGS) * RADIUS * 2;
          const prevAngle = ((i-1) / RUNGS) * Math.PI * 4 + TWIST;
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(prevAngle) * 30, prevY);
          ctx.lineTo(x1, y);
          ctx.strokeStyle = `hsl(${hue},80%,60%)`;
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(prevAngle + Math.PI) * 30, prevY);
          ctx.lineTo(x2, y);
          ctx.strokeStyle = `hsl(${hue + 180},80%,60%)`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Rungs
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.strokeStyle = `rgba(255,255,255,0.4)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      t++;
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}