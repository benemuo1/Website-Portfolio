export default function Footer() {
  return (
    <footer className="py-10 md:py-12 px-6 md:px-8 bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="text-red-500 font-black text-lg tracking-widest" style={{ fontFamily: "'Bebas Neue'" }}>IRON ELITE</span>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {["Programs","Trainers","Pricing","Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-white/15 text-xs uppercase tracking-widest hover:text-red-500/50 transition-colors">{l}</a>
          ))}
        </div>
        <span className="text-white/10 text-xs">&copy; 2024 Iron Elite</span>
      </div>
    </footer>
  );
}