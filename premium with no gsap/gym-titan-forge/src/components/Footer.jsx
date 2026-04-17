export default function Footer() {
  return (
    <footer className="py-10 md:py-12 px-6 md:px-8 bg-[#0c0c0c] border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-500 flex items-center justify-center"><span className="text-black font-black text-xs">TF</span></div>
          <span className="text-white/40 text-xs tracking-[0.3em] uppercase">Titan Forge</span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {["Training","Coaches","Plans","Join"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-white/15 text-xs uppercase tracking-widest hover:text-orange-400/50 transition-colors">{l}</a>
          ))}
        </div>
        <span className="text-white/10 text-xs">&copy; 2024 Titan Forge</span>
      </div>
    </footer>
  );
}