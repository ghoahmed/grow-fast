import { Link } from "react-router-dom";
import { Button } from "../ui";
import { Sparkles, Play, ArrowRight, Zap } from "lucide-react";

// Floating orb component for background ambience
function Orb({ className }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-20 pointer-events-none ${className}`}
    />
  );
}

// Animated generation card shown floating in the hero
function GenerationCard({ image, prompt, type, delay = "0s" }) {
  return (
    <div
      className="absolute glass rounded-2xl p-3 shadow-2xl shadow-black/40 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
      style={{
        animation: `float 6s ease-in-out ${delay} infinite alternate`,
      }}
    >
      <div className="w-28 h-20 rounded-xl bg-gradient-to-br from-purple-600/30 to-pink-500/20 overflow-hidden relative">
        {image ? (
          <img
            src={image}
            alt={prompt}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {type === "video" ? (
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Play size={14} className="text-white ml-0.5" />
              </div>
            ) : (
              <Sparkles size={20} className="text-purple-300" />
            )}
          </div>
        )}
        <div className="absolute top-1.5 right-1.5">
          <span
            className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${type === "video" ? "bg-pink-500/80 text-white" : "bg-purple-500/80 text-white"}`}
          >
            {type === "video" ? "VIDEO" : "IMAGE"}
          </span>
        </div>
      </div>
      <p className="text-[10px] text-slate-400 mt-2 max-w-[110px] leading-tight truncate">
        {prompt}
      </p>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16">
      {/* Background orbs */}
      <Orb className="w-[600px] h-[600px] bg-purple-600 -top-32 -left-32" />
      <Orb className="w-[500px] h-[500px] bg-pink-600 top-1/2 -right-48" />
      <Orb className="w-[400px] h-[400px] bg-indigo-600 bottom-0 left-1/3" />

      {/* Grid texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating generation cards — desktop only */}
      <div className="hidden lg:block">
        <GenerationCard
          prompt="Neon city at midnight, cinematic"
          type="image"
          delay="0s"
          image=""
          style={{ top: "22%", left: "7%" }}
        />
        <style>{`
          @keyframes float {
            from { transform: translateY(0px); }
            to   { transform: translateY(-18px); }
          }
          .float-card-1 { top: 22%; left: 7%; }
          .float-card-2 { top: 55%; left: 4%; }
          .float-card-3 { top: 18%; right: 7%; }
          .float-card-4 { top: 58%; right: 5%; }
        `}</style>
        <div
          className="float-card-1 absolute glass rounded-2xl p-3 shadow-2xl shadow-black/40 border border-white/10"
          style={{ animation: "float 6s ease-in-out 0s infinite alternate" }}
        >
          <div className="w-28 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-purple-600/40 to-pink-500/30 flex items-center justify-center">
            <Sparkles size={22} className="text-purple-300" />
          </div>
          <p className="text-[10px] text-slate-400 mt-2 max-w-[110px] leading-tight">
            Neon city at midnight
          </p>
          <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-purple-500/80 text-white mt-1 inline-block">
            IMAGE
          </span>
        </div>
        <div
          className="float-card-2 absolute glass rounded-2xl p-3 shadow-2xl shadow-black/40 border border-white/10"
          style={{ animation: "float 7s ease-in-out 1s infinite alternate" }}
        >
          <div className="w-28 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-pink-600/40 to-orange-500/30 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Play size={14} className="text-white ml-0.5" />
            </div>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 max-w-[110px] leading-tight">
            Aerial ocean drone shot
          </p>
          <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-pink-500/80 text-white mt-1 inline-block">
            VIDEO
          </span>
        </div>
        <div
          className="float-card-3 absolute glass rounded-2xl p-3 shadow-2xl shadow-black/40 border border-white/10"
          style={{
            animation: "float 5.5s ease-in-out 0.5s infinite alternate",
          }}
        >
          <div className="w-28 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-indigo-600/40 to-cyan-500/30 flex items-center justify-center">
            <Sparkles size={22} className="text-indigo-300" />
          </div>
          <p className="text-[10px] text-slate-400 mt-2 max-w-[110px] leading-tight">
            Futuristic robot portrait
          </p>
          <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-purple-500/80 text-white mt-1 inline-block">
            IMAGE
          </span>
        </div>
        <div
          className="float-card-4 absolute glass rounded-2xl p-3 shadow-2xl shadow-black/40 border border-white/10"
          style={{ animation: "float 8s ease-in-out 1.5s infinite alternate" }}
        >
          <div className="w-28 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-emerald-600/40 to-teal-500/30 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Play size={14} className="text-white ml-0.5" />
            </div>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 max-w-[110px] leading-tight">
            Looping forest timelapse
          </p>
          <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-pink-500/80 text-white mt-1 inline-block">
            VIDEO
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto page-enter">
        {/* Label badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold tracking-widest uppercase mb-6">
          <Zap size={12} className="text-purple-400" />
          AI-Powered Generation · Beta
        </div>

        {/* Headline */}
        <h1
          className="text-5xl md:text-7xl font-bold leading-[1.05] mb-6 tracking-tight"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Turn words into{" "}
          <span className="relative inline-block">
            <span className="gradient-text">stunning visuals</span>
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 300 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 9C60 3 120 1 150 4C180 7 240 9 298 5"
                stroke="url(#underline-grad)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="underline-grad"
                  x1="0"
                  y1="0"
                  x2="300"
                  y2="0"
                >
                  <stop stopColor="#a78bfa" />
                  <stop offset="1" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
          </span>{" "}
          in seconds
        </h1>

        {/* Sub */}
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Generate breathtaking images and cinematic videos from a single
          prompt. Powered by the latest AI models — no design skills needed.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link to="/register">
            <Button
              variant="accent"
              size="lg"
              className="hover-glow w-full sm:w-auto"
            >
              <Sparkles size={18} />
              Generate for free
              <ArrowRight size={16} />
            </Button>
          </Link>
          <a href="#gallery">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              <Play size={16} />
              See examples
            </Button>
          </a>
        </div>

        {/* Social proof */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="flex -space-x-2">
              {[
                "bg-purple-500",
                "bg-pink-500",
                "bg-indigo-500",
                "bg-emerald-500",
              ].map((c, i) => (
                <span
                  key={i}
                  className={`w-6 h-6 rounded-full ${c} border-2 border-[#0F172A] flex items-center justify-center text-[9px] font-bold text-white`}
                >
                  {["A", "B", "C", "D"][i]}
                </span>
              ))}
            </span>
            <span>12,000+ creators</span>
          </span>
          <span className="w-px h-4 bg-white/10" />
          <span>⭐ 4.9 / 5 rating</span>
          <span className="w-px h-4 bg-white/10" />
          <span>2M+ assets generated</span>
        </div>
      </div>

      {/* Preview window */}
      <div className="relative z-10 mt-16 w-full max-w-5xl mx-auto">
        <div className="glass rounded-3xl border border-white/10 p-1 shadow-2xl shadow-black/40">
          {/* Window chrome */}
          <div className="bg-[#1E293B]/80 rounded-[22px] p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-amber-500/60" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
              <div className="flex-1 mx-4 bg-white/5 rounded-lg px-4 py-1.5 text-xs text-slate-500 text-center">
                app.GrowFast.io/generate
              </div>
            </div>
            {/* Mock generation UI */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Prompt area */}
              <div className="space-y-3">
                <div className="bg-[#0F172A]/60 rounded-xl p-4 border border-white/5">
                  <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider">
                    Prompt
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    "A lone astronaut standing on a crimson alien planet, twin
                    moons rising on the horizon, god rays through violet clouds,
                    cinematic lighting, ultra-detailed"
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Style", value: "Cinematic" },
                    { label: "Ratio", value: "16:9" },
                    { label: "Quality", value: "Ultra HD" },
                    { label: "Type", value: "Image" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="bg-[#0F172A]/40 rounded-xl p-3 border border-white/5"
                    >
                      <p className="text-[10px] text-slate-500 mb-1">
                        {s.label}
                      </p>
                      <p className="text-xs font-medium text-slate-300">
                        {s.value}
                      </p>
                    </div>
                  ))}
                </div>
                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-purple-900/30">
                  <Sparkles size={14} />
                  Generate
                </button>
              </div>
              {/* Output grid */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  "from-purple-600/40 to-indigo-600/30",
                  "from-pink-600/40 to-purple-600/30",
                  "from-indigo-600/40 to-cyan-600/30",
                  "from-amber-600/40 to-pink-600/30",
                ].map((grad, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-xl bg-gradient-to-br ${grad} border border-white/5 flex items-center justify-center relative overflow-hidden`}
                  >
                    <Sparkles size={20} className="text-white/30" />
                    {i === 0 && (
                      <div className="absolute inset-0 border-2 border-purple-500/60 rounded-xl" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
