import { useEffect, useRef, useState } from "react";

const IMG_SRC = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop";

export default function ImageEffect58() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const [scattered, setScattered] = useState(false);
  const pixelsRef = useRef([]);

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
      const offscreen = document.createElement("canvas");
      const SCALE = 4;
      offscreen.width = W / SCALE; offscreen.height = H / SCALE;
      const octx = offscreen.getContext("2d");
      octx.drawImage(img, 0, 0, offscreen.width, offscreen.height);
      const data = octx.getImageData(0, 0, offscreen.width, offscreen.height).data;

      pixelsRef.current = [];
      for (let y = 0; y < offscreen.height; y++) {
        for (let x = 0; x < offscreen.width; x++) {
          const i = (y * offscreen.width + x) * 4;
          pixelsRef.current.push({
            tx: x * SCALE, ty: y * SCALE,
            x: Math.random() * W, y: Math.random() * H,
            r: data[i], g: data[i+1], b: data[i+2],
            size: SCALE,
          });
        }
      }

      let t = 0;
      const draw = () => {
        ctx.fillStyle = "#050510";
        ctx.fillRect(0, 0, W, H);
        const gathering = !scattered;
        pixelsRef.current.forEach(p => {
          if (gathering) { p.x += (p.tx - p.x) * 0.08; p.y += (p.ty - p.y) * 0.08; }
          else { p.x += (Math.random() - 0.5) * 3; p.y += (Math.random() - 0.5) * 3; }
          ctx.fillStyle = `rgb(${p.r},${p.g},${p.b})`;
          ctx.fillRect(p.x, p.y, p.size - 1, p.size - 1);
        });
        rafRef.current = requestAnimationFrame(draw);
      };
      draw();
    };
    return () => cancelAnimationFrame(rafRef.current);
  }, [scattered]);

  return (
    <div className="relative w-full h-full cursor-pointer" onClick={() => setScattered(s => !s)}>
      <canvas ref={canvasRef} className="w-full h-full" />
      <p className="absolute bottom-4 left-0 right-0 text-center text-white/30 text-xs tracking-widest uppercase pointer-events-none">
        Click to {scattered ? "reassemble" : "scatter"}
      </p>
    </div>
  );
}