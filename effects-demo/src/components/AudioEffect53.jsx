import { useEffect, useRef, useState } from "react";

export default function AudioEffect53() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const [active, setActive] = useState(false);
  const analyserRef = useRef(null);

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const ctx = new AudioContext();
      const src = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      src.connect(analyser);
      analyserRef.current = analyser;
      setActive(true);
    } catch { setActive(false); }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;
    let t = 0;

    const draw = () => {
      ctx.fillStyle = "rgba(5,5,16,0.3)";
      ctx.fillRect(0, 0, W, H);
      t += 0.05;

      let volume = 0;
      if (analyserRef.current) {
        const data = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(data);
        volume = data.reduce((a, b) => a + b, 0) / data.length / 128;
      } else {
        volume = (Math.sin(t * 2) * 0.3 + Math.sin(t * 5) * 0.2 + 0.5) * 0.8;
      }

      [80, 55, 35].forEach((r, i) => {
        const pulse = r + volume * 40 * (1 - i * 0.2);
        const hue = (i * 80 + t * 20) % 360;
        const grd = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, pulse);
        grd.addColorStop(0, `hsla(${hue},80%,60%,${0.6 - i * 0.15})`);
        grd.addColorStop(1, "transparent");
        ctx.beginPath(); ctx.arc(W/2, H/2, pulse, 0, Math.PI * 2);
        ctx.fillStyle = grd; ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
      {!active && (
        <button onClick={start} className="absolute inset-0 flex items-center justify-center text-white/40 text-xs tracking-widest uppercase hover:text-white/60 transition-colors">
          Click to enable mic / simulating beat
        </button>
      )}
    </div>
  );
}