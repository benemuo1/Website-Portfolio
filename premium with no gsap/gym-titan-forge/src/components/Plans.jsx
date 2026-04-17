import { useState } from "react";

const plans = [
  { name: "APPRENTICE", price: "59", features: ["Open gym access", "Basic programming", "Community forum"] },
  { name: "BLACKSMITH", price: "109", features: ["Full access", "All group sessions", "Monthly assessment", "Nutrition basics"], tag: "POPULAR" },
  { name: "MASTER FORGER", price: "179", features: ["Everything above", "Weekly 1-on-1", "Custom programming", "Recovery protocols", "Priority access"] },
];

export default function Plans() {
  const [hovered, setHovered] = useState(1);
  return (
    <section id="plans" className="py-20 md:py-32 px-6 md:px-8 bg-[#0c0c0c] relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-orange-500 text-xs uppercase tracking-[0.3em] mb-3" style={{ fontFamily: "'Oswald'" }}>Pricing</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white" style={{ fontFamily: "'Oswald'" }}>CHOOSE YOUR PATH</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {plans.map((p, i) => (
            <div key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(1)}
              className="relative p-6 md:p-8 transition-all duration-500 group"
              style={{
                border: hovered === i ? "1px solid rgba(249,115,22,0.3)" : "1px solid rgba(255,255,255,0.04)",
                background: hovered === i ? "rgba(249,115,22,0.03)" : "transparent",
                transform: hovered === i ? "translateY(-4px)" : "translateY(0)",
                boxShadow: hovered === i ? "0 20px 60px rgba(249,115,22,0.08)" : "none",
              }}>
              {p.tag && (
                <div className="absolute -top-3 left-6 bg-orange-500 px-3 py-1">
                  <span className="text-black text-[10px] font-bold tracking-widest">{p.tag}</span>
                </div>
              )}

              <p className="text-white/25 text-xs tracking-widest mb-6" style={{ fontFamily: "'Oswald'" }}>{p.name}</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl md:text-5xl font-bold transition-colors duration-300"
                  style={{ fontFamily: "'Oswald'", color: hovered === i ? "#f97316" : "white" }}>${p.price}</span>
                <span className="text-white/20 text-sm">/mo</span>
              </div>

              <div className="space-y-3 mb-8">
                {p.features.map((f, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div className="w-1.5 h-0.5 mt-2.5 shrink-0 transition-colors duration-300"
                      style={{ background: hovered === i ? "#f97316" : "rgba(255,255,255,0.1)" }} />
                    <span className="text-white/30 text-sm">{f}</span>
                  </div>
                ))}
              </div>

              <a href="#join" className="block text-center py-3 md:py-4 text-sm tracking-widest uppercase transition-all duration-300"
                style={{
                  fontFamily: "'Oswald'",
                  border: hovered === i ? "1px solid #f97316" : "1px solid rgba(255,255,255,0.08)",
                  color: hovered === i ? "black" : "rgba(255,255,255,0.25)",
                  background: hovered === i ? "#f97316" : "transparent",
                }}>
                JOIN
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}