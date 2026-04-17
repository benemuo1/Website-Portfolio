import { useState } from "react";

const programs = [
  { num: "01", title: "Forge Strength", desc: "Barbell-focused progressive overload. Squat, press, pull. No machines, no shortcuts.", weeks: "12", image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&h=400&fit=crop" },
  { num: "02", title: "Anvil Conditioning", desc: "Brutal metabolic circuits that build work capacity and mental toughness.", weeks: "8", image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&h=400&fit=crop" },
  { num: "03", title: "Steel Physique", desc: "Hypertrophy programming with periodized volume for serious muscle growth.", weeks: "16", image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&h=400&fit=crop" },
  { num: "04", title: "Iron Endurance", desc: "Hybrid training combining strength with cardiovascular performance.", weeks: "10", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop" },
];

export default function Training() {
  const [hovered, setHovered] = useState(null);
  return (
    <section id="training" className="py-20 md:py-32 px-6 md:px-8 bg-[#0c0c0c] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(249,115,22,0.04) 0%, transparent 70%)", transform: "translate(-30%, -30%)" }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-12 md:mb-16">
          <div className="w-8 h-0.5 bg-orange-500" />
          <p className="text-orange-500 text-xs uppercase tracking-[0.3em]" style={{ fontFamily: "'Oswald'" }}>Programs</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {programs.map((p, i) => (
            <div key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-white/5 hover:border-orange-500/20 transition-all duration-500 cursor-pointer">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-40 group-hover:opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/50 to-transparent" />
              {/* Steel texture */}
              <div className="absolute inset-0 opacity-5"
                style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)" }} />

              <div className="absolute top-3 left-3 md:top-4 md:left-4">
                <span className="text-orange-500/20 text-4xl md:text-6xl font-bold" style={{ fontFamily: "'Oswald'" }}>{p.num}</span>
              </div>
              <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-white/5 backdrop-blur-sm px-3 py-1 rounded">
                <span className="text-white/30 text-[10px] tracking-widest uppercase">{p.weeks} weeks</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-white mb-1 group-hover:text-orange-400 transition-colors" style={{ fontFamily: "'Oswald'" }}>{p.title}</h3>
                <p className="text-white/0 group-hover:text-white/40 text-xs md:text-sm leading-relaxed transition-all duration-500 max-h-0 group-hover:max-h-16 overflow-hidden">{p.desc}</p>
              </div>
              {/* Bottom orange line */}
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-orange-500 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}