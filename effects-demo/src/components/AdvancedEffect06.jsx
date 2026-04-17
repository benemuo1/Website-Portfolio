import { useEffect, useRef } from "react";

export default function AdvancedEffect06() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;

    let x = 0.1, y = 0, z = 0;
    const σ = 10, ρ = 28, β = 8/3, dt = 0.005;
    const trail = [];
    const MAX = 2000;
    let angle = 0;

    const draw = () => {
      ctx.fillStyle = "rgba(5,5,16,0.04)";
      ctx.fillRect(0, 0, W, H);
      angle += 0.003;

      for (let i = 0; i < 5; i++) {
        const dx = σ * (y - x), dy = x * (ρ - z) - y, dz = x * y - β * z;
        x += dx * dt; y += dy * dt; z += dz * dt;
        trail.push({ x, y, z });
        if (trail.length > MAX) trail.shift();
      }

      const cosA = Math.cos(angle), sinA = Math.sin(angle);
      trail.forEach((p, i) => {
        const rx = p.x * cosA - p.z * sinA;
        const sx = W/2 + rx * 4;
        const sy = H/2 + (p.y - 25) * 4;
        const alpha = i / MAX;
        const hue = (i / MAX * 280 + angle * 30) % 360;
        ctx.beginPath();
        ctx.arc(sx, sy, 0.8, 0, Math.PI*2);
        ctx.fillStyle = `hsla(${hue},80%,65%,${alpha * 0.8})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
      <p className="absolute bottom-4 left-0 right-0 text-center text-white/20 text-xs tracking-widest uppercase pointer-events-none">Lorenz Strange Attractor</p>
    </div>
  );
}