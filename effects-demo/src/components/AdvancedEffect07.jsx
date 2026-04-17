import { useEffect, useRef, useState } from "react";

function lsystem(axiom, rules, iterations) {
  let s = axiom;
  for (let i = 0; i < iterations; i++) s = s.split("").map(c => rules[c] || c).join("");
  return s;
}

export default function AdvancedEffect07() {
  const canvasRef = useRef(null);
  const [iter, setIter] = useState(4);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;

    ctx.fillStyle = "#050510";
    ctx.fillRect(0, 0, W, H);

    const str = lsystem("F", { F: "FF+[+F-F-F]-[-F+F+F]" }, iter);
    const angle = 25 * Math.PI / 180;
    const len = H / (iter * 4 + 4);

    let x = W/2, y = H - 10, dir = -Math.PI/2;
    const stack = [];

    ctx.lineWidth = Math.max(0.5, 3 - iter * 0.4);
    ctx.lineCap = "round";

    str.split("").forEach((c, i) => {
      const progress = i / str.length;
      const hue = 100 + progress * 60;
      const lightness = 30 + progress * 40;
      ctx.strokeStyle = `hsl(${hue},60%,${lightness}%)`;

      if (c === "F") {
        ctx.beginPath();
        ctx.moveTo(x, y);
        x += Math.cos(dir) * len;
        y += Math.sin(dir) * len;
        ctx.lineTo(x, y);
        ctx.stroke();
      } else if (c === "+") dir += angle;
      else if (c === "-") dir -= angle;
      else if (c === "[") stack.push({ x, y, dir });
      else if (c === "]") { const s = stack.pop(); x = s.x; y = s.y; dir = s.dir; }
    });
  }, [iter]);

  return (
    <div className="relative w-full h-full bg-[#050510]">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 pointer-events-auto">
        {[2,3,4,5].map(n => (
          <button key={n} onClick={() => setIter(n)}
            className="px-3 py-1 rounded text-xs font-bold uppercase tracking-wider transition-colors"
            style={{ background: iter === n ? "#10b981" : "rgba(255,255,255,0.1)", color: "white" }}>
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}