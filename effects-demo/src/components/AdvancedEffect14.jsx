import { useEffect, useRef, useState } from "react";

const CHARS = "@#S%?*+;:,. ";

export default function AdvancedEffect14() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const preRef = useRef(null);
  const rafRef = useRef(null);
  const [active, setActive] = useState(false);
  const [error, setError] = useState(false);

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 80, height: 60 } });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      setActive(true);
    } catch { setError(true); }
  };

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 80; canvas.height = 60;

    const draw = () => {
      ctx.drawImage(videoRef.current, 0, 0, 80, 60);
      const data = ctx.getImageData(0, 0, 80, 60).data;
      let ascii = "";
      for (let y = 0; y < 60; y++) {
        for (let x = 0; x < 80; x++) {
          const i = (y * 80 + x) * 4;
          const b = (data[i]*0.299 + data[i+1]*0.587 + data[i+2]*0.114) / 255;
          ascii += CHARS[Math.floor((1 - b) * (CHARS.length - 1))];
        }
        ascii += "\n";
      }
      if (preRef.current) preRef.current.textContent = ascii;
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, [active]);

  return (
    <div className="w-full h-full bg-[#050510] flex flex-col items-center justify-center overflow-hidden">
      <video ref={videoRef} className="hidden" />
      <canvas ref={canvasRef} className="hidden" />
      {!active ? (
        <div className="text-center">
          <button onClick={start} className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-sm transition-colors mb-3">
            {error ? "Camera denied" : "Enable Webcam"}
          </button>
          <p className="text-white/20 text-xs tracking-widest uppercase">Live webcam → ASCII art</p>
        </div>
      ) : (
        <pre ref={preRef} className="text-green-400 font-mono leading-none select-none"
          style={{ fontSize: "4px", letterSpacing: "1.5px" }} />
      )}
    </div>
  );
}