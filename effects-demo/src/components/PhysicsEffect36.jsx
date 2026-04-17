import { useEffect, useRef } from "react";

export default function PhysicsEffect36() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;

    const blobs = Array.from({ length: 5 }, (_, i) => ({
      x: W * 0.2 + i * W * 0.15, y: H / 2,
      vx: (Math.random() - 0.5) * 1.5, vy: (Math.random() - 0.5) * 1.5,
      r: 35 + Math.random() * 20,
      color: `hsl(${i * 60 + 200},80%,60%)`,
    }));

    const offscreen = document.createElement("canvas");
    offscreen.width = W; offscreen.height = H;
    const octx = offscreen.getContext("2d");

    const draw = () => {
      ctx.fillStyle = "#050510";
      ctx.fillRect(0, 0, W, H);

      blobs.forEach(b => {
        b.x += b.vx; b.y += b.vy;
        if (b.x < b.r || b.x > W - b.r) b.vx *= -1;
        if (b.y < b.r || b.y > H - b.r) b.vy *= -1;
      });

      // Draw metaballs using threshold on alpha
      octx.clearRect(0, 0, W, H);
      blobs.forEach(b => {
        const grd = octx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r * 1.5);
        grd.addColorStop(0, "rgba(255,255,255,1)");
        grd.addColorStop(1, "rgba(255,255,255,0)");
        octx.globalCompositeOperation = "source-over";
        octx.beginPath();
        octx.arc(b.x, b.y, b.r * 1.5, 0, Math.PI * 2);
        octx.fillStyle = grd;
        octx.fill();
      });

      blobs.forEach(b => {
        const grd = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        grd.addColorStop(0, b.color.replace("60%","80%"));
        grd.addColorStop(1, b.color + "00");
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.filter = "blur(12px)";
        ctx.fill();
        ctx.filter = "none";
      });

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}