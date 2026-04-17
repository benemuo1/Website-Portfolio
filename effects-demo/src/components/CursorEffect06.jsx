import { useEffect, useRef } from "react";

export default function CursorEffect06() {
  const canvasRef = useRef(null);
  const lastRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;
    ctx.fillStyle = "#050510";
    ctx.fillRect(0, 0, W, H);

    let hue = 0;
    const move = (e) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      if (lastRef.current) {
        const { x: lx, y: ly } = lastRef.current;
        ctx.beginPath();
        ctx.moveTo(lx, ly);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `hsla(${hue},90%,65%,0.6)`;
        ctx.lineWidth = 18;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.shadowColor = `hsl(${hue},90%,65%)`;
        ctx.shadowBlur = 20;
        ctx.stroke();
        ctx.shadowBlur = 0;
        hue = (hue + 1) % 360;
      }
      lastRef.current = { x, y };
    };
    const leave = () => { lastRef.current = null; };

    canvas.addEventListener("mousemove", move);
    canvas.addEventListener("mouseleave", leave);

    // Fade effect
    const fade = setInterval(() => {
      ctx.fillStyle = "rgba(5,5,16,0.02)";
      ctx.fillRect(0, 0, W, H);
    }, 50);

    return () => {
      canvas.removeEventListener("mousemove", move);
      canvas.removeEventListener("mouseleave", leave);
      clearInterval(fade);
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full cursor-none" />
      <p className="absolute bottom-4 left-0 right-0 text-center text-white/20 text-xs tracking-widest uppercase pointer-events-none">Paint with your cursor</p>
    </div>
  );
}