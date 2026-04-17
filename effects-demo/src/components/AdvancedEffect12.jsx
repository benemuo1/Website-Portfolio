import { useEffect, useRef } from "react";

function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
function lerp(a, b, t) { return a + t * (b - a); }
function grad(hash, x, y) {
  const h = hash & 3;
  const u = h < 2 ? x : y, v = h < 2 ? y : x;
  return ((h & 1) ? -u : u) + ((h & 2) ? -v : v);
}
const P = Array.from({ length: 256 }, (_, i) => i).sort(() => Math.random() - 0.5);
const perm = [...P, ...P];
function noise(x, y) {
  const X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
  x -= Math.floor(x); y -= Math.floor(y);
  const u = fade(x), v = fade(y);
  const a = perm[X] + Y, b = perm[X+1] + Y;
  return lerp(lerp(grad(perm[a],x,y), grad(perm[b],x-1,y),u), lerp(grad(perm[a+1],x,y-1), grad(perm[b+1],x-1,y-1),u), v);
}

export default function AdvancedEffect12() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;
    let t = 0;

    const draw = () => {
      ctx.fillStyle = "#050510";
      ctx.fillRect(0, 0, W, H);
      t += 0.005;

      const COLS = 60, ROWS = 30;
      const cw = W / COLS, ch = H / ROWS;

      for (let row = 0; row < ROWS; row++) {
        ctx.beginPath();
        for (let col = 0; col <= COLS; col++) {
          const nx = col / COLS * 3, ny = row / ROWS * 2;
          const h = (noise(nx + t, ny + t * 0.5) + 1) / 2;
          const x = col * cw;
          const y = row * ch + h * ch * 3 - ch;
          col === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        const alpha = 0.3 + (row / ROWS) * 0.5;
        const hue = 200 + row * 3;
        ctx.strokeStyle = `hsla(${hue},70%,55%,${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
      <p className="absolute bottom-4 left-0 right-0 text-center text-white/20 text-xs tracking-widest uppercase pointer-events-none">Perlin noise terrain</p>
    </div>
  );
}