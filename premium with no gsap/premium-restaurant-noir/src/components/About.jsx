export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 px-6 md:px-8 bg-[#0a0806] relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.03) 0%, transparent 70%)", transform: "translate(-30%, 30%)" }} />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=500&h=600&fit=crop"
                alt="Chef" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0806] via-transparent to-transparent rounded-2xl" />
            <div className="absolute bottom-6 left-6 right-6 bg-[#0a0806]/80 backdrop-blur-xl border border-[#d4af37]/10 rounded-xl p-4">
              <p className="text-[#d4af37] text-sm" style={{ fontFamily: "'Cormorant Garamond'" }}>Chef Laurent Dubois</p>
              <p className="text-white/25 text-xs">Executive Chef, 3 Michelin Stars</p>
            </div>
          </div>
          <div>
            <p className="text-[#d4af37]/50 text-xs uppercase tracking-[0.4em] mb-3">Our Story</p>
            <h2 className="text-3xl md:text-5xl mb-6" style={{ fontFamily: "'Cormorant Garamond'", fontWeight: 300 }}>
              A Legacy of <span className="italic text-[#d4af37]/70">Excellence</span>
            </h2>
            <div className="w-16 h-px bg-[#d4af37]/30 mb-8" />
            <p className="text-white/35 text-sm leading-relaxed mb-4">
              Founded in 2018, Noir represents the culmination of Chef Laurent's lifelong dedication to the culinary arts. Every dish tells a story of provenance, technique, and passion.
            </p>
            <p className="text-white/25 text-sm leading-relaxed mb-8">
              Our ingredients are sourced from local farms and artisan producers, ensuring each plate reflects the season's finest offerings.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[["Farm to Table","Locally sourced"],["Seasonal","Rotating menu"],["Intimate","48 seats"]].map(([title,sub],i) => (
                <div key={i} className="border border-white/5 rounded-xl p-4 text-center hover:border-[#d4af37]/15 transition-colors">
                  <p className="text-[#d4af37]/60 text-xs tracking-widest uppercase mb-1">{title}</p>
                  <p className="text-white/20 text-[10px]">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}