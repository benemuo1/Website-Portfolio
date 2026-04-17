import { useEffect, useRef } from "react";

export default function AdvancedEffect15() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;

    const COLS = 10, ROWS = 8;
    const nodes = [];
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
      nodes.push({
        x: (c + 1) * (W / (COLS + 1)), y: (r + 1) * (H / (ROWS + 1)),
        ox: (c + 1) * (W / (COLS + 1)), oy: (r + 1) * (H / (ROWS + 1)),
        vx: 0, vy: 0,
      });
    }

    const springs = [];
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
      const i = r * COLS + c;
      if (c < COLS - 1) springs.push([i, i + 1]);
      if (r < ROWS - 1) springs.push([i, i + COLS]);
    }

    const draw = () => {
      ctx.fillStyle = "rgba(5,5,16,0.3)";
      ctx.fillRect(0, 0, W, H);

      const mx = mouseRef.current.x, my = mouseRef.current.y;
      nodes.forEach(n => {
        n.vx += (n.ox - n.x) * 0.04;
        n.vy += (n.oy - n.y) * 0.04;
        const dx = n.x - mx, dy = n.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy) + 1;
        if (dist < 80) { n.vx += (dx / dist) * (80 - dist) * 0.15; n.vy += (dy / dist) * (80 - dist) * 0.15; }
        n.vx *= 0.85; n.vy *= 0.85;
        n.x += n.vx; n.y += n.vy;
      });

      springs.forEach(([a, b]) => {
        const na = nodes[a], nb = nodes[b];
        const stretch = Math.sqrt((na.x - nb.x) ** 2 + (na.y - nb.y) ** 2);
        const rest = Math.sqrt((na.ox - nb.ox) ** 2 + (na.oy - nb.oy) ** 2);
        const tension = Math.min(1, Math.abs(stretch - rest) / rest);
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.strokeStyle = `hsla(${200 + tension * 160},70%,${50 + tension * 30}%,${0.3 + tension * 0.6})`;
        ctx.lineWidth = 0.8 + tension * 2;
        ctx.stroke();
      });

      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(139,92,246,0.8)";
        ctx.fill();
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
  const handleMouseLeave = () => { mouseRef.current = { x: -999, y: -999 }; };

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="w-full h-full cursor-crosshair" />
      <p className="absolute bottom-4 left-0 right-0 text-center text-white/20 text-xs tracking-widest uppercase pointer-events-none">Move mouse to disturb the spring network</p>
    </div>
  );
}