import { useEffect, useRef, useState } from "react";

export default function Effect14() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const speedRef = useRef(1);
  const [warping, setWarping] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;

    const stars = Array.from({ length: 300 }, () => ({
      x: (Math.random() - 0.5) * W * 2,
      y: (Math.random() - 0.5) * H * 2,
      z: Math.random() * W,
      pz: 0,
    }));

    const draw = () => {
      ctx.fillStyle = "rgba(5,5,15,0.25)";
      ctx.fillRect(0, 0, W, H);

      const speed = speedRef.current;
      stars.forEach(star => {
        star.pz = star.z;
        star.z -= speed;
        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * W * 2;
          star.y = (Math.random() - 0.5) * H * 2;
          star.z = W; star.pz = W;
        }
        const sx = (star.x / star.z) * W + cx;
        const sy = (star.y / star.z) * H + cy;
        const px = (star.x / star.pz) * W + cx;
        const py = (star.y / star.pz) * H + cy;
        const size = Math.max(0.5, (1 - star.z / W) * 3);
        const brightness = 1 - star.z / W;
        const hue = (brightness * 60 + 200) % 360;

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.strokeStyle = `hsla(${hue},80%,${60 + brightness * 40}%,${brightness})`;
        ctx.lineWidth = size;
        ctx.stroke();
      });

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleMouseEnter = () => { speedRef.current = 20; setWarping(true); };
  const handleMouseLeave = () => { speedRef.current = 1; setWarping(false); };

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
        className="w-full h-full cursor-crosshair" />
      <div className="absolute inset-0 flex items-end justify-center pb-6 pointer-events-none">
        <p className="text-white/30 text-xs tracking-widest uppercase">
          {warping ? "WARP SPEED" : "Hover to engage warp"}
        </p>
      </div>
    </div>
  );
}