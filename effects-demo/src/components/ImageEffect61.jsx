import { useEffect, useRef } from "react";

const CHARS = "@#S%?*+;:,. ";
const IMG_SRC = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&h=60&fit=crop";

export default function ImageEffect61() {
  const preRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = IMG_SRC;
    img.onload = () => {
      const offscreen = document.createElement("canvas");
      offscreen.width = 60; offscreen.height = 40;
      const ctx = offscreen.getContext("2d");

      let t = 0;
      const draw = () => {
        ctx.drawImage(img, 0, 0, 60, 40);
        const data = ctx.getImageData(0, 0, 60, 40).data;
        let ascii = "";
        for (let y = 0; y < 40; y++) {
          for (let x = 0; x < 60; x++) {
            const i = (y * 60 + x) * 4;
            const brightness = (data[i] * 0.299 + data[i+1] * 0.587 + data[i+2] * 0.114) / 255;
            const charIdx = Math.floor((1 - brightness) * (CHARS.length - 1));
            ascii += CHARS[charIdx];
          }
          ascii += "\n";
        }
        if (preRef.current) preRef.current.textContent = ascii;
        t++;
        rafRef.current = requestAnimationFrame(draw);
      };
      draw();
    };
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="w-full h-full bg-[#050510] flex items-center justify-center overflow-hidden p-2">
      <pre ref={preRef} className="text-green-400 font-mono leading-none select-none"
        style={{ fontSize: "5px", letterSpacing: "1px" }} />
    </div>
  );
}