import { useEffect, useRef } from "react";

export default function GenEffect43() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const SCALE = 5;
    const W = Math.floor(canvas.offsetWidth / SCALE);
    const H = Math.floor(canvas.offsetHeight / SCALE);
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let A = new Float32Array(W * H).fill(1);
    let B = new Float32Array(W * H).fill(0);
    const nA = new Float32Array(W * H);
    const nB = new Float32Array(W * H);

    for (let i = 0; i < 5; i++) {
      const sx = Math.floor(Math.random() * W), sy = Math.floor(Math.random() * H);
      for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) {
        const nx = sx + dx, ny = sy + dy;
        if (nx >= 0 && nx < W && ny >= 0 && ny < H) B[ny * W + nx] = 1;
      }
    }

    const DA = 1.0, DB = 0.5, f = 0.055, k = 0.062;
    const idx = (x, y) => ((y + H) % H) * W + ((x + W) % W);

    const draw = () => {
      // Only 4 iterations per frame to keep it smooth
      for (let iter = 0; iter < 4; iter++) {
        for (let y = 0; y < H; y++) {
          for (let x = 0; x < W; x++) {
            const i = y * W + x;
            const lap_A = A[idx(x-1,y)] + A[idx(x+1,y)] + A[idx(x,y-1)] + A[idx(x,y+1)] - 4 * A[i];
            const lap_B = B[idx(x-1,y)] + B[idx(x+1,y)] + B[idx(x,y-1)] + B[idx(x,y+1)] - 4 * B[i];
            const reaction = A[i] * B[i] * B[i];
            nA[i] = Math.max(0, Math.min(1, A[i] + DA * lap_A - reaction + f * (1 - A[i])));
            nB[i] = Math.max(0, Math.min(1, B[i] + DB * lap_B + reaction - (k + f) * B[i]));
          }
        }
        A.set(nA); B.set(nB);
      }

      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const v = Math.max(0, Math.min(1, A[y * W + x] - B[y * W + x]));
          const r = Math.round(v * 20), g = Math.round(v * 80 + (1-v) * 180), b = Math.round(v * 40 + (1-v) * 255);
          for (let dy = 0; dy < SCALE; dy++) for (let dx = 0; dx < SCALE; dx++) {
            const pi = ((y * SCALE + dy) * canvas.width + (x * SCALE + dx)) * 4;
            data[pi] = r; data[pi+1] = g; data[pi+2] = b; data[pi+3] = 255;
          }
        }
      }
      ctx.putImageData(imageData, 0, 0);
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}