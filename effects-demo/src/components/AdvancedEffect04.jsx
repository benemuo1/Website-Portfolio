import { useEffect, useRef, useState } from "react";

const IMG_SRC = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop";

export default function AdvancedEffect04() {
  const canvasRef = useRef(null);
  const [halftone, setHalftone] = useState(false);
  const originalRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = IMG_SRC;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, W, H);
      originalRef.current = ctx.getImageData(0, 0, W, H);
    };
  }, []);

  const toggle = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    if (!originalRef.current) return;

    if (halftone) { ctx.putImageData(originalRef.current, 0, 0); setHalftone(false); return; }

    ctx.fillStyle = "#050510";
    ctx.fillRect(0, 0, W, H);
    const src = originalRef.current.data;
    const GRID = 8;

    for (let y = 0; y < H; y += GRID) {
      for (let x = 0; x < W; x += GRID) {
        const i = (y * W + x) * 4;
        const brightness = (src[i]*0.299 + src[i+1]*0.587 + src[i+2]*0.114) / 255;
        const r = (brightness * GRID * 0.6);
        const hue = (x / W) * 60 + (y / H) * 30;
        ctx.beginPath();
        ctx.arc(x + GRID/2, y + GRID/2, r, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${hue + 180},70%,${40 + brightness * 40}%)`;
        ctx.fill();
      }
    }
    setHalftone(true);
  };

  return (
    <div className="relative w-full h-full cursor-pointer" onClick={toggle}>
      <canvas ref={canvasRef} className="w-full h-full" />
      <p className="absolute bottom-4 left-0 right-0 text-center text-white/30 text-xs tracking-widest uppercase pointer-events-none">
        Click to {halftone ? "restore" : "halftone"}
      </p>
    </div>
  );
}