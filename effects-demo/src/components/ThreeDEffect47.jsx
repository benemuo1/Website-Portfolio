import { useEffect, useRef } from "react";

export default function ThreeDEffect47() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, dragging: false, lastX: 0, lastY: 0 });
  const rotRef = useRef({ x: 0.3, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;

    const LAT = 12, LON = 18, R = 80;
    const lines = [];
    for (let i = 0; i <= LAT; i++) {
      const lat = (i / LAT) * Math.PI - Math.PI / 2;
      const pts = [];
      for (let j = 0; j <= LON; j++) {
        const lon = (j / LON) * Math.PI * 2;
        pts.push([R * Math.cos(lat) * Math.cos(lon), R * Math.sin(lat), R * Math.cos(lat) * Math.sin(lon)]);
      }
      lines.push(pts);
    }
    for (let j = 0; j <= LON; j++) {
      const lon = (j / LON) * Math.PI * 2;
      const pts = [];
      for (let i = 0; i <= LAT; i++) {
        const lat = (i / LAT) * Math.PI - Math.PI / 2;
        pts.push([R * Math.cos(lat) * Math.cos(lon), R * Math.sin(lat), R * Math.cos(lat) * Math.sin(lon)]);
      }
      lines.push(pts);
    }

    const project = ([x, y, z], rx, ry) => {
      const cosX = Math.cos(rx), sinX = Math.sin(rx);
      const cosY = Math.cos(ry), sinY = Math.sin(ry);
      const y1 = y * cosX - z * sinX, z1 = y * sinX + z * cosX;
      const x2 = x * cosY + z1 * sinY, z2 = -x * sinY + z1 * cosY;
      const fov = 300 / (300 + z2 + 200);
      return { sx: cx + x2 * fov, sy: cy + y1 * fov, z: z2 };
    };

    const draw = () => {
      ctx.fillStyle = "rgba(5,5,16,0.4)";
      ctx.fillRect(0, 0, W, H);
      if (!mouseRef.current.dragging) rotRef.current.y += 0.005;
      const { x: rx, y: ry } = rotRef.current;

      lines.forEach(pts => {
        ctx.beginPath();
        pts.forEach((p, i) => {
          const { sx, sy, z } = project(p, rx, ry);
          const alpha = (z + 200) / 400;
          i === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
        });
        ctx.strokeStyle = "rgba(99,102,241,0.5)";
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const onMouseDown = (e) => { mouseRef.current.dragging = true; mouseRef.current.lastX = e.clientX; mouseRef.current.lastY = e.clientY; };
  const onMouseMove = (e) => {
    if (!mouseRef.current.dragging) return;
    rotRef.current.y += (e.clientX - mouseRef.current.lastX) * 0.01;
    rotRef.current.x += (e.clientY - mouseRef.current.lastY) * 0.01;
    mouseRef.current.lastX = e.clientX; mouseRef.current.lastY = e.clientY;
  };
  const onMouseUp = () => mouseRef.current.dragging = false;

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}
        className="w-full h-full cursor-grab active:cursor-grabbing" />
      <p className="absolute bottom-4 left-0 right-0 text-center text-white/20 text-xs tracking-widest uppercase pointer-events-none">Drag to rotate globe</p>
    </div>
  );
}