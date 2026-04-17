import { useEffect, useRef } from "react";

export default function Effect10() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 200, y: 150 });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;

    const particles = Array.from({ length: 180 }, (_, i) => ({
      x: Math.random() * W, y: Math.random() * H,
      ox: 0, oy: 0,
      color: `hsl(${(i * 37) % 360}, 70%, 65%)`,
      size: Math.random() * 2 + 1,
    }));

    const draw = () => {
      ctx.fillStyle = "rgba(5,5,15,0.25)";
      ctx.fillRect(0, 0, W, H);

      const mx = mouseRef.current.x, my = mouseRef.current.y;
      const GRAVITY = 8000, RADIUS = 200;

      particles.forEach(p => {
        const dx = p.x - mx, dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < RADIUS && dist > 20) {
          const force = GRAVITY / (dist * dist);
          const angle = Math.atan2(dy, dx) + (Math.PI / 2) * (force / 20);
          p.x += Math.cos(angle) * force * 0.05;
          p.y += Math.sin(angle) * force * 0.05;
        }
        p.x += (p.ox - p.x) * 0.005 + (Math.random() - 0.5) * 0.3;
        p.y += (p.oy - p.y) * 0.005 + (Math.random() - 0.5) * 0.3;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.8;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Gravity well visual
      const grd = ctx.createRadialGradient(mx, my, 0, mx, my, 40);
      grd.addColorStop(0, "rgba(255,255,255,0.15)");
      grd.addColorStop(0.5, "rgba(100,100,255,0.05)");
      grd.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(mx, my, 40, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

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
      <canvas ref={canvasRef} onMouseMove={handleMouseMove} className="w-full h-full cursor-none" />
      <div className="absolute inset-0 flex items-end justify-center pb-6 pointer-events-none">
        <p className="text-white/30 text-xs tracking-widest uppercase">Move mouse — gravity bends space</p>
      </div>
    </div>
  );
}