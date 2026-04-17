import { useEffect, useRef } from "react";

export default function AudioEffect54() {
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
      ctx.fillStyle = "rgba(5,5,16,0.4)";
      ctx.fillRect(0, 0, W, H);
      t += 0.04;

      const BARS = 48;
      const barW = W / BARS - 2;
      for (let i = 0; i < BARS; i++) {
        const freq = i / BARS;
        const height = (Math.sin(freq * 8 + t * 3) * 0.4 + Math.sin(freq * 3 - t * 2) * 0.3 + Math.sin(t * 5 + i * 0.3) * 0.3 + 0.5) * H * 0.7;
        const hue = (i / BARS) * 200 + 180;
        const x = i * (barW + 2);

        const grd = ctx.createLinearGradient(0, H, 0, H - height);
        grd.addColorStop(0, `hsla(${hue},80%,50%,0.9)`);
        grd.addColorStop(1, `hsla(${hue + 40},80%,70%,0.6)`);

        ctx.fillStyle = grd;
        ctx.shadowColor = `hsl(${hue},80%,60%)`;
        ctx.shadowBlur = 8;
        ctx.fillRect(x, H - height, barW, height);
        ctx.shadowBlur = 0;
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}