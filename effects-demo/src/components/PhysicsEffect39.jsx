import { useEffect, useRef } from "react";

export default function PhysicsEffect39() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;

    const boids = Array.from({ length: 80 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2,
    }));

    const draw = () => {
      ctx.fillStyle = "rgba(5,5,16,0.3)";
      ctx.fillRect(0, 0, W, H);

      const mx = mouseRef.current.x, my = mouseRef.current.y;

      boids.forEach(b => {
        let ax = 0, ay = 0, cx = 0, cy = 0, sx = 0, sy = 0, count = 0;
        boids.forEach(other => {
          if (other === b) return;
          const dx = other.x - b.x, dy = other.y - b.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 60) {
            cx += other.x; cy += other.y;
            ax += other.vx; ay += other.vy;
            count++;
            if (dist < 20) { sx -= dx / dist; sy -= dy / dist; }
          }
        });
        if (count > 0) {
          b.vx += (cx / count - b.x) * 0.001 + (ax / count - b.vx) * 0.05 + sx * 0.05;
          b.vy += (cy / count - b.y) * 0.001 + (ay / count - b.vy) * 0.05 + sy * 0.05;
        }
        // Avoid mouse
        const mdx = b.x - mx, mdy = b.y - my;
        const mdist = Math.sqrt(mdx*mdx + mdy*mdy);
        if (mdist < 80) { b.vx += (mdx / mdist) * 0.5; b.vy += (mdy / mdist) * 0.5; }

        const speed = Math.sqrt(b.vx*b.vx + b.vy*b.vy);
        if (speed > 3) { b.vx = (b.vx / speed) * 3; b.vy = (b.vy / speed) * 3; }
        b.x += b.vx; b.y += b.vy;
        if (b.x < 0) b.x = W; if (b.x > W) b.x = 0;
        if (b.y < 0) b.y = H; if (b.y > H) b.y = 0;

        const angle = Math.atan2(b.vy, b.vx);
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(6, 0); ctx.lineTo(-4, 3); ctx.lineTo(-4, -3);
        ctx.closePath();
        ctx.fillStyle = `hsl(${200 + speed * 40},80%,65%)`;
        ctx.fill();
        ctx.restore();
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
      <p className="absolute bottom-4 left-0 right-0 text-center text-white/20 text-xs tracking-widest uppercase pointer-events-none">Move mouse to scatter the flock</p>
    </div>
  );
}