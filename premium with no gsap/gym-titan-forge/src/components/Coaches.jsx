const coaches = [
  { name: "JAKE HAMMER", role: "Founder & Head Coach", bio: "20 years forging athletes. Former competitive strongman.", image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&h=500&fit=crop" },
  { name: "NINA STEEL", role: "Strength Coach", bio: "Specializes in powerlifting and Olympic weightlifting technique.", image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=500&fit=crop" },
  { name: "RAY FORGE", role: "Conditioning Specialist", bio: "Builds unbreakable endurance through intelligent programming.", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=500&fit=crop" },
];

export default function Coaches() {
  return (
    <section id="coaches" className="py-20 md:py-32 px-6 md:px-8 bg-[#0e0e0e] relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-12 md:mb-16">
          <div className="w-8 h-0.5 bg-orange-500" />
          <p className="text-orange-500 text-xs uppercase tracking-[0.3em]" style={{ fontFamily: "'Oswald'" }}>Coaches</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {coaches.map((c, i) => (
            <div key={i} className="group relative rounded-xl overflow-hidden border border-white/5 hover:border-orange-500/20 transition-all duration-500">
              <div className="aspect-[3/4] overflow-hidden">
                <img src={c.image} alt={c.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/30 to-transparent" />
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-orange-500 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <h3 className="text-white font-bold text-sm md:text-base" style={{ fontFamily: "'Oswald'", letterSpacing: "0.1em" }}>{c.name}</h3>
                <p className="text-orange-400/60 text-xs md:text-sm">{c.role}</p>
                <p className="text-white/0 group-hover:text-white/25 text-xs mt-1 transition-all duration-500 max-h-0 group-hover:max-h-12 overflow-hidden">{c.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}