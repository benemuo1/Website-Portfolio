import { useEffect, useRef } from "react";

export default function GenEffect41() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;

    const SITES = Array.from({ length: 18 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.6,
      hue: Math.random() * 360,
    }));

    // Use a downscaled offscreen canvas for the voronoi calculation
    const SCALE = 4;
    const SW = Math.floor(W / SCALE), SH = Math.floor(H / SCALE);
    const offscreen = document.createElement("canvas");
    offscreen.width = SW; offscreen.height = SH;
    const octx = offscreen.getContext("2d");

    let t = 0;
    const draw = () => {
      SITES.forEach(s => {
        s.x += s.vx; s.y += s.vy;
        if (s.x < 0 || s.x > W) s.vx *= -1;
        if (s.y < 0 || s.y > H) s.vy *= -1;
        s.hue = (s.hue + 0.2) % 360;
      });

      const imageData = octx.createImageData(SW, SH);
      const data = imageData.data;

      for (let y = 0; y < SH; y++) {
        for (let x = 0; x < SW; x++) {
          const wx = x * SCALE, wy = y * SCALE;
          let minDist = Infinity, closest = 0, secondDist = Infinity;
          SITES.forEach((s, i) => {
            const d = (wx - s.x) ** 2 + (wy - s.y) ** 2;
            if (d < minDist) { secondDist = minDist; minDist = d; closest = i; }
            else if (d < secondDist) secondDist = d;
          });
          const edge = Math.sqrt(secondDist) - Math.sqrt(minDist);
          const s = SITES[closest];
          const brightness = edge < 8 ? 0.15 : 0.35 + Math.sqrt(minDist) / (W * 0.6);
          const [r, g, b] = hslToRgb(s.hue / 360, 0.65, Math.min(0.7, brightness));
          const pi = (y * SW + x) * 4;
          data[pi] = r; data[pi + 1] = g; data[pi + 2] = b; data[pi + 3] = 255;
        }
      }
      octx.putImageData(imageData, 0, 0);
      ctx.drawImage(offscreen, 0, 0, W, H);

      SITES.forEach(s => {
        ctx.beginPath(); ctx.arc(s.x, s.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.fill();
      });

      t++;
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}

function hslToRgb(h, s, l) {
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
  return [hue2rgb(p,q,h+1/3), hue2rgb(p,q,h), hue2rgb(p,q,h-1/3)].map(v => Math.round(v * 255));
}
function hue2rgb(p, q, t) {
  if (t < 0) t += 1; if (t > 1) t -= 1;
  if (t < 1/6) return p + (q-p)*6*t; if (t < 1/2) return q;
  if (t < 2/3) return p + (q-p)*(2/3-t)*6; return p;
}