import { useEffect, useState, useRef } from "react";

const SPARKS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  sx: (Math.random() - 0.5) * 200 + "px",
  sy: -(Math.random() * 150 + 50) + "px",
  delay: Math.random() * 0.5,
  duration: Math.random() * 0.6 + 0.4,
  size: Math.random() * 3 + 1,
}));

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [split, setSplit] = useState(true);
  const [sparksVisible, setSparksVisible] = useState(false);
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setTimeout(() => setLoaded(true), 200);
    setTimeout(() => setSplit(false), 800);
    setTimeout(() => setSparksVisible(true), 1200);
    setTimeout(() => setSparksVisible(false), 2000);
  }, []);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setTilt({
      x: ((e.clientY - r.top) / r.height - 0.5) * 6,
      y: ((e.clientX - r.left) / r.width - 0.5) * -6,
    });
  };

  return (
    <section ref={ref} onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0c0c0c]"
      style={{ perspective: "1200px" }}>

      {/* Split screen curtains */}
      <div className="absolute inset-0 z-30 pointer-events-none flex">
        <div className="w-1/2 h-full bg-[#0c0c0c]"
          style={{ transform: split ? "translateX(0)" : "translateX(-100%)", transition: "transform 0.8s cubic-bezier(0.76,0,0.24,1)" }} />
        <div className="w-1/2 h-full bg-[#0c0c0c]"
          style={{ transform: split ? "translateX(0)" : "translateX(100%)", transition: "transform 0.8s cubic-bezier(0.76,0,0.24,1)" }} />
      </div>

      {/* Background */}
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=1600&h=900&fit=crop"
          alt="" className="w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0c] via-[#0c0c0c]/70 to-transparent" />
        {/* Steel texture overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)" }} />
      </div>

      {/* Orange accent glow */}
      <div className="absolute bottom-0 left-1/3 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(249,115,22,0.15) 0%, transparent 70%)", filter: "blur(40px)" }} />

      {/* Content with 3D tilt */}
      <div className="relative z-20 max-w-7xl mx-auto px-8 w-full"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.1s ease",
          transformStyle: "preserve-3d",
        }}>

        {/* Nav */}
        <nav className="absolute top-8 left-0 right-0 flex items-center justify-between"
          style={{ animation: loaded ? "fadeSlideUp 0.6s ease 1s both" : "none" }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-500 flex items-center justify-center">
              <span className="text-black font-black text-xs">TF</span>
            </div>
            <span className="text-white/60 text-xs tracking-[0.3em] uppercase font-light">Titan Forge</span>
          </div>
          <div className="hidden md:flex gap-8">
            {["Training","Coaches","Plans","Join"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-white/25 text-xs tracking-[0.2em] uppercase hover:text-orange-400 transition-colors">{l}</a>
            ))}
          </div>
        </nav>

        <div className="pt-32 grid md:grid-cols-2 gap-16 items-center">
          <div>
            {/* Hammer slam title */}
            <h1 style={{ fontFamily: "'Oswald'" }}>
              {["FORGED","IN","IRON"].map((word, i) => (
                <span key={i} className="block text-[clamp(3.5rem,10vw,8rem)] font-bold leading-[0.95] uppercase"
                  style={{
                    color: word === "IRON" ? "#f97316" : "white",
                    textShadow: word === "IRON" ? "0 0 40px rgba(249,115,22,0.4)" : "none",
                    animation: loaded ? `hammerSlam 0.5s cubic-bezier(0.16,1,0.3,1) ${1 + i * 0.15}s both` : "none",
                  }}>
                  {word}
                </span>
              ))}
            </h1>

            {/* Sparks at the text baseline */}
            {sparksVisible && (
              <div className="relative h-0">
                {SPARKS.map(s => (
                  <div key={s.id} className="absolute rounded-full bg-orange-400"
                    style={{
                      width: s.size, height: s.size,
                      "--sx": s.sx, "--sy": s.sy,
                      animation: `spark ${s.duration}s ease-out ${s.delay}s both`,
                      boxShadow: "0 0 4px #f97316",
                    }} />
                ))}
              </div>
            )}

            {/* Divider */}
            <div className="flex items-center gap-4 my-8"
              style={{ animation: loaded ? "fadeSlideUp 0.6s ease 1.8s both" : "none" }}>
              <div className="w-12 h-0.5 bg-orange-500" />
              <span className="text-orange-500/60 text-xs tracking-[0.3em] uppercase">Est. 2019</span>
            </div>

            {/* Subtitle */}
            <p className="text-white/35 text-base max-w-md mb-10 font-light leading-relaxed"
              style={{ animation: loaded ? "fadeSlideUp 0.6s ease 2s both" : "none" }}>
              Raw. Relentless. Real. A training ground built for those who refuse to settle for average.
            </p>

            {/* CTA */}
            <div className="flex gap-4" style={{ animation: loaded ? "fadeSlideUp 0.5s ease 2.2s both" : "none" }}>
              <a href="#join" className="bg-orange-500 text-black px-10 py-4 font-bold uppercase text-sm tracking-widest hover:bg-orange-400 transition-colors"
                style={{ animation: "orangeGlow 3s ease-in-out infinite" }}>
                Start Forging
              </a>
              <a href="#training" className="border border-white/15 text-white/40 px-10 py-4 uppercase text-sm tracking-widest hover:border-orange-500/50 hover:text-white/80 transition-all">
                Programs
              </a>
            </div>
          </div>

          {/* Right side - tilted image with 3D depth */}
          <div className="hidden md:block"
            style={{ animation: loaded ? "tiltIn 1s cubic-bezier(0.16,1,0.3,1) 1.2s both" : "none", transformStyle: "preserve-3d" }}>
            <div className="relative rounded-2xl overflow-hidden" style={{ transform: "translateZ(40px)" }}>
              <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&h=600&fit=crop"
                alt="Training" className="w-full h-[500px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent" />
              {/* Floating stat card */}
              <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-4 flex justify-between"
                style={{ transform: "translateZ(20px)" }}>
                {[["98%","Retention"],["4.9","Rating"],["12","Weeks"]].map(([v,l],i) => (
                  <div key={i} className="text-center">
                    <p className="text-orange-400 font-bold text-lg">{v}</p>
                    <p className="text-white/30 text-xs">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}