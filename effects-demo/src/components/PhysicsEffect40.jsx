import { useEffect, useRef } from "react";

export default function PhysicsEffect40() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -999, y: -999, down: false });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const SCALE = 4;
    const W = Math.floor(canvas.offsetWidth / SCALE);
    const H = Math.floor(canvas.offsetHeight / SCALE);
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const grid = new Uint8Array(W * H);
    const colors = new Uint32Array(W * H);
    const idx = (x, y) => y * W + x;

    const draw = () => {
      const mx = Math.floor(mouseRef.current.x / SCALE);
      const my = Math.floor(mouseRef.current.y / SCALE);
      if (mouseRef.current.down && mx > 0 && mx < W && my > 0 && my < H) {
        for (let i = -2; i <= 2; i++) {
          const nx = mx + i + Math.floor(Math.random() * 3 - 1);
          if (nx > 0 && nx < W && grid[idx(nx, my)] === 0) {
            grid[idx(nx, my)] = 1;
            colors[idx(nx, my)] = (Math.floor(Math.random() * 40 + 180)) | ((Math.floor(Math.random() * 30 + 120)) << 8) | (50 << 16);
          }
        }
      }

      for (let y = H - 2; y >= 0; y--) {
        for (let x = 0; x < W; x++) {
          if (grid[idx(x, y)] === 0) continue;
          if (grid[idx(x, y + 1)] === 0) { grid[idx(x, y + 1)] = 1; colors[idx(x, y + 1)] = colors[idx(x, y)]; grid[idx(x, y)] = 0; }
          else {
            const dir = Math.random() > 0.5 ? 1 : -1;
            if (x + dir >= 0 && x + dir < W && grid[idx(x + dir, y + 1)] === 0) {
              grid[idx(x + dir, y + 1)] = 1; colors[idx(x + dir, y + 1)] = colors[idx(x, y)]; grid[idx(x, y)] = 0;
            }
          }
        }
      }

      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      ctx.fillStyle = "#050510";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          if (grid[idx(x, y)] === 0) continue;
          const c = colors[idx(x, y)];
          const r = c & 0xff, g = (c >> 8) & 0xff, b = (c >> 16) & 0xff;
          for (let dy = 0; dy < SCALE; dy++) {
            for (let dx = 0; dx < SCALE; dx++) {
              const pi = ((y * SCALE + dy) * canvas.width + (x * SCALE + dx)) * 4;
              data[pi] = r; data[pi+1] = g; data[pi+2] = b; data[pi+3] = 255;
            }
          }
        }
      }
      ctx.putImageData(imageData, 0, 0);
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const r = (e) => { const rect = canvasRef.current.getBoundingClientRect(); return { x: e.clientX - rect.left, y: e.clientY - rect.top }; };

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef}
        onMouseMove={(e) => { const p = r(e); mouseRef.current.x = p.x; mouseRef.current.y = p.y; }}
        onMouseDown={(e) => { const p = r(e); mouseRef.current = { ...p, down: true }; }}
        onMouseUp={() => mouseRef.current.down = false}
        onMouseLeave={() => mouseRef.current.down = false}
        className="w-full h-full cursor-crosshair" />
      <p className="absolute bottom-4 left-0 right-0 text-center text-white/20 text-xs tracking-widest uppercase pointer-events-none">Click and drag to pour sand</p>
    </div>
  );
}