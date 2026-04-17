const inputClass = "w-full bg-white/[0.02] border border-white/5 text-white text-sm px-4 md:px-5 py-3 md:py-4 rounded-xl outline-none focus:border-[#d4af37]/30 focus:bg-white/[0.03] transition-all duration-300 placeholder-white/15";

export default function Reservations() {
  return (
    <section id="reservations" className="py-20 md:py-32 px-6 md:px-8 bg-[#0d0a07] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.03) 0%, transparent 70%)" }} />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[#d4af37]/50 text-xs uppercase tracking-[0.4em] mb-3">Reservations</p>
          <h2 className="text-3xl md:text-5xl mb-3" style={{ fontFamily: "'Cormorant Garamond'", fontWeight: 300 }}>
            Reserve Your <span className="italic text-[#d4af37]/70">Evening</span>
          </h2>
          <p className="text-white/20 text-sm max-w-md mx-auto">Seatings available Wednesday through Sunday. Private dining available upon request.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <form className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name" className={inputClass} />
              <input type="email" placeholder="Email" className={inputClass} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Date" className={inputClass} />
              <input type="text" placeholder="Party Size" className={inputClass} />
            </div>
            <input type="text" placeholder="Special Requests" className={inputClass} />
            <textarea placeholder="Dietary requirements or occasion details..." rows={3} className={`${inputClass} resize-none`} />
            <button type="submit" className="mt-2 py-3 md:py-4 text-sm tracking-[0.3em] uppercase font-light border border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all duration-300 rounded-lg">
              Request Reservation
            </button>
          </form>

          <div className="flex flex-col gap-4">
            {[["Hours","Wed-Sun, 6PM - 11PM"],["Dress Code","Smart Casual"],["Location","123 Culinary Ave, Downtown"],["Phone","+1 (555) 234-NOIR"]].map(([label,val]) => (
              <div key={label} className="bg-white/[0.02] border border-white/5 rounded-xl p-4 md:p-5 hover:border-[#d4af37]/15 transition-colors">
                <p className="text-[#d4af37]/40 text-xs tracking-[0.2em] uppercase mb-1">{label}</p>
                <p className="text-white/50 text-sm">{val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}