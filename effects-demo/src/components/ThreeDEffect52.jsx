import { useEffect, useRef } from "react";

export default function ThreeDEffect52() {
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

    const project = (x, y, z) => {
      const fov = 350 / (350 + z + 200);
      return { sx: cx + x * fov, sy: cy + y * fov, fov };
    };

    const draw = () => {
      ctx.fillStyle = "rgba(5,5,16,0.3)";
      ctx.fillRect(0, 0, W, H);
      t += 0.02;

      const STEPS = 100, WIDTH = 20;
      const points = [];
      for (let i = 0; i <= STEPS; i++) {
        const u = (i / STEPS) * Math.PI * 4;
        const R = 80;
        const x = R * Math.cos(u + t);
        const y = R * Math.sin(u * 2 + t * 0.7) * 0.5;
        const z = R * Math.sin(u + t);
        const nx = -Math.sin(u + t);
        const ny = 0;
        const nz = Math.cos(u + t);
        points.push({ x, y, z, nx, ny, nz });
      }

      for (let i = 0; i < points.length - 1; i++) {
        const p = points[i], n = points[i + 1];
        const hue = (i / points.length * 360 + t * 30) % 360;
        const p1 = project(p.x + p.nx * WIDTH, p.y + p.ny * WIDTH, p.z + p.nz * WIDTH);
        const p2 = project(p.x - p.nx * WIDTH, p.y - p.ny * WIDTH, p.z - p.nz * WIDTH);
        const p3 = project(n.x - n.nx * WIDTH, n.y - n.ny * WIDTH, n.z - n.nz * WIDTH);
        const p4 = project(n.x + n.nx * WIDTH, n.y + n.ny * WIDTH, n.z + n.nz * WIDTH);

        ctx.beginPath();
        ctx.moveTo(p1.sx, p1.sy); ctx.lineTo(p2.sx, p2.sy);
        ctx.lineTo(p3.sx, p3.sy); ctx.lineTo(p4.sx, p4.sy);
        ctx.closePath();
        ctx.fillStyle = `hsla(${hue},80%,55%,0.4)`;
        ctx.strokeStyle = `hsla(${hue},80%,70%,0.6)`;
        ctx.lineWidth = 0.5;
        ctx.fill(); ctx.stroke();
      }

      t += 0;
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}