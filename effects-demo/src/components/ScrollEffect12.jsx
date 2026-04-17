import { useEffect, useRef, useState } from "react";

export default function ScrollEffect12() {
  const ref = useRef(null);
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    const el = ref.current;
    const onScroll = () => setScroll(el.scrollTop / (el.scrollHeight - el.clientHeight));
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const r1 = 50 - scroll * 40;
  const hue = scroll * 280;
  const size = 80 + scroll * 80;

  return (
    <div ref={ref} className="w-full h-full overflow-y-scroll bg-[#050510]" style={{ scrollbarWidth: "none" }}>
      <div className="sticky top-0 h-full flex items-center justify-center pointer-events-none">
        <div style={{
          width: size, height: size,
          borderRadius: `${r1}% ${100 - r1}% ${r1}% ${100 - r1}% / ${100 - r1}% ${r1}% ${100 - r1}% ${r1}%`,
          background: `hsl(${hue},80%,60%)`,
          boxShadow: `0 0 40px hsl(${hue},80%,50%)`,
          transition: "border-radius 0.1s, background 0.1s, width 0.1s, height 0.1s",
        }} />
      </div>
      <div style={{ height: 600 }} className="flex items-end justify-center pb-8">
        <p className="text-white/20 text-xs tracking-widest uppercase">Scroll to morph shape</p>
      </div>
    </div>
  );
}