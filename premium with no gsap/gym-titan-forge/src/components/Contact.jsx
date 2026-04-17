const inputClass = "w-full bg-white/[0.03] border border-white/5 text-white text-sm px-4 md:px-5 py-3 md:py-4 outline-none focus:border-orange-500/30 focus:bg-white/[0.04] transition-all duration-300 placeholder-white/15";

export default function Contact() {
  return (
    <section id="join" className="py-20 md:py-32 px-6 md:px-8 bg-[#0e0e0e] relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-orange-500 text-xs uppercase tracking-[0.3em] mb-3" style={{ fontFamily: "'Oswald'" }}>Join</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white" style={{ fontFamily: "'Oswald'" }}>ENTER THE FORGE</h2>
          <p className="text-white/20 text-sm mt-4 max-w-md mx-auto">Ready to be forged? Fill out the form and we'll get you started.</p>
        </div>

        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="text" placeholder="Name" className={inputClass} />
          <input type="email" placeholder="Email" className={inputClass} />
          <input type="text" placeholder="Phone" className={inputClass} />
          <input type="text" placeholder="Experience Level" className={inputClass} />
          <textarea placeholder="Your goals" rows={4} className={`${inputClass} sm:col-span-2 resize-none`} />
          <div className="sm:col-span-2">
            <button type="submit" className="w-full bg-orange-500 text-black py-3 md:py-4 font-bold tracking-widest uppercase hover:bg-orange-400 transition-colors" style={{ fontFamily: "'Oswald'" }}>
              START FORGING
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}