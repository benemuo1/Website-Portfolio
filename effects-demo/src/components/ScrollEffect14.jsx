import { useEffect, useRef, useState } from "react";

export default function ScrollEffect14() {
  const ref = useRef(null);
  const pathRef = useRef(null);
  const [scroll, setScroll] = useState(0);
  const [pathLen, setPathLen] = useState(0);

  useEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
  }, []);

  useEffect(() => {
    const el = ref.current;
    const onScroll = () => setScroll(el.scrollTop / (el.scrollHeight - el.clientHeight));
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={ref} className="w-full h-full overflow-y-scroll bg-[#050510]" style={{ scrollbarWidth: "none" }}>
      <div className="sticky top-0 h-full flex items-center justify-center pointer-events-none">
        <svg width="200" height="160" viewBox="0 0 200 160">
          <path ref={pathRef} d="M20,80 C20,20 80,20 100,80 C120,140 180,140 180,80"
            fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
          <path d="M20,80 C20,20 80,20 100,80 C120,140 180,140 180,80"
            fill="none" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round"
            strokeDasharray={pathLen}
            strokeDashoffset={pathLen * (1 - scroll)}
            style={{ filter: "drop-shadow(0 0 6px #a78bfa)" }} />
        </svg>
      </div>
      <div style={{ height: 600 }} className="flex items-end justify-center pb-8">
        <p className="text-white/20 text-xs tracking-widest uppercase">Scroll to draw the path</p>
      </div>
    </div>
  );
}