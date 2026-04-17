import { useEffect, useRef } from "react";

export default function Effect11() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;

    const project = (x, y, z, rx, ry, rz) => {
      let [x1, y1, z1] = [x, y, z];
      let [x2, z2] = [x1 * Math.cos(ry) - z1 * Math.sin(ry), x1 * Math.sin(ry) + z1 * Math.cos(ry)];
      let [y3, z3] = [y1 * Math.cos(rx) - z2 * Math.sin(rx), y1 * Math.sin(rx) + z2 * Math.cos(rx)];
      let [x4, y4] = [x2 * Math.cos(rz) - y3 * Math.sin(rz), x2 * Math.sin(rz) + y3 * Math.cos(rz)];
      const fov = 400;
      const scale = fov / (fov + z3 + 200);
      return { sx: cx + x4 * scale, sy: cy + y4 * scale, scale, z: z3 };
    };

    const icosaVerts = (() => {
      const t = (1 + Math.sqrt(5)) / 2, s = 80;
      return [[-1,t,0],[1,t,0],[-1,-t,0],[1,-t,0],[0,-1,t],[0,1,t],[0,-1,-t],[0,1,-t],[t,0,-1],[t,0,1],[-t,0,-1],[-t,0,1]].map(v => v.map(c => c * s / Math.sqrt(1 + t * t)));
    })();
    const icosaEdges = [[0,1],[0,5],[0,7],[0,10],[0,11],[1,5],[1,7],[1,8],[1,9],[2,3],[2,4],[2,6],[2,10],[2,11],[3,4],[3,6],[3,8],[3,9],[4,5],[4,9],[4,11],[5,9],[5,11],[6,7],[6,8],[6,10],[7,8],[7,10],[8,9],[10,11]];

    const shapes = [
      { verts: icosaVerts, edges: icosaEdges, rx: 0, ry: 0, rz: 0, drx: 0.008, dry: 0.012, drz: 0.005, ox: -120, oy: -40, color: [139,92,246] },
      { verts: [[-60,-60,-60],[60,-60,-60],[60,60,-60],[-60,60,-60],[-60,-60,60],[60,-60,60],[60,60,60],[-60,60,60]].map(v=>v.map(c=>c*0.7)),
        edges: [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]],
        rx: 0, ry: 0, rz: 0, drx: 0.01, dry: 0.007, drz: 0.013, ox: 120, oy: 30, color: [236,72,153] },
    ];

    let t = 0;
    const draw = () => {
      ctx.fillStyle = "rgba(5,5,20,0.3)";
      ctx.fillRect(0, 0, W, H);
      t += 0.01;

      shapes.forEach(shape => {
        shape.rx += shape.drx; shape.ry += shape.dry; shape.rz += shape.drz;
        const projected = shape.verts.map(v => project(v[0], v[1], v[2], shape.rx, shape.ry, shape.rz));
        shape.edges.forEach(([a, b]) => {
          const pa = projected[a], pb = projected[b];
          const depth = (pa.z + pb.z) / 2;
          const alpha = Math.max(0.1, Math.min(0.9, (depth + 300) / 400));
          ctx.beginPath();
          ctx.moveTo(pa.sx + shape.ox, pa.sy + shape.oy);
          ctx.lineTo(pb.sx + shape.ox, pb.sy + shape.oy);
          ctx.strokeStyle = `rgba(${shape.color.join(",")},${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        });
        projected.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.sx + shape.ox, p.sy + shape.oy, 2 * p.scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${shape.color.join(",")},0.9)`;
          ctx.fill();
        });
      });

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full bg-[#05050f]" />;
}