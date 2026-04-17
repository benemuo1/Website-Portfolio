export default function Footer() {
  return (
    <footer className="py-10 px-6 md:px-8 bg-[#080a0c] border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="text-lg font-bold tracking-wider" style={{ fontFamily: "'Playfair Display'", color: "#d4af37" }}>Summit</span>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {["Properties","About","Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-white/15 text-xs tracking-[0.2em] uppercase hover:text-[#d4af37]/40 transition-colors">{l}</a>
          ))}
        </div>
        <span className="text-white/10 text-xs">&copy; 2024 Summit Realty</span>
      </div>
    </footer>
  );
}