import { useEffect, useRef } from "react";

export default function AdvancedEffect05() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;

    const nodes = Array.from({ length: 14 }, (_, i) => ({
      id: i, x: W/2 + (Math.random()-0.5)*200, y: H/2 + (Math.random()-0.5)*200,
      vx: 0, vy: 0, r: i === 0 ? 14 : 8,
      label: ["Design","Code","UX","Brand","Motion","3D","Web","App","API","DB","Auth","Deploy","Test","CI"][i],
      color: `hsl(${i*26},70%,60%)`,
    }));

    const edges = [[0,1],[0,2],[0,3],[1,4],[1,5],[2,6],[2,7],[3,8],[3,9],[4,10],[5,11],[6,12],[7,13],[8,9],[10,11]];

    const draw = () => {
      ctx.fillStyle = "rgba(5,5,16,0.3)";
      ctx.fillRect(0, 0, W, H);

      // Forces
      nodes.forEach(n => {
        // Center gravity
        n.vx += (W/2 - n.x) * 0.001;
        n.vy += (H/2 - n.y) * 0.001;
        // Repulsion
        nodes.forEach(m => {
          if (m === n) return;
          const dx = n.x - m.x, dy = n.y - m.y;
          const dist = Math.sqrt(dx*dx + dy*dy) + 1;
          const force = 800 / (dist * dist);
          n.vx += (dx / dist) * force * 0.01;
          n.vy += (dy / dist) * force * 0.01;
        });
        // Mouse repel
        const mdx = n.x - mouseRef.current.x, mdy = n.y - mouseRef.current.y;
        const mdist = Math.sqrt(mdx*mdx + mdy*mdy) + 1;
        if (mdist < 100) { n.vx += (mdx/mdist) * 2; n.vy += (mdy/mdist) * 2; }
      });

      // Spring edges
      edges.forEach(([a, b]) => {
        const na = nodes[a], nb = nodes[b];
        const dx = nb.x - na.x, dy = nb.y - na.y;
        const dist = Math.sqrt(dx*dx + dy*dy) + 1;
        const force = (dist - 80) * 0.003;
        na.vx += (dx/dist) * force; na.vy += (dy/dist) * force;
        nb.vx -= (dx/dist) * force; nb.vy -= (dy/dist) * force;
      });

      nodes.forEach(n => {
        n.vx *= 0.85; n.vy *= 0.85;
        n.x += n.vx; n.y += n.vy;
        n.x = Math.max(20, Math.min(W-20, n.x));
        n.y = Math.max(20, Math.min(H-20, n.y));
      });

      // Draw edges
      edges.forEach(([a, b]) => {
        ctx.beginPath();
        ctx.moveTo(nodes[a].x, nodes[a].y);
        ctx.lineTo(nodes[b].x, nodes[b].y);
        ctx.strokeStyle = "rgba(255,255,255,0.08)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI*2);
        ctx.fillStyle = n.color;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.font = `${n.id === 0 ? 9 : 7}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(n.label, n.x, n.y + n.r + 8);
      });

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleMouseMove = (e) => {
    const r = canvasRef.current.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} onMouseMove={handleMouseMove} className="w-full h-full cursor-crosshair" />
      <p className="absolute bottom-4 left-0 right-0 text-center text-white/20 text-xs tracking-widest uppercase pointer-events-none">Move mouse to push nodes</p>
    </div>
  );
}