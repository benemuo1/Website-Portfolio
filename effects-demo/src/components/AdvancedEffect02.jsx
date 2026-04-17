import { useEffect, useRef, useState } from "react";

const IMG_SRC = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop";

export default function AdvancedEffect02() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const [sorted, setSorted] = useState(false);
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

  const applySort = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    if (!originalRef.current) return;

    if (sorted) {
      ctx.putImageData(originalRef.current, 0, 0);
      setSorted(false);
      return;
    }

    const imageData = ctx.createImageData(W, H);
    const src = originalRef.current.data;
    const dst = imageData.data;

    for (let y = 0; y < H; y++) {
      const row = [];
      for (let x = 0; x < W; x++) {
        const i = (y * W + x) * 4;
        const brightness = (src[i] * 0.299 + src[i+1] * 0.587 + src[i+2] * 0.114);
        row.push({ r: src[i], g: src[i+1], b: src[i+2], a: src[i+3], brightness });
      }
      row.sort((a, b) => a.brightness - b.brightness);
      row.forEach((p, x) => {
        const i = (y * W + x) * 4;
        dst[i] = p.r; dst[i+1] = p.g; dst[i+2] = p.b; dst[i+3] = p.a;
      });
    }
    ctx.putImageData(imageData, 0, 0);
    setSorted(true);
  };

  return (
    <div className="relative w-full h-full cursor-pointer" onClick={applySort}>
      <canvas ref={canvasRef} className="w-full h-full" />
      <p className="absolute bottom-4 left-0 right-0 text-center text-white/30 text-xs tracking-widest uppercase pointer-events-none">
        Click to {sorted ? "restore" : "pixel sort"}
      </p>
    </div>
  );
}