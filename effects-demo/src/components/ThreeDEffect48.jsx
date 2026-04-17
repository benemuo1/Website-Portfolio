import { useEffect, useRef } from "react";

export default function ThreeDEffect48() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;

    const N = 600;
    const particles = Array.from({ length: N }, (_, i) => {
      const phi = Math.acos(1 - 2 * (i + 0.5) / N);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const R = 90;
      return { x: R * Math.sin(phi) * Math.cos(theta), y: R * Math.sin(phi) * Math.sin(theta), z: R * Math.cos(phi), hue: (i / N) * 280 + 180 };
    });

    let t = 0;
    const draw = () => {
      ctx.fillStyle = "rgba(5,5,16,0.3)";
      ctx.fillRect(0, 0, W, H);
      t += 0.008;

      const sorted = particles.map(p => {
        const cosT = Math.cos(t), sinT = Math.sin(t);
        const x2 = p.x * cosT - p.z * sinT;
        const z2 = p.x * sinT + p.z * cosT;
        const fov = 300 / (300 + z2 + 200);
        return { sx: cx + x2 * fov, sy: cy + p.y * fov, z: z2, hue: p.hue, fov };
      }).sort((a, b) => a.z - b.z);

      sorted.forEach(p => {
        const size = Math.max(0.5, p.fov * 3);
        const alpha = (p.z + 200) / 400;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},80%,65%,${alpha})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}