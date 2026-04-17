import { useState } from "react";

const categories = ["Starters", "Mains", "Desserts"];
const menuItems = {
  Starters: [
    { name: "Tuna Tartare", desc: "Sesame, avocado, citrus ponzu, crispy wonton", price: "28" },
    { name: "Foie Gras Torchon", desc: "Brioche, fig compote, Sauternes gelée", price: "34" },
    { name: "Burrata", desc: "Heirloom tomato, basil oil, aged balsamic", price: "24" },
  ],
  Mains: [
    { name: "Wagyu Ribeye", desc: "A5 grade, bone marrow butter, truffle jus", price: "95" },
    { name: "Dover Sole", desc: "Brown butter, capers, lemon, haricots verts", price: "68" },
    { name: "Duck Breast", desc: "Cherry gastrique, parsnip purée, micro greens", price: "52" },
  ],
  Desserts: [
    { name: "Chocolate Soufflé", desc: "Valrhona 70%, crème anglaise, gold leaf", price: "22" },
    { name: "Crème Brûlée", desc: "Tahitian vanilla, caramelized sugar, berries", price: "18" },
    { name: "Cheese Selection", desc: "Artisanal cheeses, honeycomb, walnut bread", price: "26" },
  ],
};

export default function Menu() {
  const [active, setActive] = useState("Starters");
  return (
    <section id="menu" className="py-20 md:py-32 px-6 md:px-8 bg-[#0d0a07] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.03) 0%, transparent 70%)" }} />
      <div className="max-w-5xl mx-auto relative z-10">
        <p className="text-[#d4af37]/50 text-xs uppercase tracking-[0.4em] mb-3">The Menu</p>
        <h2 className="text-3xl md:text-5xl mb-2" style={{ fontFamily: "'Cormorant Garamond'", fontWeight: 300 }}>
          Seasonal <span className="italic text-[#d4af37]/70">Selections</span>
        </h2>
        <div className="w-16 h-px bg-[#d4af37]/30 mb-10 md:mb-14" />

        {/* Category tabs */}
        <div className="flex gap-6 md:gap-10 mb-10 md:mb-14">
          {categories.map(c => (
            <button key={c} onClick={() => setActive(c)}
              className={`text-xs tracking-[0.3em] uppercase transition-all duration-300 pb-2 ${active === c ? "text-[#d4af37] border-b border-[#d4af37]/40" : "text-white/20 hover:text-white/40"}`}>
              {c}
            </button>
          ))}
        </div>

        {/* Items */}
        <div className="space-y-0 divide-y divide-white/5">
          {menuItems[active].map((item, i) => (
            <div key={i} className="group flex flex-col sm:flex-row sm:items-center justify-between py-6 md:py-8 gap-2 hover:bg-white/[0.01] px-4 -mx-4 transition-all">
              <div className="flex-1 min-w-0">
                <h3 className="text-base md:text-lg font-medium text-white/80 group-hover:text-[#d4af37] transition-colors" style={{ fontFamily: "'Cormorant Garamond'" }}>{item.name}</h3>
                <p className="text-white/25 text-xs md:text-sm mt-1">{item.desc}</p>
              </div>
              <span className="text-[#d4af37]/60 text-lg font-light shrink-0" style={{ fontFamily: "'Cormorant Garamond'" }}>${item.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}