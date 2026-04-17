import { useEffect, useRef } from "react";

export default function NewEffect01() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;

    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2 + 1,
    }));

    const draw = () => {
      ctx.fillStyle = "rgba(5,5,20,0.2)";
      ctx.fillRect(0, 0, W, H);

      const mx = mouseRef.current.x, my = mouseRef.current.y;

      stars.forEach(s => {
        s.x += s.vx; s.y += s.vy;
        if (s.x < 0) s.x = W; if (s.x > W) s.x = 0;
        if (s.y < 0) s.y = H; if (s.y > H) s.y = 0;
      });

      // Connect nearby stars
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x, dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(180,160,255,${(1 - dist/100) * 0.4})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
        // Connect to mouse
        const mdx = stars[i].x - mx, mdy = stars[i].y - my;
        const mdist = Math.sqrt(mdx*mdx + mdy*mdy);
        if (mdist < 150) {
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = `rgba(139,92,246,${(1 - mdist/150) * 0.6})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(220,210,255,0.9)";
        ctx.shadowColor = "#a78bfa";
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0;
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
      <p className="absolute bottom-4 left-0 right-0 text-center text-white/20 text-xs tracking-widest uppercase pointer-events-none">Move mouse to connect stars</p>
    </div>
  );
}