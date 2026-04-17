import { useEffect, useRef } from "react";

export default function Effect12() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;

    const BARS = 64;
    let t = 0;

    const getBeat = (i, time) => {
      const base = Math.sin(time * 2.1 + i * 0.15) * 0.5 + 0.5;
      const kick = Math.max(0, Math.sin(time * 4) * 0.8);
      const snare = Math.max(0, Math.sin(time * 4 + Math.PI) * 0.5);
      const hi = Math.abs(Math.sin(time * 8 + i * 0.3)) * 0.3;
      return (base * 0.4 + kick * 0.3 + snare * 0.2 + hi * 0.1) * (0.5 + (i / BARS) * 0.5);
    };

    const draw = () => {
      ctx.fillStyle = "rgba(5,5,15,0.4)";
      ctx.fillRect(0, 0, W, H);
      t += 0.025;

      for (let i = 0; i < BARS; i++) {
        const angle = (i / BARS) * Math.PI * 2 - Math.PI / 2;
        const amp = getBeat(i, t);
        const innerR = 60, outerR = innerR + amp * 100;
        const hue = (i / BARS) * 280 + t * 30;

        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angle) * innerR, cy + Math.sin(angle) * innerR);
        ctx.lineTo(cx + Math.cos(angle) * outerR, cy + Math.sin(angle) * outerR);
        ctx.strokeStyle = `hsla(${hue},90%,65%,0.85)`;
        ctx.lineWidth = (W / BARS) * 0.6;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      // Center glow
      const pulse = Math.sin(t * 2) * 0.5 + 0.5;
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 70);
      grd.addColorStop(0, `rgba(255,200,100,${0.4 + pulse * 0.4})`);
      grd.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(cx, cy, 70, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}