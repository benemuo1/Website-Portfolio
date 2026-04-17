import { useEffect, useRef, useState } from "react";

export default function NewEffect02() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const wavesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;

    // Auto-spawn waves
    const autoSpawn = setInterval(() => {
      wavesRef.current.push({ x: W/2, y: H/2, r: 0, maxR: Math.max(W,H) * 0.6, hue: Math.random() * 360 });
    }, 1200);

    const draw = () => {
      ctx.fillStyle = "rgba(5,5,20,0.25)";
      ctx.fillRect(0, 0, W, H);

      wavesRef.current = wavesRef.current.filter(w => w.r < w.maxR);
      wavesRef.current.forEach(w => {
        w.r += 4;
        const alpha = (1 - w.r / w.maxR) * 0.8;
        for (let ring = 0; ring < 3; ring++) {
          const r = w.r - ring * 15;
          if (r < 0) continue;
          ctx.beginPath();
          ctx.arc(w.x, w.y, r, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(${w.hue},80%,65%,${alpha * (1 - ring * 0.3)})`;
          ctx.lineWidth = 2 - ring * 0.5;
          ctx.stroke();
        }
        // Inner glow
        const grd = ctx.createRadialGradient(w.x, w.y, Math.max(0, w.r-20), w.x, w.y, w.r);
        grd.addColorStop(0, `hsla(${w.hue},80%,65%,0)`);
        grd.addColorStop(0.5, `hsla(${w.hue},80%,65%,${alpha * 0.1})`);
        grd.addColorStop(1, `hsla(${w.hue},80%,65%,0)`);
        ctx.beginPath();
        ctx.arc(w.x, w.y, w.r, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(rafRef.current); clearInterval(autoSpawn); };
  }, []);

  const handleClick = (e) => {
    const r = canvasRef.current.getBoundingClientRect();
    wavesRef.current.push({ x: e.clientX - r.left, y: e.clientY - r.top, r: 0, maxR: 300, hue: Math.random() * 360 });
  };

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} onClick={handleClick} className="w-full h-full cursor-pointer" />
      <p className="absolute bottom-4 left-0 right-0 text-center text-white/20 text-xs tracking-widest uppercase pointer-events-none">Click to spawn shockwave</p>
    </div>
  );
}