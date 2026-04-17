export default function Footer() {
  return (
    <footer className="py-10 px-6 md:px-8 bg-[#06060f] border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="text-cyan-400/60 text-sm font-semibold tracking-wider" style={{ fontFamily: "'Space Grotesk'" }}>quantum</span>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {["Features","Pricing","Docs","Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-white/15 text-xs tracking-[0.15em] uppercase hover:text-cyan-400/40 transition-colors">{l}</a>
          ))}
        </div>
        <span className="text-white/10 text-xs">&copy; 2024 Quantum</span>
      </div>
    </footer>
  );
}