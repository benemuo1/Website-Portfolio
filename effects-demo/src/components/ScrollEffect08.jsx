import { useEffect, useRef, useState } from "react";

function RevealItem({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(30px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

export default function ScrollEffect08() {
  return (
    <div className="w-full h-full overflow-y-scroll bg-[#050510]" style={{ scrollbarWidth: "none" }}>
      <div className="p-6 space-y-6">
        {[["#6366f1","Scroll Reveal","Elements animate in as they enter the viewport"],
          ["#ec4899","Staggered","Each item delays slightly for a cascade effect"],
          ["#10b981","Intersection","Uses IntersectionObserver API"],
          ["#f59e0b","Smooth","Fade + slide up transition"]].map(([color, title, desc], i) => (
          <RevealItem key={i} delay={i * 100}>
            <div className="p-4 rounded-xl border border-white/10 flex items-center gap-4"
              style={{ borderLeftColor: color, borderLeftWidth: 3 }}>
              <div className="w-10 h-10 rounded-full shrink-0" style={{ background: color, opacity: 0.8 }} />
              <div>
                <p className="text-white font-bold text-sm">{title}</p>
                <p className="text-white/40 text-xs">{desc}</p>
              </div>
            </div>
          </RevealItem>
        ))}
        <RevealItem delay={400}>
          <p className="text-white/20 text-xs text-center tracking-widest uppercase">Scroll to reveal</p>
        </RevealItem>
      </div>
    </div>
  );
}