import { useEffect, useRef } from "react";

export default function PhysicsEffect35() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;

    const COLS = 20, ROWS = 14, SPACING = W / COLS;
    const points = [];
    const constraints = [];

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        points.push({
          x: c * SPACING + SPACING / 2, y: r * SPACING + 20,
          px: c * SPACING + SPACING / 2, py: r * SPACING + 20,
          pinned: r === 0 && c % 4 === 0,
          vx: 0, vy: 0,
        });
      }
    }
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (c < COLS - 1) constraints.push([r * COLS + c, r * COLS + c + 1, SPACING]);
        if (r < ROWS - 1) constraints.push([r * COLS + c, (r + 1) * COLS + c, SPACING]);
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#050510";
      ctx.fillRect(0, 0, W, H);

      const mx = mouseRef.current.x, my = mouseRef.current.y;

      points.forEach(p => {
        if (p.pinned) return;
        const vx = (p.x - p.px) * 0.98;
        const vy = (p.y - p.py) * 0.98;
        p.px = p.x; p.py = p.y;
        p.x += vx + (Math.sin(Date.now() * 0.001 + p.x * 0.01) * 0.3);
        p.y += vy + 0.3;

        const dx = p.x - mx, dy = p.y - my;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 40) { p.x += (dx / dist) * 3; p.y += (dy / dist) * 3; }
      });

      for (let i = 0; i < 3; i++) {
        constraints.forEach(([a, b, len]) => {
          const pa = points[a], pb = points[b];
          const dx = pb.x - pa.x, dy = pb.y - pa.y;
          const dist = Math.sqrt(dx*dx + dy*dy) || 1;
          const diff = (dist - len) / dist * 0.5;
          if (!pa.pinned) { pa.x += dx * diff; pa.y += dy * diff; }
          if (!pb.pinned) { pb.x -= dx * diff; pb.y -= dy * diff; }
        });
      }

      ctx.strokeStyle = "rgba(139,92,246,0.5)";
      ctx.lineWidth = 1;
      constraints.forEach(([a, b]) => {
        ctx.beginPath();
        ctx.moveTo(points[a].x, points[a].y);
        ctx.lineTo(points[b].x, points[b].y);
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
      <p className="absolute bottom-4 left-0 right-0 text-center text-white/20 text-xs tracking-widest uppercase pointer-events-none">Move mouse to push cloth</p>
    </div>
  );
}