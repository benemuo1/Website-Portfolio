import { useEffect, useRef } from "react";

export default function CardEffect27() {
  const borderRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    let t = 0;
    const animate = () => {
      t += 0.5;
      if (borderRef.current) {
        borderRef.current.style.backgroundImage = `conic-gradient(from ${t}deg, #6366f1, #ec4899, #f59e0b, #10b981, #6366f1)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="w-full h-full bg-[#050510] flex items-center justify-center">
      <div ref={borderRef} className="p-0.5 rounded-2xl"
        style={{ backgroundImage: "conic-gradient(from 0deg, #6366f1, #ec4899, #f59e0b, #10b981, #6366f1)" }}>
        <div className="bg-[#0a0a1a] rounded-2xl px-10 py-8 text-center">
          <p className="text-white font-bold mb-1">Morphing Border</p>
          <p className="text-white/40 text-xs">Rotating gradient border</p>
        </div>
      </div>
    </div>
  );
}