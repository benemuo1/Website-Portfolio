import { useEffect, useRef } from "react";

function lightning(ctx, x1, y1, x2, y2, roughness, depth, hue) {
  if (depth === 0) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = `hsla(${hue},90%,${70 + depth*5}%,${0.6 + depth*0.1})`;
    ctx.lineWidth = depth * 0.5 + 0.5;
    ctx.stroke();
    return;
  }
  const mx = (x1+x2)/2 + (Math.random()-0.5)*roughness;
  const my = (y1+y2)/2 + (Math.random()-0.5)*roughness;
  lightning(ctx, x1, y1, mx, my, roughness/2, depth-1, hue);
  lightning(ctx, mx, my, x2, y2, roughness/2, depth-1, hue);
  if (Math.random() < 0.3) {
    const bx = mx + (Math.random()-0.5)*roughness*2;
    const by = my + roughness*2;
    lightning(ctx, mx, my, bx, by, roughness/3, depth-2, hue+20);
  }
}

export default function NewEffect06() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: 200, y: 50 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;
    let t = 0;

    const draw = () => {
      ctx.fillStyle = "rgba(5,5,20,0.4)";
      ctx.fillRect(0, 0, W, H);
      t++;

      if (t % 3 === 0) {
        const mx = mouseRef.current.x, my = mouseRef.current.y;
        ctx.shadowColor = "#60a5fa";
        ctx.shadowBlur = 15;
        // Main bolt from mouse to random ground point
        const gx = mx + (Math.random()-0.5)*100;
        lightning(ctx, mx, my, gx, H-10, 80, 6, 200 + Math.random()*40);
        // Secondary bolts
        for (let i = 0; i < 2; i++) {
          const sx = Math.random()*W, sy = 0;
          lightning(ctx, sx, sy, sx+(Math.random()-0.5)*60, H*0.6, 60, 5, 220+Math.random()*30);
        }
        ctx.shadowBlur = 0;
      }

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
      <p className="absolute bottom-4 left-0 right-0 text-center text-white/20 text-xs tracking-widest uppercase pointer-events-none">Move mouse to aim lightning</p>
    </div>
  );
}