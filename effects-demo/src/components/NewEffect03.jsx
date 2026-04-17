import { useEffect, useRef } from "react";

export default function NewEffect03() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;
    let t = 0;

    const draw = () => {
      ctx.fillStyle = "rgba(5,5,20,0.15)";
      ctx.fillRect(0, 0, W, H);
      t += 0.015;

      const mx = (mouseRef.current.x - W/2) / W;
      const my = (mouseRef.current.y - H/2) / H;
      const POINTS = 120;
      const BASE_R = Math.min(W, H) * 0.28;

      // Draw multiple layered blobs
      [0, 1, 2].forEach(layer => {
        const offset = layer * (Math.PI * 2 / 3);
        const hue = (layer * 80 + t * 20) % 360;
        ctx.beginPath();
        for (let i = 0; i <= POINTS; i++) {
          const angle = (i / POINTS) * Math.PI * 2;
          const noise =
            Math.sin(angle * 3 + t + offset) * 0.15 +
            Math.sin(angle * 5 - t * 1.3 + offset) * 0.1 +
            Math.sin(angle * 7 + t * 0.7 + offset) * 0.06 +
            mx * Math.cos(angle) * 0.2 +
            my * Math.sin(angle) * 0.2;
          const r = BASE_R * (1 + noise);
          const x = W/2 + Math.cos(angle) * r;
          const y = H/2 + Math.sin(angle) * r;
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        const grd = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, BASE_R * 1.3);
        grd.addColorStop(0, `hsla(${hue},80%,65%,0.3)`);
        grd.addColorStop(1, `hsla(${hue},80%,40%,0)`);
        ctx.fillStyle = grd;
        ctx.fill();
        ctx.strokeStyle = `hsla(${hue},80%,70%,0.4)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleMouseMove = (e) => {
    const r = canvasRef.current.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} onMouseMove={handleMouseMove} className="w-full h-full cursor-crosshair" />
      <p className="absolute bottom-4 left-0 right-0 text-center text-white/20 text-xs tracking-widest uppercase pointer-events-none">Move mouse to deform blob</p>
    </div>
  );
}