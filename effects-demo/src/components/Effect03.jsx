import { useEffect, useRef, useState } from "react";

export default function Effect03() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 200, y: 150 });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const W = canvas.width = canvas.offsetWidth;
    const H = canvas.height = canvas.offsetHeight;

    const poles = [{ x: W * 0.3, y: H * 0.5, charge: 1 }, { x: W * 0.7, y: H * 0.5, charge: -1 }];

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#050510";
      ctx.fillRect(0, 0, W, H);

      const mx = mouseRef.current.x, my = mouseRef.current.y;
      const allPoles = [...poles, { x: mx, y: my, charge: 0.4 }];

      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 12) {
        for (const startPole of allPoles.filter(p => p.charge > 0)) {
          let x = startPole.x + Math.cos(angle) * 8;
          let y = startPole.y + Math.sin(angle) * 8;
          ctx.beginPath();
          ctx.moveTo(x, y);
          for (let step = 0; step < 120; step++) {
            let fx = 0, fy = 0;
            for (const pole of allPoles) {
              const dx = x - pole.x, dy = y - pole.y;
              const dist = Math.sqrt(dx * dx + dy * dy) + 1;
              const force = pole.charge / (dist * dist);
              fx -= force * dx / dist;
              fy -= force * dy / dist;
            }
            const mag = Math.sqrt(fx * fx + fy * fy) + 0.001;
            x += (fx / mag) * 3;
            y += (fy / mag) * 3;
            ctx.lineTo(x, y);
            if (x < 0 || x > W || y < 0 || y > H) break;
          }
          const grad = ctx.createLinearGradient(startPole.x, startPole.y, x, y);
          grad.addColorStop(0, "rgba(139,92,246,0.8)");
          grad.addColorStop(0.5, "rgba(59,130,246,0.5)");
          grad.addColorStop(1, "rgba(16,185,129,0.1)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      allPoles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = p.charge > 0 ? "rgba(239,68,68,0.9)" : p.charge < 0 ? "rgba(59,130,246,0.9)" : "rgba(255,255,255,0.6)";
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

  return <canvas ref={canvasRef} onMouseMove={handleMouseMove} className="w-full h-full cursor-crosshair" />;
}