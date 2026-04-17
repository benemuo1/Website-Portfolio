const inputClass = "w-full bg-white/[0.03] border border-white/5 text-white text-sm px-4 md:px-5 py-3 md:py-4 outline-none focus:border-red-600/30 focus:bg-white/[0.04] transition-all duration-300 placeholder-white/15";

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-32 px-6 md:px-8 bg-[#0d0d0d] relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(220,38,38,0.04) 0%, transparent 70%)", transform: "translate(30%, 30%)" }} />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-red-500 text-xs uppercase tracking-[0.3em] mb-3" style={{ fontFamily: "'Bebas Neue'" }}>Contact</p>
          <h2 className="text-4xl md:text-6xl font-black text-white" style={{ fontFamily: "'Bebas Neue'" }}>READY TO START?</h2>
          <p className="text-white/20 text-sm mt-4 max-w-md mx-auto">Drop us a message and we'll get you set up within 24 hours.</p>
        </div>

        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="text" placeholder="Name" className={inputClass} />
          <input type="email" placeholder="Email" className={inputClass} />
          <input type="text" placeholder="Phone" className={inputClass} />
          <input type="text" placeholder="Goal" className={inputClass} />
          <textarea placeholder="Anything else?" rows={4} className={`${inputClass} sm:col-span-2 resize-none`} />
          <div className="sm:col-span-2">
            <button type="submit" className="w-full bg-red-600 text-white py-3 md:py-4 font-black text-lg tracking-widest uppercase hover:bg-red-500 transition-colors"
              style={{ fontFamily: "'Bebas Neue'" }}>
              SEND MESSAGE
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}