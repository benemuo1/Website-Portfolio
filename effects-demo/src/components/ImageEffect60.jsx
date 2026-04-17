import { useEffect, useRef, useState } from "react";

const IMG = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop";

export default function ImageEffect60() {
  const ref = useRef(null);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const el = ref.current;
    const onScroll = () => setScroll(el.scrollTop / (el.scrollHeight - el.clientHeight));
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={ref} className="w-full h-full overflow-y-scroll bg-[#050510]" style={{ scrollbarWidth: "none" }}>
      <div style={{ height: 200 }} className="flex items-center justify-center">
        <p className="text-white/20 text-xs tracking-widest uppercase">Scroll down ↓</p>
      </div>
      <div className="flex items-center justify-center px-6 pb-8">
        <div className="relative w-full rounded-xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
          <img src={IMG} alt="reveal" className="w-full h-full object-cover" />
          {/* Wipe mask */}
          <div className="absolute inset-0 bg-[#050510] pointer-events-none"
            style={{ clipPath: `inset(0 0 ${scroll * 100}% 0)`, transition: "clip-path 0.05s" }} />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: 1 - scroll * 2 }}>
            <p className="text-white/50 text-xs tracking-widest uppercase">Scroll to reveal</p>
          </div>
        </div>
      </div>
    </div>
  );
}