import { useEffect, useState, useRef } from "react";

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i, x: Math.random() * 100, delay: Math.random() * 10,
  duration: Math.random() * 8 + 8, size: Math.random() * 4 + 2,
}));

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const TITLE = "NOIR";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [decoded, setDecoded] = useState(Array(TITLE.length).fill(false));
  const [display, setDisplay] = useState(TITLE.split("").map(() => CHARS[Math.floor(Math.random() * CHARS.length)]));
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 300);
    let step = 0;
    const interval = setInterval(() => {
      setDisplay(prev => prev.map((_, i) => step > i * 4 + 10 ? TITLE[i] : CHARS[Math.floor(Math.random() * CHARS.length)]));
      setDecoded(prev => prev.map((_, i) => step > i * 4 + 10));
      step++;
      if (step > TITLE.length * 4 + 14) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0806]"
      onMouseMove={(e) => setMouseY(e.clientY / window.innerHeight)}>
      {/* Parallax background */}
      <div className="absolute inset-0" style={{ transform: `translateY(${mouseY * -30}px)` }}>
        <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&h=1000&fit=crop"
          alt="" className="w-full h-[110%] object-cover opacity-25" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0806] via-[#0a0806]/80 to-[#0a0806]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0806] via-transparent to-[#0a0806]/60" />

      {/* Gold particles */}
      {PARTICLES.map(p => (
        <div key={p.id} className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`, bottom: 0, width: p.size, height: p.size,
            background: "#d4af37", boxShadow: "0 0 8px #d4af37",
            animation: `particleRise ${p.duration}s ease-in ${p.delay}s infinite`, opacity: 0,
          }} />
      ))}

      {/* Gold orb */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)", filter: "blur(60px)" }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 w-full">
        <nav className="absolute top-6 md:top-8 left-0 right-0 flex items-center justify-between px-2"
          style={{ animation: loaded ? "fadeIn 1s ease 0.3s both" : "none" }}>
          <span className="text-[#d4af37]/60 text-xs tracking-[0.4em] uppercase font-light">Noir</span>
          <div className="hidden md:flex items-center gap-8">
            {["Menu","About","Reservations","Contact"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-white/20 text-xs tracking-[0.2em] uppercase font-light hover:text-[#d4af37]/60 transition-colors">{l}</a>
            ))}
          </div>
          <a href="#reservations" className="hidden md:block text-[#d4af37]/50 text-xs tracking-[0.2em] uppercase border border-[#d4af37]/20 px-5 py-2 hover:bg-[#d4af37]/10 transition-all">
            Reserve
          </a>
        </nav>

        <div className="pt-28 md:pt-36 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[#d4af37]/50 text-xs uppercase tracking-[0.5em] mb-6"
              style={{ animation: loaded ? "fadeSlideUp 0.7s ease 0.5s both" : "none" }}>
              Fine Dining Experience
            </p>

            {/* Decoded title */}
            <h1 className="mb-2" style={{ fontFamily: "'Cormorant Garamond'" }}>
              <div className="flex">
                {display.map((char, i) => (
                  <span key={i} className="inline-block text-[clamp(5rem,14vw,10rem)] leading-none"
                    style={{
                      color: decoded[i] ? "#f5efe6" : "#d4af37",
                      textShadow: decoded[i] ? "none" : "0 0 20px rgba(212,175,55,0.5)",
                      fontWeight: 300,
                      transition: "color 0.3s",
                    }}>
                    {char}
                  </span>
                ))}
              </div>
            </h1>

            <p className="text-2xl md:text-3xl font-light mb-8" style={{ fontFamily: "'Cormorant Garamond'", fontStyle: "italic", color: "rgba(212,175,55,0.5)", animation: loaded ? "fadeSlideUp 0.6s ease 1.2s both" : "none" }}>
              Where Art Meets Appetite
            </p>

            <div className="w-20 h-px bg-[#d4af37]/30 mb-8 origin-left"
              style={{ animation: loaded ? "lineGrow 0.8s ease 1.5s both" : "none" }} />

            <p className="text-white/30 text-sm md:text-base max-w-md leading-relaxed mb-10"
              style={{ animation: loaded ? "fadeSlideUp 0.6s ease 1.7s both" : "none" }}>
              An intimate culinary journey through seasonal ingredients, masterful technique, and the art of hospitality.
            </p>

            <div className="flex flex-col sm:flex-row gap-4"
              style={{ animation: loaded ? "fadeSlideUp 0.5s ease 2s both" : "none" }}>
              <a href="#reservations" className="relative px-10 py-4 text-sm tracking-[0.3em] uppercase font-light overflow-hidden group border border-[#d4af37]/30">
                <span className="relative z-10 text-[#d4af37] group-hover:text-black transition-colors duration-300">Reserve a Table</span>
                <div className="absolute inset-0 bg-[#d4af37] -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </a>
              <a href="#menu" className="px-10 py-4 text-white/20 text-sm tracking-[0.3em] uppercase font-light hover:text-white/50 transition-colors border border-white/5 hover:border-white/15">
                View Menu
              </a>
            </div>
          </div>

          {/* Right - featured dish image */}
          <div className="hidden lg:block relative"
            style={{ animation: loaded ? "fadeSlideUp 1s ease 0.8s both" : "none" }}>
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4]"
              style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.5)" }}>
              <img src="https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=650&fit=crop"
                alt="Signature dish" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0806] via-transparent to-transparent opacity-60" />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-4 -left-4 bg-[#0a0806]/90 backdrop-blur-xl border border-[#d4af37]/15 rounded-xl p-5"
              style={{ animation: loaded ? "fadeSlideUp 0.6s ease 1.8s both" : "none" }}>
              <p className="text-[#d4af37] text-xs tracking-[0.3em] uppercase mb-1">Michelin Starred</p>
              <div className="flex gap-1">
                {[1,2,3].map(i => <span key={i} className="text-[#d4af37] text-sm">★</span>)}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom stats */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-8 md:gap-16 mt-16 md:mt-20 border-t border-white/5 pt-8"
          style={{ animation: loaded ? "fadeIn 0.8s ease 2.3s both" : "none" }}>
          {[["Est.","2018"],["Seats","48"],["Courses","12"],["Stars","★★★"]].map(([label,val],i) => (
            <div key={i} className="text-center">
              <p className="text-[#d4af37]/40 text-xs tracking-[0.3em] uppercase">{label}</p>
              <p className="text-white/60 text-lg font-light mt-1" style={{ fontFamily: "'Cormorant Garamond'" }}>{val}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}