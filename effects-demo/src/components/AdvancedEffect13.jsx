import { useEffect, useRef } from "react";

export default function AdvancedEffect13() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;
    let t = 0;

    const TEXT = "• WEB DEVELOPER • FULL-STACK ENGINEER • CREATIVE CODER • DESIGNER ";
    const R = Math.min(W, H) * 0.35;

    const draw = () => {
      ctx.fillStyle = "rgba(5,5,16,0.3)";
      ctx.fillRect(0, 0, W, H);
      t += 0.005;

      ctx.font = "bold 11px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let i = 0; i < TEXT.length; i++) {
        const angle = (i / TEXT.length) * Math.PI * 2 + t;
        const x = cx + Math.cos(angle) * R;
        const y = cy + Math.sin(angle) * R;
        const hue = (i / TEXT.length * 360 + t * 30) % 360;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle + Math.PI / 2);
        ctx.fillStyle = `hsl(${hue},80%,65%)`;
        ctx.shadowColor = `hsl(${hue},80%,65%)`;
        ctx.shadowBlur = 6;
        ctx.fillText(TEXT[i], 0, 0);
        ctx.restore();
      }

      // Center content
      ctx.shadowBlur = 0;
      ctx.font = "bold 18px sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.fillText("BIANCA", cx, cy - 12);
      ctx.font = "11px sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.fillText("ENEMUO", cx, cy + 10);

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}