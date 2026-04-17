import { useEffect, useState, useRef } from "react";

const NODES = Array.from({ length: 30 }, (_, i) => ({
  id: i, x: Math.random() * 100, y: Math.random() * 100,
  size: Math.random() * 3 + 1, speed: Math.random() * 0.02 + 0.005,
}));

const LINES = ["$ quantum deploy --production", "✓ Build optimized in 1.2s", "✓ 47 routes generated", "✓ Edge functions deployed", "→ https://app.quantum.dev"];

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [terminalLines, setTerminalLines] = useState([]);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 300);
    LINES.forEach((line, i) => {
      setTimeout(() => setTerminalLines(prev => [...prev, line]), 1500 + i * 600);
    });
  }, []);

  // Node network canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;
    const nodes = NODES.map(n => ({ ...n, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3 }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      nodes.forEach(n => {
        n.x = ((n.x / 100 * W + n.vx) % W + W) % W / W * 100;
        n.y = ((n.y / 100 * H + n.vy) % H + H) % H / H * 100;
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = (nodes[i].x - nodes[j].x) / 100 * W;
          const dy = (nodes[i].y - nodes[j].y) / 100 * H;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x / 100 * W, nodes[i].y / 100 * H);
            ctx.lineTo(nodes[j].x / 100 * W, nodes[j].y / 100 * H);
            ctx.strokeStyle = `rgba(34,211,238,${(1 - dist / 100) * 0.1})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x / 100 * W, n.y / 100 * H, n.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34,211,238,${0.2 + Math.sin(Date.now() * n.speed) * 0.15})`;
        ctx.fill();
      });
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#06060f]"
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height }); }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Cyan orbs */}
      {[["25%","30%",350],["70%","60%",300],["50%","20%",200]].map(([x,y,w],i) => (
        <div key={i} className="absolute rounded-full pointer-events-none"
          style={{ left:x, top:y, width:w, height:w, background:`radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 70%)`, filter:"blur(40px)",
            transform: `translate(${(mouse.x - 0.5) * -15}px, ${(mouse.y - 0.5) * -15}px)` }} />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 w-full">
        <nav className="absolute top-6 md:top-8 left-0 right-0 flex items-center justify-between px-2"
          style={{ animation: loaded ? "fadeIn 1s ease 0.3s both" : "none" }}>
          <span className="text-cyan-400/80 text-sm font-semibold tracking-wider" style={{ fontFamily: "'Space Grotesk'" }}>quantum</span>
          <div className="hidden md:flex gap-8">
            {["Features","Pricing","Docs","Contact"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-white/20 text-xs tracking-[0.15em] uppercase hover:text-cyan-400/60 transition-colors">{l}</a>
            ))}
          </div>
        </nav>

        <div className="pt-28 md:pt-36 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-cyan-400/5 border border-cyan-400/10 rounded-full px-4 py-1.5 mb-6"
              style={{ animation: loaded ? "fadeSlideUp 0.6s ease 0.5s both" : "none" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-400/60 text-xs tracking-widest uppercase">Now in Beta</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95] mb-6"
              style={{ fontFamily: "'Space Grotesk'", animation: loaded ? "fadeSlideUp 0.8s ease 0.7s both" : "none" }}>
              <span className="text-white">Ship faster</span><br />
              <span className="text-white">with </span>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Quantum</span>
            </h1>

            <p className="text-white/30 text-sm md:text-base max-w-lg leading-relaxed mb-10"
              style={{ animation: loaded ? "fadeSlideUp 0.6s ease 1.2s both" : "none" }}>
              The developer platform that deploys your full-stack apps to the edge in seconds. Zero config. Infinite scale.
            </p>

            <div className="flex flex-col sm:flex-row gap-4"
              style={{ animation: loaded ? "fadeSlideUp 0.5s ease 1.5s both" : "none" }}>
              <a href="#pricing" className="px-10 py-4 text-sm tracking-[0.15em] uppercase font-medium rounded-lg bg-cyan-500 text-white hover:bg-cyan-400 transition-colors">
                Get Started Free
              </a>
              <a href="#features" className="px-10 py-4 text-white/25 text-sm tracking-[0.15em] uppercase border border-white/8 hover:border-white/20 rounded-lg transition-all">
                See Features
              </a>
            </div>
          </div>

          {/* Terminal */}
          <div className="hidden lg:block" style={{ animation: loaded ? "fadeSlideUp 1s ease 0.8s both" : "none" }}>
            <div className="bg-[#0a0a18] border border-white/5 rounded-2xl overflow-hidden" style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.4)" }}>
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="text-white/20 text-xs ml-2" style={{ fontFamily: "'JetBrains Mono'" }}>terminal</span>
              </div>
              <div className="p-5 min-h-[200px]" style={{ fontFamily: "'JetBrains Mono'" }}>
                {terminalLines.map((line, i) => (
                  <div key={i} className="text-xs mb-1.5"
                    style={{ color: line.startsWith("$") ? "#22d3ee" : line.startsWith("✓") ? "#4ade80" : line.startsWith("→") ? "#a78bfa" : "rgba(255,255,255,0.4)" }}>
                    {line}
                  </div>
                ))}
                <span className="inline-block w-2 h-4 bg-cyan-400/60" style={{ animation: "blink 1s infinite" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}