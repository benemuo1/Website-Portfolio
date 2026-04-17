import { useEffect, useRef } from "react";

export default function PhysicsEffect37() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 200, y: 50 });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;

    const SEGMENTS = 20, SEG_LEN = 12;
    const nodes = Array.from({ length: SEGMENTS }, (_, i) => ({ x: W / 2, y: 20 + i * SEG_LEN }));

    const draw = () => {
      ctx.fillStyle = "rgba(5,5,16,0.4)";
      ctx.fillRect(0, 0, W, H);

      nodes[0].x = mouseRef.current.x;
      nodes[0].y = mouseRef.current.y;

      for (let i = 1; i < SEGMENTS; i++) {
        const prev = nodes[i - 1], curr = nodes[i];
        const dx = curr.x - prev.x, dy = curr.y - prev.y;
        const dist = Math.sqrt(dx*dx + dy*dy) || 1;
        const diff = (dist - SEG_LEN) / dist;
        curr.x -= dx * diff * 0.5;
        curr.y -= dy * diff * 0.5;
        curr.y += 0.4; // gravity
      }

      ctx.beginPath();
      ctx.moveTo(nodes[0].x, nodes[0].y);
      nodes.forEach(n => ctx.lineTo(n.x, n.y));
      ctx.strokeStyle = "rgba(245,158,11,0.8)";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

      nodes.forEach((n, i) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, i === 0 ? 6 : 3, 0, Math.PI * 2);
        ctx.fillStyle = i === 0 ? "#f59e0b" : "rgba(245,158,11,0.5)";
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

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} onMouseMove={handleMouseMove} className="w-full h-full cursor-crosshair" />
      <p className="absolute bottom-4 left-0 right-0 text-center text-white/20 text-xs tracking-widest uppercase pointer-events-none">Move mouse to drag rope</p>
    </div>
  );
}