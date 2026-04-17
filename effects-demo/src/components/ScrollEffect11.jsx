import { useEffect, useRef, useState } from "react";

export default function ScrollEffect11() {
  const ref = useRef(null);
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    const el = ref.current;
    const onScroll = () => setScroll(el.scrollTop / (el.scrollHeight - el.clientHeight));
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);
  const scale = 0.6 + scroll * 0.8;
  const opacity = 0.3 + scroll * 0.7;
  return (
    <div ref={ref} className="w-full h-full overflow-y-scroll bg-[#050510]" style={{ scrollbarWidth: "none" }}>
      <div style={{ height: 600 }} className="flex items-center justify-center sticky top-0">
        <div className="text-center" style={{ transform: `scale(${scale})`, opacity, transition: "transform 0.05s, opacity 0.05s" }}>
          <p className="text-6xl font-black text-white">ZOOM</p>
          <p className="text-white/40 text-sm mt-2">Scroll to zoom in</p>
        </div>
      </div>
    </div>
  );
}