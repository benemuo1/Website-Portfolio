import { useEffect, useRef } from "react";

export default function GenEffect44() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const SCALE = 3;
    const W = Math.floor(canvas.offsetWidth / SCALE);
    const H = Math.floor(canvas.offsetHeight / SCALE);
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const offscreen = document.createElement("canvas");
    offscreen.width = W; offscreen.height = H;
    const octx = offscreen.getContext("2d");

    let zoom = 1, t = 0;
    const cx = -0.5, cy = 0;

    const draw = () => {
      t += 0.008;
      zoom *= 1.01;
      if (zoom > 400) zoom = 1;

      const imageData = octx.createImageData(W, H);
      const data = imageData.data;
      const MAX_ITER = 40;

      for (let py = 0; py < H; py++) {
        for (let px = 0; px < W; px++) {
          const x0 = (px - W / 2) / (W * 0.25 * zoom) + cx;
          const y0 = (py - H / 2) / (H * 0.25 * zoom) + cy;
          let x = 0, y = 0, iter = 0;
          while (x*x + y*y <= 4 && iter < MAX_ITER) {
            const xt = x*x - y*y + x0; y = 2*x*y + y0; x = xt; iter++;
          }
          const hue = iter === MAX_ITER ? 0 : (iter / MAX_ITER * 360 + t * 40) % 360;
          const l = iter === MAX_ITER ? 0 : 0.5;
          const [r, g, b] = hslToRgb(hue / 360, 0.8, l);
          const pi = (py * W + px) * 4;
          data[pi] = r; data[pi+1] = g; data[pi+2] = b; data[pi+3] = 255;
        }
      }
      octx.putImageData(imageData, 0, 0);
      ctx.drawImage(offscreen, 0, 0, canvas.width, canvas.height);
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}

function hslToRgb(h, s, l) {
  const q = l < 0.5 ? l*(1+s) : l+s-l*s, p = 2*l-q;
  return [hue2rgb(p,q,h+1/3), hue2rgb(p,q,h), hue2rgb(p,q,h-1/3)].map(v => Math.round(v*255));
}
function hue2rgb(p,q,t) {
  if(t<0)t+=1; if(t>1)t-=1;
  if(t<1/6)return p+(q-p)*6*t; if(t<1/2)return q; if(t<2/3)return p+(q-p)*(2/3-t)*6; return p;
}