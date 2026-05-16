import { colorMap, features, stats } from "../../constants";
import { Badge, SectionTitle } from "../ui";

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-32 px-6 overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionTitle
          label="Features"
          title="Everything you need to create"
          subtitle="A complete creative AI platform. From quick concept images to full cinematic videos — all from one dashboard."
        />

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((s) => (
            <div
              key={s.label}
              className="glass rounded-2xl p-5 flex items-center gap-4 border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                <s.icon size={18} className="text-purple-400" />
              </div>
              <div>
                <p
                  className="text-lg font-bold text-[#F8FAFC]"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {s.value}
                </p>
                <p className="text-xs text-slate-500">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => {
            const c = colorMap[f.color] || colorMap.purple;
            return (
              <div
                key={f.title}
                className={`group relative bg-[#1E293B] border border-white/5 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl ${c.glow} ${c.border} hover:-translate-y-1 cursor-default`}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className={`${c.bg} rounded-xl p-3`}>
                    <f.icon size={22} className={c.text} />
                  </div>
                  <Badge variant={c.badge}>{f.badge}</Badge>
                </div>
                <h3
                  className="text-lg font-bold text-[#F8FAFC] mb-2"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {f.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {f.description}
                </p>

                {/* Hover accent line */}
                <div
                  className={`absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent ${c.text.replace("text-", "via-")} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
