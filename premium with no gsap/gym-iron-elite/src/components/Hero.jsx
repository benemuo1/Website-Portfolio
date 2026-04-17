import { useEffect, useState, useRef } from "react";

const DUST = Array.from({ length: 40 }, (_, i) => ({
  id: i, x: Math.random() * 100, delay: Math.random() * 8,
  duration: Math.random() * 6 + 6, size: Math.random() * 3 + 1,
  opacity: Math.random() * 0.4 + 0.1,
}));

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#";
const TITLE = "IRON ELITE";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [decoded, setDecoded] = useState(Array(TITLE.length).fill(false));
  const [display, setDisplay] = useState(TITLE.split("").map(() => CHARS[Math.floor(Math.random() * CHARS.length)]));
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 300);

    // Scramble decode
    let step = 0;
    const interval = setInterval(() => {
      setDisplay(prev => prev.map((_, i) =>
        step > i * 3 + 8 ? TITLE[i] : CHARS[Math.floor(Math.random() * CHARS.length)]
      ));
      setDecoded(prev => prev.map((_, i) => step > i * 3 + 8));
      step++;
      if (step > TITLE.length * 3 + 12) clearInterval(interval);
    }, 50);

    // Periodic glitch
    const glitchTimer = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 4000);

    return () => { clearInterval(interval); clearInterval(glitchTimer); };
  }, []);

  return (
    <section className="relative min-h-screen bg-[#0a0a0a] flex items-center overflow-hidden">
      {/* Background image with red overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&h=900&fit=crop"
          alt="" className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
      </div>

      {/* Scanline */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        <div className="absolute left-0 right-0 h-px bg-red-500/20" style={{ animation: "scanline 4s linear infinite" }} />
      </div>

      {/* Dust particles */}
      {DUST.map(d => (
        <div key={d.id} className="absolute rounded-full bg-red-500/60 pointer-events-none"
          style={{
            left: `${d.x}%`, bottom: 0, width: d.size, height: d.size,
            animation: `dustFloat ${d.duration}s ease-in ${d.delay}s infinite`,
          }} />
      ))}

      {/* Red accent orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(220,38,38,0.15) 0%, transparent 70%)", filter: "blur(60px)", animation: "heartbeat 3s ease-in-out infinite" }} />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-8 w-full">
        {/* Nav */}
        <nav className="absolute top-8 left-8 right-8 flex items-center justify-between"
          style={{ animation: loaded ? "fadeIn 0.8s ease 0.2s both" : "none" }}>
          <span className="text-red-500 font-black text-xl tracking-widest" style={{ fontFamily: "'Bebas Neue'" }}>IRON ELITE</span>
          <div className="hidden md:flex gap-8">
            {["Programs","Trainers","Pricing","Contact"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-white/30 text-xs tracking-[0.2em] uppercase hover:text-white/80 transition-colors">{l}</a>
            ))}
          </div>
        </nav>

        <div className="pt-32">
          {/* Decoded title */}
          <h1 className="mb-6" style={{ fontFamily: "'Bebas Neue'", lineHeight: 0.9 }}>
            <div className="flex flex-wrap">
              {display.map((char, i) => (
                <span key={i} className="inline-block text-[clamp(4rem,12vw,10rem)]"
                  style={{
                    color: decoded[i] ? (TITLE[i] === " " ? "transparent" : "white") : "#dc2626",
                    textShadow: decoded[i] ? "none" : "0 0 20px rgba(220,38,38,0.8)",
                    width: TITLE[i] === " " ? "0.3em" : "auto",
                    animation: glitch && !decoded[i] ? "glitch 0.15s steps(2) infinite" : "none",
                    transition: "color 0.2s",
                  }}>
                  {TITLE[i] === " " ? "\u00a0" : char}
                </span>
              ))}
            </div>
          </h1>

          {/* Red line */}
          <div className="w-32 h-1 bg-red-600 mb-8 origin-left"
            style={{ animation: loaded ? "lineGrow 0.8s cubic-bezier(0.16,1,0.3,1) 1.5s both" : "none" }} />

          {/* Subtitle */}
          <p className="text-white/40 text-lg max-w-lg mb-10 font-light tracking-wide"
            style={{ animation: loaded ? "slideUp 0.7s ease 1.8s both" : "none" }}>
            Where weakness dies and legends are forged. No excuses. No shortcuts. Just results.
          </p>

          {/* CTA */}
          <div className="flex gap-4" style={{ animation: loaded ? "slideUp 0.6s ease 2.1s both" : "none" }}>
            <a href="#contact" className="relative bg-red-600 text-white px-10 py-4 font-black uppercase text-sm tracking-widest hover:bg-red-500 transition-colors"
              style={{ animation: "redPulse 3s ease-in-out infinite" }}>
              JOIN THE ELITE
            </a>
            <a href="#programs" className="border border-white/20 text-white/60 px-10 py-4 font-bold uppercase text-sm tracking-widest hover:border-white/60 hover:text-white transition-all">
              VIEW PROGRAMS
            </a>
          </div>

          {/* Stats bar */}
          <div className="flex gap-12 mt-16 border-t border-white/5 pt-8"
            style={{ animation: loaded ? "fadeIn 0.8s ease 2.5s both" : "none" }}>
            {[["15K+","Members"],["200+","Programs"],["50+","Trainers"],["24/7","Access"]].map(([val,label],i) => (
              <div key={i}>
                <p className="text-2xl font-black text-red-500" style={{ fontFamily: "'Bebas Neue'", letterSpacing: "0.05em" }}>{val}</p>
                <p className="text-white/25 text-xs uppercase tracking-widest">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}