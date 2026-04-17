import { useEffect, useRef } from "react";

export default function NewEffect08() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;

    const bubbles = Array.from({ length: 18 }, (_, i) => ({
      x: Math.random() * W, y: H + Math.random() * 200,
      r: Math.random() * 30 + 10,
      vx: (Math.random()-0.5)*0.5, vy: -(Math.random()*0.8+0.3),
      hue: Math.random()*360, wobble: Math.random()*Math.PI*2,
    }));

    let t = 0;
    const draw = () => {
      ctx.fillStyle = "rgba(5,10,30,0.2)";
      ctx.fillRect(0, 0, W, H);
      t += 0.02;

      bubbles.forEach(b => {
        b.x += b.vx + Math.sin(t + b.wobble) * 0.3;
        b.y += b.vy;
        b.wobble += 0.02;
        if (b.y + b.r < 0) {
          b.y = H + b.r;
          b.x = Math.random() * W;
        }

        // Bubble body
        const grd = ctx.createRadialGradient(b.x - b.r*0.3, b.y - b.r*0.3, 0, b.x, b.y, b.r);
        grd.addColorStop(0, `hsla(${b.hue},60%,90%,0.15)`);
        grd.addColorStop(0.5, `hsla(${b.hue},70%,70%,0.08)`);
        grd.addColorStop(1, `hsla(${b.hue},80%,60%,0.25)`);
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI*2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Rim
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI*2);
        ctx.strokeStyle = `hsla(${b.hue},70%,80%,0.4)`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Specular highlight
        ctx.beginPath();
        ctx.arc(b.x - b.r*0.3, b.y - b.r*0.35, b.r*0.2, 0, Math.PI*2);
        ctx.fillStyle = "rgba(255,255,255,0.4)";
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
      <p className="absolute bottom-4 left-0 right-0 text-center text-white/20 text-xs tracking-widest uppercase pointer-events-none">Floating soap bubbles</p>
    </div>
  );
}