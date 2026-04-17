import { useEffect, useRef, useState } from "react";

export default function Effect07() {
  const canvasRef = useRef(null);
  const ripplesRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;

    const BLOBS = [
      { x: W * 0.3, y: H * 0.4, r: 80, color: "99,102,241" },
      { x: W * 0.7, y: H * 0.5, r: 70, color: "236,72,153" },
      { x: W * 0.5, y: H * 0.25, r: 60, color: "16,185,129" },
    ];

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#050510";
      ctx.fillRect(0, 0, W, H);

      BLOBS.forEach(blob => {
        const grd = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.r);
        grd.addColorStop(0, `rgba(${blob.color},0.8)`);
        grd.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.r, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      });

      ripplesRef.current = ripplesRef.current.filter(r => r.age < r.maxAge);
      ripplesRef.current.forEach(ripple => {
        ripple.age++;
        const progress = ripple.age / ripple.maxAge;
        const radius = progress * 200;
        const opacity = (1 - progress) * 0.7;
        for (let ring = 0; ring < 3; ring++) {
          const r2 = radius - ring * 20;
          if (r2 < 0) continue;
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, r2, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(150,200,255,${opacity * (1 - ring * 0.3)})`;
          ctx.lineWidth = 2 - ring * 0.5;
          ctx.stroke();
        }
      });

      t++;
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleClick = (e) => {
    const r = canvasRef.current.getBoundingClientRect();
    ripplesRef.current.push({ x: e.clientX - r.left, y: e.clientY - r.top, age: 0, maxAge: 60 });
  };

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} onClick={handleClick} className="w-full h-full cursor-pointer" />
      <div className="absolute inset-0 flex items-end justify-center pb-6 pointer-events-none">
        <p className="text-white/30 text-xs tracking-widest uppercase">Click anywhere to create ripples</p>
      </div>
    </div>
  );
}