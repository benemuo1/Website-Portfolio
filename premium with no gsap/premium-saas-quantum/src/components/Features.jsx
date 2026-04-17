const features = [
  { title: "Edge Deployment", desc: "Deploy to 300+ edge locations worldwide in under 2 seconds.", icon: "⚡" },
  { title: "Zero Config", desc: "Auto-detects your framework. No YAML, no Dockerfiles, no hassle.", icon: "🔧" },
  { title: "Serverless Functions", desc: "Write backend logic that scales automatically with demand.", icon: "☁️" },
  { title: "Real-time Analytics", desc: "Monitor performance, errors, and usage in a beautiful dashboard.", icon: "📊" },
  { title: "Team Collaboration", desc: "Preview deployments, branch environments, and role-based access.", icon: "👥" },
  { title: "Enterprise Security", desc: "SOC 2 compliant, DDoS protection, and custom SSL certificates.", icon: "🔒" },
];

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-32 px-6 md:px-8 bg-[#08081a]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-cyan-400/60 text-xs uppercase tracking-[0.4em] mb-3">Features</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white" style={{ fontFamily: "'Space Grotesk'" }}>
            Everything you <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">need</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="group border border-white/5 hover:border-cyan-400/15 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:bg-cyan-400/[0.02]">
              <span className="text-3xl mb-4 block">{f.icon}</span>
              <h3 className="text-base md:text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors" style={{ fontFamily: "'Space Grotesk'" }}>{f.title}</h3>
              <p className="text-white/30 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}