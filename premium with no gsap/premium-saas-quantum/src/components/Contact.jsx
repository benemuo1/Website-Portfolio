const ic = "w-full bg-white/[0.02] border border-white/5 text-white text-sm px-4 md:px-5 py-3 md:py-4 rounded-xl outline-none focus:border-cyan-400/30 transition-all placeholder-white/15";
export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-32 px-6 md:px-8 bg-[#08081a]">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-cyan-400/60 text-xs uppercase tracking-[0.4em] mb-3">Contact</p>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-3" style={{ fontFamily: "'Space Grotesk'" }}>
          Let's <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">talk</span>
        </h2>
        <p className="text-white/20 text-sm mb-12">Questions about Quantum? We'd love to hear from you.</p>
        <form className="flex flex-col gap-4 text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Name" className={ic} />
            <input type="email" placeholder="Email" className={ic} />
          </div>
          <input type="text" placeholder="Company" className={ic} />
          <textarea placeholder="How can we help?" rows={4} className={`${ic} resize-none`} />
          <button type="submit" className="mt-2 py-3 md:py-4 text-sm tracking-[0.15em] uppercase font-medium rounded-lg bg-cyan-500 text-white hover:bg-cyan-400 transition-colors">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}