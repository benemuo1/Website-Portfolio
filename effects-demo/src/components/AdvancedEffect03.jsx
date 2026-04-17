import { useEffect, useRef, useState } from "react";

const IMG_SRC = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop";

export default function AdvancedEffect03() {
  const canvasRef = useRef(null);
  const [mode, setMode] = useState("original");
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

  useEffect(() => {
    if (!originalRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    const src = originalRef.current.data;

    if (mode === "original") { ctx.putImageData(originalRef.current, 0, 0); return; }

    const out = ctx.createImageData(W, H);
    const d = out.data;
    const gray = new Float32Array(W * H);
    for (let i = 0; i < W * H; i++) gray[i] = src[i*4]*0.299 + src[i*4+1]*0.587 + src[i*4+2]*0.114;

    for (let y = 1; y < H-1; y++) for (let x = 1; x < W-1; x++) {
      const gx = -gray[(y-1)*W+(x-1)] + gray[(y-1)*W+(x+1)] - 2*gray[y*W+(x-1)] + 2*gray[y*W+(x+1)] - gray[(y+1)*W+(x-1)] + gray[(y+1)*W+(x+1)];
      const gy = -gray[(y-1)*W+(x-1)] - 2*gray[(y-1)*W+x] - gray[(y-1)*W+(x+1)] + gray[(y+1)*W+(x-1)] + 2*gray[(y+1)*W+x] + gray[(y+1)*W+(x+1)];
      const mag = Math.min(255, Math.sqrt(gx*gx + gy*gy));
      const i = (y*W+x)*4;
      if (mode === "edge") { d[i] = mag; d[i+1] = mag; d[i+2] = mag; d[i+3] = 255; }
      else { d[i] = mag * 0.2; d[i+1] = mag * 0.8; d[i+2] = mag; d[i+3] = 255; }
    }
    ctx.putImageData(out, 0, 0);
  }, [mode]);

  const modes = ["original", "edge", "neon"];
  return (
    <div className="relative w-full h-full bg-[#050510]">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 pointer-events-auto">
        {modes.map(m => (
          <button key={m} onClick={() => setMode(m)}
            className="px-3 py-1 rounded text-xs font-bold uppercase tracking-wider transition-colors"
            style={{ background: mode === m ? "#6366f1" : "rgba(255,255,255,0.1)", color: "white" }}>
            {m}
          </button>
        ))}
      </div>
    </div>
  );
}