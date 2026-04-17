import { useEffect, useRef, useState } from "react";

export default function AdvancedEffect11() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const gridRef = useRef(null);
  const [running, setRunning] = useState(true);
  const runningRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;
    const CELL = 6;
    const COLS = Math.floor(W / CELL), ROWS = Math.floor(H / CELL);

    const make = () => new Uint8Array(COLS * ROWS).map(() => Math.random() > 0.7 ? 1 : 0);
    gridRef.current = make();

    const idx = (x, y) => ((y + ROWS) % ROWS) * COLS + ((x + COLS) % COLS);
    let gen = 0;

    const step = () => {
      const next = new Uint8Array(COLS * ROWS);
      for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) {
        let n = 0;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          n += gridRef.current[idx(x+dx, y+dy)];
        }
        const alive = gridRef.current[idx(x, y)];
        next[idx(x, y)] = alive ? (n === 2 || n === 3 ? 1 : 0) : (n === 3 ? 1 : 0);
      }
      gridRef.current = next;
      gen++;
    };

    let frameCount = 0;
    const draw = () => {
      if (runningRef.current && frameCount % 3 === 0) step();
      frameCount++;

      ctx.fillStyle = "#050510";
      ctx.fillRect(0, 0, W, H);

      for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) {
        if (!gridRef.current[idx(x, y)]) continue;
        const hue = (x / COLS * 120 + y / ROWS * 120 + gen * 0.5) % 360;
        ctx.fillStyle = `hsl(${hue},70%,55%)`;
        ctx.fillRect(x * CELL + 1, y * CELL + 1, CELL - 1, CELL - 1);
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const toggle = () => { runningRef.current = !runningRef.current; setRunning(r => !r); };
  const reset = () => {
    const canvas = canvasRef.current;
    const CELL = 6;
    const COLS = Math.floor(canvas.width / CELL), ROWS = Math.floor(canvas.height / CELL);
    gridRef.current = new Uint8Array(COLS * ROWS).map(() => Math.random() > 0.7 ? 1 : 0);
  };

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
        <button onClick={toggle} className="px-4 py-1 rounded text-xs font-bold uppercase tracking-wider bg-white/10 text-white hover:bg-white/20 transition-colors">
          {running ? "Pause" : "Play"}
        </button>
        <button onClick={reset} className="px-4 py-1 rounded text-xs font-bold uppercase tracking-wider bg-white/10 text-white hover:bg-white/20 transition-colors">
          Reset
        </button>
      </div>
    </div>
  );
}