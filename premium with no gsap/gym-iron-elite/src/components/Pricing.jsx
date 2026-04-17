import { useState } from "react";

const plans = [
  { name: "RECRUIT", price: "49", features: ["Gym floor access", "Basic equipment", "Open gym hours"] },
  { name: "SOLDIER", price: "89", features: ["Full facility access", "All group classes", "Locker room", "Sauna access"] },
  { name: "COMMANDER", price: "149", features: ["Everything in Soldier", "2x PT sessions/month", "Nutrition guidance", "Priority booking", "Guest passes"], tag: "BEST VALUE" },
];

export default function Pricing() {
  const [hovered, setHovered] = useState(2);
  return (
    <section id="pricing" className="py-20 md:py-32 px-6 md:px-8 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(220,38,38,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-red-500 text-xs uppercase tracking-[0.3em] mb-3" style={{ fontFamily: "'Bebas Neue'" }}>Pricing</p>
          <h2 className="text-4xl md:text-6xl font-black text-white" style={{ fontFamily: "'Bebas Neue'" }}>PICK YOUR RANK</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {plans.map((p, i) => (
            <div key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(2)}
              className="relative rounded-lg p-6 md:p-8 transition-all duration-500 group"
              style={{
                border: hovered === i ? "1px solid rgba(220,38,38,0.3)" : "1px solid rgba(255,255,255,0.04)",
                background: hovered === i ? "rgba(220,38,38,0.03)" : "transparent",
                transform: hovered === i ? "translateY(-4px)" : "translateY(0)",
                boxShadow: hovered === i ? "0 20px 60px rgba(220,38,38,0.1)" : "none",
              }}>
              {p.tag && (
                <div className="absolute -top-3 left-6 bg-red-600 px-3 py-1">
                  <span className="text-white text-[10px] font-black tracking-widest">{p.tag}</span>
                </div>
              )}

              <p className="text-white/25 text-xs tracking-widest mb-6" style={{ fontFamily: "'Bebas Neue'" }}>{p.name}</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl md:text-5xl font-black transition-colors duration-300"
                  style={{ fontFamily: "'Bebas Neue'", color: hovered === i ? "#dc2626" : "white" }}>${p.price}</span>
                <span className="text-white/20 text-sm">/mo</span>
              </div>

              <div className="space-y-3 mb-8">
                {p.features.map((f, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 transition-colors duration-300"
                      style={{ background: hovered === i ? "#dc2626" : "rgba(255,255,255,0.1)" }} />
                    <span className="text-white/30 text-sm">{f}</span>
                  </div>
                ))}
              </div>

              <a href="#contact" className="block text-center py-3 md:py-4 text-sm font-black tracking-widest uppercase transition-all duration-300"
                style={{
                  fontFamily: "'Bebas Neue'",
                  border: hovered === i ? "1px solid #dc2626" : "1px solid rgba(255,255,255,0.08)",
                  color: hovered === i ? "white" : "rgba(255,255,255,0.25)",
                  background: hovered === i ? "#dc2626" : "transparent",
                }}>
                ENLIST NOW
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}