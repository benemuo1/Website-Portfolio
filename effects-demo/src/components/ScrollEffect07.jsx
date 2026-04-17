import { useEffect, useRef, useState } from "react";

export default function ScrollEffect07() {
  const ref = useRef(null);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const el = ref.current;
    const onScroll = () => setScroll(el.scrollTop / (el.scrollHeight - el.clientHeight));
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={ref} className="w-full h-full overflow-y-scroll relative bg-[#050510]" style={{ scrollbarWidth: "none" }}>
      <div className="sticky top-0 left-0 right-0 h-1 z-10 bg-gray-800">
        <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-100"
          style={{ width: `${scroll * 100}%` }} />
      </div>
      {/* Parallax layers */}
      <div className="relative" style={{ height: 800 }}>
        <div className="sticky top-0 h-full overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {[["bg-purple-900/40",0.2,300,300],["bg-pink-900/40",0.5,200,200],["bg-blue-900/40",0.8,150,150]].map(([cls,depth,w,h],i) => (
              <div key={i} className={`absolute rounded-full ${cls}`}
                style={{ width:w, height:h, transform:`translateY(${scroll * depth * -200}px)`, filter:"blur(40px)" }} />
            ))}
            <p className="text-white/40 text-sm tracking-widest uppercase z-10">Scroll down ↓</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center pb-8">
          <p className="text-white/20 text-xs">Parallax layers at different depths</p>
        </div>
      </div>
    </div>
  );
}