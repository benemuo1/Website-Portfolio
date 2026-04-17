import { useEffect, useRef } from "react";

export default function TextEffect09() {
  const spanRef = useRef(null);
  const rafRef = useRef(null);
  const posRef = useRef(-100);

  useEffect(() => {
    const animate = () => {
      posRef.current += 1.2;
      if (posRef.current > 200) posRef.current = -100;
      if (spanRef.current) {
        spanRef.current.style.backgroundPosition = `${posRef.current}% 50%`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="w-full h-full bg-[#050510] flex flex-col items-center justify-center gap-6">
      <span ref={spanRef} className="text-6xl font-black select-none"
        style={{
          backgroundImage: "linear-gradient(105deg, #c0a060 0%, #c0a060 30%, #fff8e0 45%, #fffbe8 50%, #fff8e0 55%, #c0a060 70%, #c0a060 100%)",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "0.05em",
        }}>
        SHIMMER
      </span>
      <p className="text-white/20 text-xs tracking-widest uppercase">Metallic gradient sweep</p>
    </div>
  );
}