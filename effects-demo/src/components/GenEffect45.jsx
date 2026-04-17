import { useEffect, useRef } from "react";

export default function GenEffect45() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;
    const SIZE = 30;
    const COLS = Math.ceil(W / SIZE), ROWS = Math.ceil(H / SIZE);

    let tiles = Array.from({ length: COLS * ROWS }, () => Math.random() > 0.5 ? 0 : 1);
    let t = 0;

    const draw = () => {
      ctx.fillStyle = "#050510";
      ctx.fillRect(0, 0, W, H);

      if (t % 60 === 0) tiles = tiles.map(() => Math.random() > 0.5 ? 0 : 1);

      tiles.forEach((type, i) => {
        const col = i % COLS, row = Math.floor(i / COLS);
        const x = col * SIZE, y = row * SIZE;
        const hue = (col * 10 + row * 15 + t * 0.3) % 360;

        ctx.strokeStyle = `hsl(${hue},70%,55%)`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        if (type === 0) {
          ctx.arc(x, y, SIZE, 0, Math.PI / 2);
          ctx.arc(x + SIZE, y + SIZE, SIZE, Math.PI, Math.PI * 1.5);
        } else {
          ctx.arc(x + SIZE, y, SIZE, Math.PI / 2, Math.PI);
          ctx.arc(x, y + SIZE, SIZE, Math.PI * 1.5, Math.PI * 2);
        }
        ctx.stroke();
      });

      t++;
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}