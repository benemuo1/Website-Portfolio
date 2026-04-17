const trainers = [
  { name: "DEREK STONE", role: "Head Coach", spec: "Powerlifting", image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&h=500&fit=crop" },
  { name: "MAYA REYES", role: "HIIT Specialist", spec: "Conditioning", image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=500&fit=crop" },
  { name: "TYRONE JACKSON", role: "Combat Coach", spec: "MMA / Boxing", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=500&fit=crop" },
  { name: "SARAH VOLKOV", role: "Physique Coach", spec: "Bodybuilding", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=500&fit=crop" },
];

export default function Trainers() {
  return (
    <section id="trainers" className="py-20 md:py-32 px-6 md:px-8 bg-[#0d0d0d] relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(220,38,38,0.04) 0%, transparent 70%)", transform: "translate(-30%, 30%)" }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <p className="text-red-500 text-xs uppercase tracking-[0.3em] mb-3" style={{ fontFamily: "'Bebas Neue'" }}>The Team</p>
        <h2 className="text-4xl md:text-6xl font-black text-white mb-12 md:mb-16" style={{ fontFamily: "'Bebas Neue'" }}>ELITE TRAINERS</h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {trainers.map((t, i) => (
            <div key={i} className="group relative overflow-hidden rounded-lg border border-white/5 hover:border-red-600/20 transition-colors">
              <div className="aspect-[3/4] overflow-hidden">
                <img src={t.image} alt={t.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              {/* Red line accent */}
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-red-600 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                <h3 className="text-white font-black text-xs md:text-sm" style={{ fontFamily: "'Bebas Neue'", letterSpacing: "0.1em" }}>{t.name}</h3>
                <p className="text-red-400/70 text-[10px] md:text-xs">{t.role}</p>
                <p className="text-white/20 text-[10px]">{t.spec}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}