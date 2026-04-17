const properties = [
  { title: "Skyline Penthouse", location: "Manhattan, NY", price: "$12.5M", beds: 4, image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop" },
  { title: "Oceanfront Villa", location: "Malibu, CA", price: "$28M", beds: 6, image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop" },
  { title: "Modern Estate", location: "Beverly Hills, CA", price: "$18.9M", beds: 5, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop" },
  { title: "Lake House", location: "Lake Tahoe, NV", price: "$8.2M", beds: 4, image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop" },
];

export default function Properties() {
  return (
    <section id="properties" className="py-20 md:py-32 px-6 md:px-8 bg-[#0a0c0e]">
      <div className="max-w-6xl mx-auto">
        <p className="text-[#d4af37]/50 text-xs uppercase tracking-[0.4em] mb-3">Featured</p>
        <h2 className="text-3xl md:text-5xl mb-12 md:mb-16" style={{ fontFamily: "'Playfair Display'" }}>
          <span className="text-white">Exclusive </span><span className="italic text-[#d4af37]">Listings</span>
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {properties.map((p, i) => (
            <div key={i} className="group relative rounded-2xl overflow-hidden border border-white/5 hover:border-[#d4af37]/15 transition-all duration-500 cursor-pointer">
              <div className="aspect-[3/2] overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#080a0c] via-[#080a0c]/30 to-transparent" />
              <div className="absolute top-4 right-4 bg-[#d4af37]/10 backdrop-blur-sm border border-[#d4af37]/20 rounded-lg px-3 py-1">
                <span className="text-[#d4af37] text-xs font-bold">{p.price}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-white mb-1 group-hover:text-[#d4af37] transition-colors" style={{ fontFamily: "'Playfair Display'" }}>{p.title}</h3>
                <p className="text-white/30 text-xs">{p.location} &middot; {p.beds} Bedrooms</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}