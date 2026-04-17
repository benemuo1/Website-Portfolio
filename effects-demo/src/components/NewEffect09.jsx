import { useEffect, useRef } from "react";

export default function NewEffect09() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;
    const cx = W/2, cy = H/2;

    const stars = Array.from({ length: 600 }, (_, i) => {
      const arm = i % 3;
      const t = (i / 600) * Math.PI * 6;
      const r = t * 12 + Math.random() * 20;
      const angle = t + arm * (Math.PI * 2 / 3) + (Math.random()-0.5)*0.4;
      return {
        r, angle, baseAngle: angle,
        x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r * 0.5,
        size: Math.random() * 1.5 + 0.3,
        hue: 180 + Math.random() * 80,
        brightness: Math.random() * 0.6 + 0.4,
        speed: 0.0003 / (r * 0.01 + 0.1),
      };
    });

    let t = 0;
    const draw = () => {
      ctx.fillStyle = "rgba(5,5,20,0.15)";
      ctx.fillRect(0, 0, W, H);
      t += 0.5;

      stars.forEach(s => {
        s.angle += s.speed;
        s.x = cx + Math.cos(s.angle) * s.r;
        s.y = cy + Math.sin(s.angle) * s.r * 0.5;
        const twinkle = 0.5 + Math.sin(t * 0.05 + s.baseAngle * 10) * 0.5;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI*2);
        ctx.fillStyle = `hsla(${s.hue},70%,${60 + twinkle*30}%,${s.brightness * twinkle})`;
        ctx.fill();
      });

      // Core glow
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30);
      grd.addColorStop(0, "rgba(255,240,200,0.8)");
      grd.addColorStop(0.5, "rgba(200,180,255,0.3)");
      grd.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(cx, cy, 30, 0, Math.PI*2);
      ctx.fillStyle = grd;
      ctx.fill();

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}