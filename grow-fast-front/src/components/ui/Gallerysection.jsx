import { useState } from "react";
import { Badge, SectionTitle } from "../ui";
import { Play, ImageIcon } from "lucide-react";
import { accentColors, items } from "../../constants";

function GalleryItem({ item, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative ${item.span} rounded-2xl overflow-hidden cursor-pointer group border border-white/5 hover:border-white/20 transition-all duration-300`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Simulated generated image */}
      <div
        className={`w-full h-full min-h-[140px] ${accentColors[index]} flex items-center justify-center relative`}
      >
        {/* Decorative noise/grain */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at ${20 + index * 15}% ${30 + index * 10}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
          }}
        />

        {/* Center icon */}
        <div
          className={`transition-all duration-300 ${hovered ? "scale-110 opacity-60" : "opacity-30"}`}
        >
          {item.type === "video" ? (
            <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
              <Play size={24} className="text-white ml-1" />
            </div>
          ) : (
            <ImageIcon size={32} className="text-white" />
          )}
        </div>

        {/* Hover overlay */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}
        />

        {/* Info on hover */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 ${hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
        >
          <p className="text-white text-xs font-medium leading-snug mb-2 line-clamp-2">
            {item.prompt}
          </p>
          <div className="flex items-center gap-2">
            <Badge variant={item.type === "video" ? "pink" : "purple"}>
              {item.type === "video" ? "VIDEO" : "IMAGE"}
            </Badge>
            <Badge variant="default">{item.style}</Badge>
          </div>
        </div>

        {/* Type badge top right */}
        <div className="absolute top-3 right-3">
          <span
            className={`text-[10px] font-bold px-2 py-1 rounded-full border ${item.type === "video" ? "bg-pink-500/20 border-pink-500/40 text-pink-300" : "bg-purple-500/20 border-purple-500/40 text-purple-300"}`}
          >
            {item.type === "video" ? "▶ VIDEO" : "◆ IMAGE"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function GallerySection() {
  return (
    <section id="gallery" className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          label="Gallery"
          title="See what's possible"
          subtitle="A glimpse of what creators are generating on GrowFast every day. All made with simple text prompts."
        />

        {/* Masonry-style grid */}
        <div className="grid grid-cols-3 grid-rows-3 gap-4 h-[640px]">
          {items.map((item, i) => (
            <GalleryItem key={i} item={item} index={i} />
          ))}
        </div>

        {/* CTA below gallery */}
        <div className="text-center mt-12">
          <p className="text-slate-400 text-sm mb-4">
            2,000,000+ generations and counting — join the community
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              "Cinematic",
              "Fantasy",
              "Photorealistic",
              "Abstract",
              "Anime",
              "Nature",
              "Sci-fi",
              "Portrait",
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
