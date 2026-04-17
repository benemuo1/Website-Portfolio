import { useEffect, useRef } from "react";

export default function AudioEffect56() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;

    const particles = Array.from({ length: 120 }, (_, i) => {
      const angle = (i / 120) * Math.PI * 2;
      return { angle, r: 0, speed: Math.random() * 2 + 1, size: Math.random() * 3 + 1, hue: (i / 120) * 360 };
    });

    let t = 0;
    const draw = () => {
      ctx.fillStyle = "rgba(5,5,16,0.25)";
      ctx.fillRect(0, 0, W, H);
      t += 0.04;

      const beat = Math.max(0, Math.sin(t * 3) * 0.7 + Math.sin(t * 7) * 0.3);

      particles.forEach(p => {
        p.r += p.speed * (0.5 + beat * 2);
        if (p.r > Math.max(W, H)) p.r = 0;

        const x = cx + Math.cos(p.angle) * p.r;
        const y = cy + Math.sin(p.angle) * p.r;
        const alpha = Math.max(0, 1 - p.r / (Math.max(W, H) * 0.5));

        ctx.beginPath();
        ctx.arc(x, y, p.size * (1 + beat), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},90%,65%,${alpha})`;
        ctx.shadowColor = `hsl(${p.hue},90%,65%)`;
        ctx.shadowBlur = beat * 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Center pulse
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30 + beat * 20);
      grd.addColorStop(0, `rgba(255,255,255,${0.3 + beat * 0.5})`);
      grd.addColorStop(1, "transparent");
      ctx.beginPath(); ctx.arc(cx, cy, 30 + beat * 20, 0, Math.PI * 2);
      ctx.fillStyle = grd; ctx.fill();

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}