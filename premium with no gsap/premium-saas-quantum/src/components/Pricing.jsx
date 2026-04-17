import { useState } from "react";
const plans = [
  { name: "Hobby", price: "Free", features: ["3 projects","100GB bandwidth","Community support","Shared compute"] },
  { name: "Pro", price: "$20", features: ["Unlimited projects","1TB bandwidth","Priority support","Dedicated compute","Custom domains","Team members"], tag: "POPULAR" },
  { name: "Enterprise", price: "Custom", features: ["Everything in Pro","SLA guarantee","SSO / SAML","Dedicated account manager","Custom contracts","On-premise option"] },
];
export default function Pricing() {
  const [h, setH] = useState(1);
  return (
    <section id="pricing" className="py-20 md:py-32 px-6 md:px-8 bg-[#06060f]">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-cyan-400/60 text-xs uppercase tracking-[0.4em] mb-3">Pricing</p>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-12 md:mb-16" style={{ fontFamily: "'Space Grotesk'" }}>
          Simple, <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">transparent</span> pricing
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {plans.map((p, i) => (
            <div key={i} onMouseEnter={() => setH(i)} onMouseLeave={() => setH(1)}
              className="relative rounded-2xl p-6 md:p-8 transition-all duration-500"
              style={{ border: h === i ? "1px solid rgba(34,211,238,0.25)" : "1px solid rgba(255,255,255,0.04)", background: h === i ? "rgba(34,211,238,0.03)" : "transparent", transform: h === i ? "translateY(-4px)" : "translateY(0)" }}>
              {p.tag && <div className="absolute -top-3 left-6 bg-cyan-500 px-3 py-1 rounded-full"><span className="text-white text-[10px] font-bold tracking-widest">{p.tag}</span></div>}
              <p className="text-white/30 text-xs uppercase tracking-widest mb-6">{p.name}</p>
              <p className="text-3xl md:text-4xl font-extrabold mb-1 transition-colors" style={{ fontFamily: "'Space Grotesk'", color: h === i ? "#22d3ee" : "white" }}>{p.price}</p>
              <p className="text-white/15 text-xs mb-8">{p.price === "Free" ? "forever" : p.price === "Custom" ? "contact us" : "/month"}</p>
              <div className="space-y-3 mb-8">
                {p.features.map((f, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full mt-2 shrink-0" style={{ background: h === i ? "#22d3ee" : "rgba(255,255,255,0.1)" }} />
                    <span className="text-white/35 text-sm">{f}</span>
                  </div>
                ))}
              </div>
              <a href="#contact" className="block text-center py-3 text-sm tracking-[0.15em] uppercase rounded-lg transition-all duration-300"
                style={{ background: h === i ? "#22d3ee" : "transparent", color: h === i ? "black" : "rgba(255,255,255,0.25)", border: h === i ? "1px solid #22d3ee" : "1px solid rgba(255,255,255,0.08)", fontWeight: h === i ? 600 : 400 }}>
                {p.price === "Custom" ? "Contact Sales" : "Get Started"}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}