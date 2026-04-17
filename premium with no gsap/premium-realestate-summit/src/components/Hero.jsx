import { useEffect, useState } from "react";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0]);
  const targets = [250, 98, 15];

  useEffect(() => {
    setTimeout(() => setLoaded(true), 300);
    const interval = setInterval(() => {
      setCounts(prev => prev.map((c, i) => Math.min(c + Math.ceil(targets[i] / 60), targets[i])));
    }, 30);
    setTimeout(() => clearInterval(interval), 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#080a0c]">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&h=1000&fit=crop"
          alt="" className="w-full h-full object-cover opacity-30" style={{ animation: "panSlow 20s ease-in-out infinite alternate" }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#080a0c] via-[#080a0c]/80 to-[#080a0c]/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080a0c] via-transparent to-[#080a0c]/60" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 w-full">
        <nav className="absolute top-6 md:top-8 left-0 right-0 flex items-center justify-between px-2"
          style={{ animation: loaded ? "fadeIn 1s ease 0.3s both" : "none" }}>
          <span className="text-lg font-bold tracking-wider" style={{ fontFamily: "'Playfair Display'", color: "#d4af37" }}>Summit</span>
          <div className="hidden md:flex gap-8">
            {["Properties","About","Services","Contact"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-white/20 text-xs tracking-[0.2em] uppercase hover:text-[#d4af37]/60 transition-colors">{l}</a>
            ))}
          </div>
        </nav>

        <div className="pt-28 md:pt-36">
          <p className="text-[#d4af37]/50 text-xs uppercase tracking-[0.5em] mb-6"
            style={{ animation: loaded ? "fadeSlideUp 0.7s ease 0.5s both" : "none" }}>
            Luxury Real Estate
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl leading-[0.95] mb-6"
            style={{ fontFamily: "'Playfair Display'", animation: loaded ? "fadeSlideUp 0.8s ease 0.7s both" : "none" }}>
            <span className="text-white">Exceptional</span><br />
            <span className="italic text-[#d4af37]">Properties</span>
          </h1>
          <div className="w-20 h-px bg-[#d4af37]/30 mb-8 origin-left"
            style={{ animation: loaded ? "lineGrow 0.8s ease 1.3s both" : "none" }} />
          <p className="text-white/30 text-sm md:text-base max-w-lg leading-relaxed mb-10"
            style={{ animation: loaded ? "fadeSlideUp 0.6s ease 1.5s both" : "none" }}>
            Curating the world's most extraordinary homes for discerning buyers. From penthouses to private estates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4"
            style={{ animation: loaded ? "fadeSlideUp 0.5s ease 1.8s both" : "none" }}>
            <a href="#properties" className="relative px-10 py-4 text-sm tracking-[0.3em] uppercase overflow-hidden group border border-[#d4af37]/30 rounded-lg">
              <span className="relative z-10 text-[#d4af37] group-hover:text-black transition-colors duration-300">View Properties</span>
              <div className="absolute inset-0 bg-[#d4af37] -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </a>
            <a href="#contact" className="px-10 py-4 text-white/20 text-sm tracking-[0.3em] uppercase border border-white/5 hover:border-white/15 rounded-lg transition-all">
              Schedule Viewing
            </a>
          </div>

          {/* Counter stats */}
          <div className="flex flex-wrap gap-8 md:gap-16 mt-16 md:mt-20 border-t border-white/5 pt-8"
            style={{ animation: loaded ? "fadeIn 0.8s ease 2.2s both" : "none" }}>
            {[[counts[0]+"M+","Portfolio Value"],[counts[1]+"%","Client Satisfaction"],[counts[2]+"+","Years Experience"]].map(([val,label],i) => (
              <div key={i}>
                <p className="text-[#d4af37] text-2xl md:text-3xl font-bold" style={{ fontFamily: "'Playfair Display'" }}>{val}</p>
                <p className="text-white/20 text-xs uppercase tracking-widest mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}