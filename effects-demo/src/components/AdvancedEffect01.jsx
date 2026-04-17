import { useEffect, useRef } from "react";

export default function AdvancedEffect01() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, px: 0, py: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const N = 60; // smaller grid = much faster
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;
    const cellW = W / N, cellH = H / N;

    let vx = new Float32Array(N * N), vy = new Float32Array(N * N);
    let vx0 = new Float32Array(N * N), vy0 = new Float32Array(N * N);
    let dens = new Float32Array(N * N), dens0 = new Float32Array(N * N);

    const idx = (x, y) => Math.max(0, Math.min(N-1, y)) * N + Math.max(0, Math.min(N-1, x));

    const diffuse = (x, x0, diff) => {
      const a = diff * 0.016 * N * N;
      for (let k = 0; k < 3; k++)
        for (let j = 1; j < N-1; j++) for (let i = 1; i < N-1; i++)
          x[idx(i,j)] = (x0[idx(i,j)] + a*(x[idx(i-1,j)]+x[idx(i+1,j)]+x[idx(i,j-1)]+x[idx(i,j+1)])) / (1+4*a);
    };

    const advect = (d, d0, u, v) => {
      const dt0 = 0.016 * N;
      for (let j = 1; j < N-1; j++) for (let i = 1; i < N-1; i++) {
        let x = Math.max(0.5, Math.min(N-1.5, i - dt0*u[idx(i,j)]));
        let y = Math.max(0.5, Math.min(N-1.5, j - dt0*v[idx(i,j)]));
        const i0=Math.floor(x),i1=i0+1,j0=Math.floor(y),j1=j0+1;
        const s1=x-i0,s0=1-s1,t1=y-j0,t0=1-t1;
        d[idx(i,j)] = s0*(t0*d0[idx(i0,j0)]+t1*d0[idx(i0,j1)])+s1*(t0*d0[idx(i1,j0)]+t1*d0[idx(i1,j1)]);
      }
    };

    const project = (u, v, p, div) => {
      for (let j=1;j<N-1;j++) for (let i=1;i<N-1;i++) {
        div[idx(i,j)] = -0.5*(u[idx(i+1,j)]-u[idx(i-1,j)]+v[idx(i,j+1)]-v[idx(i,j-1)])/N;
        p[idx(i,j)] = 0;
      }
      for (let k=0;k<3;k++) for (let j=1;j<N-1;j++) for (let i=1;i<N-1;i++)
        p[idx(i,j)] = (div[idx(i,j)]+p[idx(i-1,j)]+p[idx(i+1,j)]+p[idx(i,j-1)]+p[idx(i,j+1)])/4;
      for (let j=1;j<N-1;j++) for (let i=1;i<N-1;i++) {
        u[idx(i,j)] -= 0.5*N*(p[idx(i+1,j)]-p[idx(i-1,j)]);
        v[idx(i,j)] -= 0.5*N*(p[idx(i,j+1)]-p[idx(i,j-1)]);
      }
    };

    let t = 0;
    const draw = () => {
      const mx = Math.floor(mouseRef.current.x / cellW);
      const my = Math.floor(mouseRef.current.y / cellH);
      const dx = mouseRef.current.x - mouseRef.current.px;
      const dy = mouseRef.current.y - mouseRef.current.py;
      if (mx > 0 && mx < N && my > 0 && my < N) {
        dens0[idx(mx,my)] += 60;
        vx0[idx(mx,my)] += dx * 3;
        vy0[idx(mx,my)] += dy * 3;
      }
      mouseRef.current.px = mouseRef.current.x;
      mouseRef.current.py = mouseRef.current.y;

      t++;
      if (t % 25 === 0) {
        const ax = 1 + Math.floor(Math.random() * (N-2));
        const ay = 1 + Math.floor(Math.random() * (N-2));
        dens0[idx(ax,ay)] += 30;
        vx0[idx(ax,ay)] += (Math.random()-0.5)*4;
        vy0[idx(ax,ay)] += (Math.random()-0.5)*4;
      }

      diffuse(vx0, vx, 0.0001); diffuse(vy0, vy, 0.0001);
      const p = new Float32Array(N*N), div = new Float32Array(N*N);
      project(vx0, vy0, p, div);
      advect(vx, vx0, vx0, vy0); advect(vy, vy0, vx0, vy0);
      project(vx, vy, p, div);
      diffuse(dens0, dens, 0.0001);
      advect(dens, dens0, vx, vy);
      [vx,vx0]=[vx0,vx]; [vy,vy0]=[vy0,vy]; [dens,dens0]=[dens0,dens];
      for (let i=0;i<N*N;i++) { dens[i]*=0.99; vx[i]*=0.99; vy[i]*=0.99; }

      const imageData = ctx.createImageData(W, H);
      const data = imageData.data;
      for (let j=0;j<N;j++) for (let i=0;i<N;i++) {
        const d = Math.min(1, dens[idx(i,j)] / 50);
        const vlen = Math.min(1, Math.sqrt(vx[idx(i,j)]**2+vy[idx(i,j)]**2)*5);
        const r = Math.round(d*80+vlen*180), g = Math.round(d*40+vlen*100), b = Math.round(d*200+vlen*255);
        const cw2 = Math.ceil(cellW), ch2 = Math.ceil(cellH);
        for (let dy=0;dy<ch2;dy++) for (let dx=0;dx<cw2;dx++) {
          const pi = ((j*cellH+dy|0)*W+(i*cellW+dx|0))*4;
          if (pi >= 0 && pi < data.length-3) { data[pi]=r; data[pi+1]=g; data[pi+2]=b; data[pi+3]=255; }
        }
      }
      ctx.putImageData(imageData, 0, 0);
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleMouseMove = (e) => {
    const r = canvasRef.current.getBoundingClientRect();
    mouseRef.current.x = e.clientX - r.left;
    mouseRef.current.y = e.clientY - r.top;
  };

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} onMouseMove={handleMouseMove} className="w-full h-full cursor-crosshair" />
      <p className="absolute bottom-4 left-0 right-0 text-center text-white/30 text-xs tracking-widest uppercase pointer-events-none">Move mouse to inject fluid</p>
    </div>
  );
}