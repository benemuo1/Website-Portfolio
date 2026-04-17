import { useEffect, useRef, useState } from "react";

export default function AdvancedEffect08() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const pointsRef = useRef([]);
  const phaseRef = useRef(0);
  const circlesRef = useRef([]);

  const computeDFT = (pts) => {
    const N = pts.length;
    return Array.from({ length: Math.min(N, 60) }, (_, k) => {
      let re = 0, im = 0;
      for (let n = 0; n < N; n++) {
        const angle = (2 * Math.PI * k * n) / N;
        re += pts[n].x * Math.cos(angle) + pts[n].y * Math.sin(angle);
        im += -pts[n].x * Math.sin(angle) + pts[n].y * Math.cos(angle);
      }
      return { freq: k, amp: Math.sqrt(re*re + im*im) / N, phase: Math.atan2(im, re) };
    }).sort((a, b) => b.amp - a.amp);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;

    // Default shape: circle
    pointsRef.current = Array.from({ length: 80 }, (_, i) => {
      const a = (i / 80) * Math.PI * 2;
      return { x: Math.cos(a) * 60, y: Math.sin(a) * 60 };
    });
    circlesRef.current = computeDFT(pointsRef.current);

    const trail = [];
    const draw = () => {
      ctx.fillStyle = "rgba(5,5,16,0.3)";
      ctx.fillRect(0, 0, W, H);

      if (circlesRef.current.length === 0) { rafRef.current = requestAnimationFrame(draw); return; }

      phaseRef.current += (2 * Math.PI) / 300;
      let x = W / 2, y = H / 2;

      circlesRef.current.slice(0, 30).forEach((c, i) => {
        const px = x, py = y;
        const angle = c.freq * phaseRef.current + c.phase;
        x += c.amp * Math.cos(angle);
        y += c.amp * Math.sin(angle);

        ctx.beginPath();
        ctx.arc(px, py, c.amp, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(99,102,241,${0.15 - i * 0.004})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `rgba(167,139,250,${0.6 - i * 0.015})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      trail.push({ x, y });
      if (trail.length > 300) trail.shift();

      ctx.beginPath();
      trail.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
      ctx.strokeStyle = "#ec4899";
      ctx.lineWidth = 2;
      ctx.stroke();

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
      <p className="absolute bottom-4 left-0 right-0 text-center text-white/20 text-xs tracking-widest uppercase pointer-events-none">Fourier epicycles tracing a path</p>
    </div>
  );
}