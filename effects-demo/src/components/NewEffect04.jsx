import { useEffect, useRef } from "react";

export default function NewEffect04() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;
    const FONT_SIZE = 14;
    const COLS = Math.floor(W / FONT_SIZE);
    const drops = Array.from({ length: COLS }, () => Math.random() * -50);
    const CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF";

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, W, H);
      ctx.font = `${FONT_SIZE}px monospace`;

      drops.forEach((y, i) => {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * FONT_SIZE;
        // Head is bright white/cyan
        ctx.fillStyle = y * FONT_SIZE < H * 0.1 ? "#ffffff" : `hsl(${120 + Math.random() * 40},100%,${40 + Math.random() * 30}%)`;
        ctx.fillText(char, x, y * FONT_SIZE);
        drops[i] = y > H / FONT_SIZE && Math.random() > 0.975 ? 0 : y + 1;
      });

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full bg-black" />;
}