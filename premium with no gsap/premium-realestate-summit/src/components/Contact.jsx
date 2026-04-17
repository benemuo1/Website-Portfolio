const ic = "w-full bg-white/[0.02] border border-white/5 text-white text-sm px-4 md:px-5 py-3 md:py-4 rounded-xl outline-none focus:border-[#d4af37]/30 transition-all placeholder-white/15";
export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-32 px-6 md:px-8 bg-[#080a0c]">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-[#d4af37]/50 text-xs uppercase tracking-[0.4em] mb-3">Contact</p>
        <h2 className="text-3xl md:text-5xl mb-3" style={{ fontFamily: "'Playfair Display'" }}>
          <span className="text-white">Schedule a </span><span className="italic text-[#d4af37]">Viewing</span>
        </h2>
        <p className="text-white/20 text-sm mb-12">Our team is ready to show you your next home.</p>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          <input type="text" placeholder="Name" className={ic} />
          <input type="email" placeholder="Email" className={ic} />
          <input type="text" placeholder="Phone" className={ic} />
          <input type="text" placeholder="Budget Range" className={ic} />
          <textarea placeholder="What are you looking for?" rows={4} className={`${ic} sm:col-span-2 resize-none`} />
          <div className="sm:col-span-2">
            <button type="submit" className="w-full py-3 md:py-4 text-sm tracking-[0.3em] uppercase rounded-lg border border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all duration-300">
              Request Viewing
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}