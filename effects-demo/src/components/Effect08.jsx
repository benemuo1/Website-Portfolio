const CURTAINS = [
  { left: "5%",  width: "18%", color1: "0,255,150",   color2: "0,200,255",  delay: "0s",    duration: "7s",  skew: -3 },
  { left: "18%", width: "14%", color1: "100,255,200", color2: "50,150,255", delay: "1.2s",  duration: "9s",  skew: 2  },
  { left: "30%", width: "20%", color1: "150,50,255",  color2: "0,255,180",  delay: "0.5s",  duration: "6s",  skew: -2 },
  { left: "48%", width: "16%", color1: "0,200,255",   color2: "180,50,255", delay: "2s",    duration: "8s",  skew: 4  },
  { left: "62%", width: "22%", color1: "50,255,150",  color2: "100,50,255", delay: "0.8s",  duration: "7.5s",skew: -1 },
  { left: "78%", width: "15%", color1: "0,255,200",   color2: "200,100,255",delay: "1.8s",  duration: "6.5s",skew: 3  },
];

export default function Effect08() {
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#010a14]">
      {/* Stars */}
      {Array.from({ length: 80 }, (_, i) => (
        <div key={i} className="absolute rounded-full bg-white"
          style={{
            left: `${(i * 37.3) % 100}%`, top: `${(i * 61.7) % 100}%`,
            width: (i % 3) + 1, height: (i % 3) + 1,
            opacity: (i % 5) * 0.15 + 0.1,
          }}
        />
      ))}
      {/* Aurora curtains */}
      {CURTAINS.map((c, i) => (
        <div key={i} className="absolute top-0 pointer-events-none"
          style={{
            left: c.left, width: c.width, height: "75%",
            background: `linear-gradient(to bottom, transparent 0%, rgba(${c.color1},0.6) 20%, rgba(${c.color2},0.4) 60%, transparent 100%)`,
            filter: "blur(12px)",
            animation: `auroraWave${i % 2 === 0 ? "" : "2"} ${c.duration} ease-in-out ${c.delay} infinite`,
            transformOrigin: "top center",
            mixBlendMode: "screen",
          }}
        />
      ))}
      {/* Ground glow */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,80,60,0.3), transparent)", filter: "blur(10px)" }}
      />
      <div className="absolute inset-0 flex items-end justify-center pb-6">
        <p className="text-white/30 text-xs tracking-widest uppercase">Aurora Borealis</p>
      </div>
    </div>
  );
}