import { useState } from "react";

export default function CardEffect26() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 600);
  };

  return (
    <div className="w-full h-full bg-[#050510] flex items-center justify-center">
      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleClick}
        className="relative px-10 py-4 rounded-full font-bold text-white overflow-hidden cursor-pointer select-none"
        style={{ border: "2px solid #6366f1", background: "transparent" }}>
        <span className="relative z-10" style={{ color: hovered ? "white" : "#6366f1", transition: "color 0.4s" }}>
          Liquid Fill
        </span>
        {/* Liquid blob */}
        <div className="absolute pointer-events-none"
          style={{
            left: "50%", bottom: hovered ? "-10%" : "-120%",
            width: hovered ? "200%" : "0%",
            paddingBottom: hovered ? "200%" : "0%",
            transform: "translateX(-50%)",
            background: "#6366f1",
            borderRadius: clicked ? "40%" : "50%",
            transition: "bottom 0.5s cubic-bezier(0.4,0,0.2,1), width 0.5s, padding-bottom 0.5s, border-radius 0.2s",
          }} />
      </button>
    </div>
  );
}