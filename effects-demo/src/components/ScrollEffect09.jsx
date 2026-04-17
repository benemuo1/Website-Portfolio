import { useEffect, useRef, useState } from "react";

export default function ScrollEffect09() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    const onScroll = () => setProgress(el.scrollTop / (el.scrollHeight - el.clientHeight));
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const circumference = 2 * Math.PI * 20;

  return (
    <div ref={ref} className="w-full h-full overflow-y-scroll bg-[#050510] relative" style={{ scrollbarWidth: "none" }}>
      {/* Circular progress indicator */}
      <div className="sticky top-3 right-3 float-right z-10 mr-3">
        <svg width="50" height="50" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
          <circle cx="25" cy="25" r="20" fill="none" stroke="#a78bfa" strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            strokeLinecap="round"
            transform="rotate(-90 25 25)"
            style={{ transition: "stroke-dashoffset 0.1s" }} />
          <text x="25" y="29" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">
            {Math.round(progress * 100)}%
          </text>
        </svg>
      </div>
      <div className="p-6 space-y-8">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="p-6 rounded-xl bg-white/5 border border-white/10">
            <p className="text-white font-bold mb-2">Section {i + 1}</p>
            <p className="text-white/40 text-sm">Scroll to see the circular progress indicator update in the top right corner.</p>
          </div>
        ))}
      </div>
    </div>
  );
}