import { useEffect, useRef } from "react";

export default function ThreeDEffect50() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;
    let t = 0;

    const project = (x, y, z) => {
      const fov = 300 / (300 + z + 100);
      return { sx: W / 2 + x * fov, sy: H / 2 + y * fov };
    };

    const draw = () => {
      ctx.fillStyle = "rgba(5,5,16,0.4)";
      ctx.fillRect(0, 0, W, H);
      t += 0.04;

      const COLS = 16, ROWS = 12, SPACING = 22;
      const offsetX = -(COLS * SPACING) / 2;
      const offsetY = -(ROWS * SPACING) / 2;

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const x3d = offsetX + col * SPACING;
          const z3d = offsetY + row * SPACING;
          const y3d = Math.sin(col * 0.5 + t) * Math.cos(row * 0.5 + t * 0.7) * 30;

          const tiltX = -0.5, tiltY = 0.3;
          const y2 = y3d * Math.cos(tiltX) - z3d * Math.sin(tiltX);
          const z2 = y3d * Math.sin(tiltX) + z3d * Math.cos(tiltX);
          const x2 = x3d * Math.cos(tiltY) + z2 * Math.sin(tiltY);
          const z3 = -x3d * Math.sin(tiltY) + z2 * Math.cos(tiltY);

          const { sx, sy } = project(x2, y2, z3);
          const hue = (col * 15 + row * 10 + t * 20) % 360;
          const brightness = (y3d + 30) / 60;

          ctx.beginPath();
          ctx.arc(sx, sy, 2, 0, Math.PI * 2);
          ctx.fillStyle = `hsl(${hue},80%,${40 + brightness * 30}%)`;
          ctx.fill();

          if (col < COLS - 1) {
            const nx3d = offsetX + (col + 1) * SPACING;
            const ny3d = Math.sin((col + 1) * 0.5 + t) * Math.cos(row * 0.5 + t * 0.7) * 30;
            const ny2 = ny3d * Math.cos(tiltX) - z3d * Math.sin(tiltX);
            const nz2 = ny3d * Math.sin(tiltX) + z3d * Math.cos(tiltX);
            const nx2 = nx3d * Math.cos(tiltY) + nz2 * Math.sin(tiltY);
            const nz3 = -nx3d * Math.sin(tiltY) + nz2 * Math.cos(tiltY);
            const { sx: nsx, sy: nsy } = project(nx2, ny2, nz3);
            ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(nsx, nsy);
            ctx.strokeStyle = `hsla(${hue},70%,50%,0.3)`; ctx.lineWidth = 0.8; ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}