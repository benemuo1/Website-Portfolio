export default function Footer() {
  return (
    <footer className="py-10 md:py-14 px-6 md:px-8 bg-[#0a0806] border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <span className="text-2xl font-light" style={{ fontFamily: "'Cormorant Garamond'", color: "#d4af37" }}>Noir</span>
            <p className="text-white/20 text-xs mt-3 leading-relaxed">An intimate culinary journey through seasonal ingredients and masterful technique.</p>
          </div>
          <div>
            <p className="text-[#d4af37]/40 text-xs tracking-[0.2em] uppercase mb-4">Navigate</p>
            <div className="space-y-2">
              {["Menu","About","Reservations"].map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} className="block text-white/20 text-sm hover:text-white/50 transition-colors">{l}</a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[#d4af37]/40 text-xs tracking-[0.2em] uppercase mb-4">Hours</p>
            <p className="text-white/20 text-sm">Wed - Sun</p>
            <p className="text-white/20 text-sm">6:00 PM - 11:00 PM</p>
          </div>
          <div>
            <p className="text-[#d4af37]/40 text-xs tracking-[0.2em] uppercase mb-4">Contact</p>
            <p className="text-white/20 text-sm">hello@noir-dining.com</p>
            <p className="text-white/20 text-sm">+1 (555) 234-NOIR</p>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-white/10 text-xs">&copy; 2024 Noir Restaurant. All rights reserved.</span>
          <div className="flex gap-6">
            {["Instagram","Facebook","TripAdvisor"].map(s => (
              <a key={s} href="#" className="text-white/15 text-xs hover:text-[#d4af37]/40 transition-colors">{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}