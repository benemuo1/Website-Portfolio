export default function CardEffect22() {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)" }}>
      {[["20%","20%",80],["70%","60%",120],["40%","70%",60]].map(([x,y,s],i) => (
        <div key={i} className="absolute rounded-full"
          style={{ left:x, top:y, width:s, height:s, background:"rgba(255,255,255,0.2)", filter:"blur(20px)" }} />
      ))}
      <div className="relative rounded-2xl p-6 w-48 text-center"
        style={{
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        }}>
        <div className="w-12 h-12 rounded-full bg-white/20 mx-auto mb-3 flex items-center justify-center">
          <span className="text-white text-xl">✦</span>
        </div>
        <p className="text-white font-bold text-sm mb-1">Glassmorphism</p>
        <p className="text-white/60 text-xs">Frosted glass effect</p>
      </div>
    </div>
  );
}