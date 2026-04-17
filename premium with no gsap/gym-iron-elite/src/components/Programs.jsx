const programs = [
  { title: "POWERLIFTING", desc: "Squat, bench, deadlift. Progressive overload programming for raw strength gains.", image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&h=400&fit=crop", tag: "STRENGTH", num: "01" },
  { title: "HIIT WARFARE", desc: "High-intensity circuits designed to destroy fat and build relentless endurance.", image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&h=400&fit=crop", tag: "CARDIO", num: "02" },
  { title: "BODYBUILDING", desc: "Hypertrophy-focused splits with periodized volume for maximum muscle growth.", image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&h=400&fit=crop", tag: "HYPERTROPHY", num: "03" },
  { title: "COMBAT FIT", desc: "Boxing, kickboxing, and MMA conditioning for fighters and enthusiasts.", image: "https://images.unsplash.com/photo-1615117972428-28de87e68d5b?w=600&h=400&fit=crop", tag: "COMBAT", num: "04" },
];

export default function Programs() {
  return (
    <section id="programs" className="py-20 md:py-32 px-6 md:px-8 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(220,38,38,0.05) 0%, transparent 70%)" }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <p className="text-red-500 text-xs uppercase tracking-[0.3em] mb-3" style={{ fontFamily: "'Bebas Neue'" }}>Programs</p>
        <h2 className="text-4xl md:text-6xl font-black text-white mb-12 md:mb-16" style={{ fontFamily: "'Bebas Neue'" }}>CHOOSE YOUR WEAPON</h2>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {programs.map((p, i) => (
            <div key={i} className="group relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer border border-white/5 hover:border-red-600/20 transition-colors">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent group-hover:via-black/70 transition-all duration-500" />

              {/* Tag */}
              <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-red-600 px-3 py-1">
                <span className="text-white text-[10px] font-black tracking-widest">{p.tag}</span>
              </div>

              {/* Number watermark */}
              <span className="absolute top-3 left-3 md:top-4 md:left-4 text-white/5 text-5xl md:text-7xl font-black" style={{ fontFamily: "'Bebas Neue'" }}>{p.num}</span>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <h3 className="text-xl md:text-2xl font-black text-white mb-2" style={{ fontFamily: "'Bebas Neue'", letterSpacing: "0.05em" }}>{p.title}</h3>
                <p className="text-white/0 group-hover:text-white/50 text-xs md:text-sm leading-relaxed transition-all duration-500 max-h-0 group-hover:max-h-20 overflow-hidden">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}