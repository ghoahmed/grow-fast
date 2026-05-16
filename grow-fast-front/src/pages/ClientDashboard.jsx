import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { StatCard, Badge, Card } from "../components/ui";
import {
  Sparkles,
  ImageIcon,
  Film,
  Play,
  ArrowRight,
  RotateCcw,
  Download,
  Trash2,
  ChevronRight,
} from "lucide-react";
import { CLIENT_STATS, RECENT_GENERATIONS, USAGE_HISTORY } from "../constants";

// ── Shared style helpers ──────────────────────────────────────────────────

const STYLES = [
  "Cinematic",
  "Photorealistic",
  "Anime",
  "Fantasy",
  "Abstract",
  "Portrait",
  "Sci-fi",
  "Nature",
];
const RATIOS = ["1:1", "16:9", "9:16", "4:3", "3:4"];

// ── Mini bar chart using plain divs ──────────────────────────────────────

function UsageBar({ data }) {
  const max = Math.max(...data.map((d) => d.credits));
  return (
    <div className="flex items-end gap-2 h-28">
      {data.map((d) => (
        <div key={d.date} className="flex-1 flex flex-col items-center gap-1.5">
          <div
            className="w-full rounded-t-md bg-gradient-to-t from-purple-600/60 to-purple-400/40 transition-all duration-500"
            style={{ height: `${(d.credits / max) * 100}%` }}
          />
          <span className="text-[9px] text-slate-500 rotate-0">
            {d.date.replace("May ", "")}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Generation card ───────────────────────────────────────────────────────

function GenCard({ item }) {
  return (
    <div className="group relative bg-[#1E293B] border border-white/5 rounded-2xl overflow-hidden hover:border-white/15 transition-all duration-200 hover:-translate-y-0.5">
      {/* Thumbnail */}
      <div
        className={`h-36 bg-gradient-to-br ${item.grad} flex items-center justify-center relative`}
      >
        {item.type === "video" ? (
          <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
            <Play size={16} className="text-white ml-0.5" />
          </div>
        ) : (
          <ImageIcon size={24} className="text-white/20" />
        )}
        {item.status === "processing" && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-[10px] text-purple-300 font-medium">
                Processing…
              </span>
            </div>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <span
            className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${item.type === "video" ? "bg-pink-500/80 text-white" : "bg-purple-500/80 text-white"}`}
          >
            {item.type.toUpperCase()}
          </span>
        </div>
        {/* Hover actions */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button className="w-8 h-8 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl flex items-center justify-center transition-colors">
            <Download size={13} className="text-white" />
          </button>
          <button className="w-8 h-8 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl flex items-center justify-center transition-colors">
            <RotateCcw size={13} className="text-white" />
          </button>
          <button className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 border border-red-500/20 rounded-xl flex items-center justify-center transition-colors">
            <Trash2 size={13} className="text-red-400" />
          </button>
        </div>
      </div>
      {/* Info */}
      <div className="p-3">
        <p className="text-xs text-slate-300 leading-snug line-clamp-2 mb-2">
          {item.prompt}
        </p>
        <div className="flex items-center justify-between">
          <Badge variant="default">{item.style}</Badge>
          <span className="text-[10px] text-slate-600">{item.time}</span>
        </div>
      </div>
    </div>
  );
}

// ── Quick Generate panel ──────────────────────────────────────────────────

function QuickGenerate({ type = "image" }) {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Cinematic");
  const [ratio, setRatio] = useState("16:9");
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    setTimeout(() => setGenerating(false), 3000);
  };

  return (
    <Card gradient className="space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center">
          {type === "image" ? (
            <ImageIcon size={16} className="text-purple-400" />
          ) : (
            <Film size={16} className="text-purple-400" />
          )}
        </div>
        <h3
          className="font-semibold text-[#F8FAFC]"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Generate {type === "image" ? "Image" : "Video"}
        </h3>
      </div>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={`Describe the ${type} you want to create…`}
        rows={3}
        className="w-full bg-[#0F172A]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 resize-none focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
      />

      <div className="grid grid-cols-2 gap-3">
        {/* Style */}
        <div>
          <label className="text-xs text-slate-500 mb-1.5 block">Style</label>
          <div className="flex flex-wrap gap-1.5">
            {STYLES.slice(0, 4).map((s) => (
              <button
                key={s}
                onClick={() => setStyle(s)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${style === s ? "bg-purple-600 text-white" : "bg-white/5 text-slate-400 hover:bg-white/10"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        {/* Ratio */}
        <div>
          <label className="text-xs text-slate-500 mb-1.5 block">
            Aspect Ratio
          </label>
          <div className="flex flex-wrap gap-1.5">
            {RATIOS.map((r) => (
              <button
                key={r}
                onClick={() => setRatio(r)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${ratio === r ? "bg-purple-600 text-white" : "bg-white/5 text-slate-400 hover:bg-white/10"}`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={!prompt.trim() || generating}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-purple-900/30 hover:shadow-purple-800/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {generating ? (
          <>
            <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            Generating…
          </>
        ) : (
          <>
            <Sparkles size={15} />
            Generate · 3 credits
          </>
        )}
      </button>
    </Card>
  );
}

// ── Views ─────────────────────────────────────────────────────────────────

function DashboardHome({ setActiveId }) {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {CLIENT_STATS.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setActiveId("generate-image")}
          className="group glass border border-white/10 hover:border-purple-500/30 rounded-2xl p-5 text-left transition-all duration-200 hover:shadow-lg hover:shadow-purple-900/10"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center mb-3 group-hover:bg-purple-500/25 transition-colors">
            <ImageIcon size={20} className="text-purple-400" />
          </div>
          <p className="font-semibold text-[#F8FAFC] text-sm mb-1">
            Generate Image
          </p>
          <p className="text-xs text-slate-500">From 3 credits · Up to 4K</p>
          <div className="flex items-center gap-1 mt-3 text-purple-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Start now <ArrowRight size={12} />
          </div>
        </button>
        <button
          onClick={() => setActiveId("generate-video")}
          className="group glass border border-white/10 hover:border-pink-500/30 rounded-2xl p-5 text-left transition-all duration-200 hover:shadow-lg hover:shadow-pink-900/10"
        >
          <div className="w-10 h-10 rounded-xl bg-pink-500/15 flex items-center justify-center mb-3 group-hover:bg-pink-500/25 transition-colors">
            <Film size={20} className="text-pink-400" />
          </div>
          <p className="font-semibold text-[#F8FAFC] text-sm mb-1">
            Generate Video
          </p>
          <p className="text-xs text-slate-500">From 10 credits · Up to 60s</p>
          <div className="flex items-center gap-1 mt-3 text-pink-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Start now <ArrowRight size={12} />
          </div>
        </button>
      </div>

      {/* Recent + Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2
              className="font-semibold text-[#F8FAFC]"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Recent Generations
            </h2>
            <button
              onClick={() => setActiveId("my-generations")}
              className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
            >
              View all <ChevronRight size={12} />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {RECENT_GENERATIONS.slice(0, 6).map((item, i) => (
              <GenCard key={i} item={item} />
            ))}
          </div>
        </div>

        {/* Usage */}
        <div className="space-y-4">
          <h2
            className="font-semibold text-[#F8FAFC]"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Credits Used (7d)
          </h2>
          <Card>
            <UsageBar data={USAGE_HISTORY} />
            <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-lg font-bold text-[#F8FAFC]">402</p>
                <p className="text-[10px] text-slate-500">Total credits</p>
              </div>
              <div>
                <p className="text-lg font-bold text-pink-400">88</p>
                <p className="text-[10px] text-slate-500">Images</p>
              </div>
              <div>
                <p className="text-lg font-bold text-amber-400">21</p>
                <p className="text-[10px] text-slate-500">Videos</p>
              </div>
            </div>
          </Card>

          {/* Credit status */}
          <Card>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-300">
                Monthly credits
              </span>
              <span className="text-xs text-slate-500">Pro plan</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-2 mb-2">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                style={{ width: "29%" }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>580 used</span>
              <span>1,420 left of 2,000</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function GenerateView({ type }) {
  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h2
          className="text-xl font-bold text-[#F8FAFC] mb-1"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Generate {type === "image" ? "Image" : "Video"}
        </h2>
        <p className="text-sm text-slate-400">
          Describe what you want and let AI do the rest.
        </p>
      </div>
      <QuickGenerate type={type} />
      {/* Style presets */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-slate-300 mb-3">
          All style presets
        </h3>
        <div className="flex flex-wrap gap-2">
          {STYLES.map((s) => (
            <span
              key={s}
              className="px-3 py-1.5 rounded-xl text-xs font-medium bg-white/5 border border-white/8 text-slate-400 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function MyGenerationsView() {
  const [filter, setFilter] = useState("all");
  const filtered =
    filter === "all"
      ? RECENT_GENERATIONS
      : RECENT_GENERATIONS.filter((g) => g.type === filter);
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2
          className="text-xl font-bold text-[#F8FAFC]"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          My Generations
        </h2>
        <div className="flex gap-1 bg-white/5 border border-white/8 rounded-xl p-1">
          {["all", "image", "video"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${filter === f ? "bg-purple-600 text-white shadow" : "text-slate-400 hover:text-white"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((item, i) => (
          <GenCard key={i} item={item} />
        ))}
      </div>
    </div>
  );
}

function HistoryView() {
  return (
    <div>
      <h2
        className="text-xl font-bold text-[#F8FAFC] mb-5"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        Usage History
      </h2>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {["Date", "Images", "Videos", "Credits Used"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {USAGE_HISTORY.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-white/5 hover:bg-white/2 transition-colors"
                >
                  <td className="px-4 py-3 text-sm text-slate-300">
                    {row.date}
                  </td>
                  <td className="px-4 py-3 text-sm text-purple-400 font-medium">
                    {row.images}
                  </td>
                  <td className="px-4 py-3 text-sm text-pink-400 font-medium">
                    {row.videos}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 max-w-[80px] bg-white/5 rounded-full h-1.5">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                          style={{ width: `${(row.credits / 110) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-slate-300 font-medium">
                        {row.credits}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function BillingView() {
  return (
    <div className="max-w-2xl space-y-6">
      <h2
        className="text-xl font-bold text-[#F8FAFC]"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        Billing & Credits
      </h2>
      {/* Current plan */}
      <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/10 border border-purple-500/30 rounded-2xl p-6">
        <div className="flex items-start justify-between">
          <div>
            <Badge variant="purple">Current Plan</Badge>
            <h3
              className="text-2xl font-bold text-[#F8FAFC] mt-2 mb-1"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Pro · $29/mo
            </h3>
            <p className="text-sm text-slate-400">Renews June 15, 2026</p>
          </div>
          <button className="px-4 py-2 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-500 transition-colors">
            Upgrade
          </button>
        </div>
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-400">Monthly credits</span>
            <span className="text-slate-200 font-medium">580 / 2,000 used</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
              style={{ width: "29%" }}
            />
          </div>
        </div>
      </div>
      {/* Quick buy */}
      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-3">
          Buy extra credits
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { credits: 100, price: 4 },
            { credits: 500, price: 18 },
            { credits: 1500, price: 49 },
          ].map((p) => (
            <button
              key={p.credits}
              className="p-4 rounded-2xl border border-white/5 bg-[#1E293B] hover:border-purple-500/30 hover:bg-purple-500/5 transition-all text-center"
            >
              <p
                className="text-lg font-bold text-[#F8FAFC]"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {p.credits}
              </p>
              <p className="text-xs text-slate-500 mb-2">credits</p>
              <p className="text-sm font-semibold text-purple-400">
                ${p.price}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlaceholderView({ title }) {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-4">
          <Sparkles size={24} className="text-purple-400" />
        </div>
        <h3 className="font-semibold text-[#F8FAFC] mb-1">{title}</h3>
        <p className="text-sm text-slate-500">This section is coming soon.</p>
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────

const VIEW_TITLES = {
  dashboard: "Dashboard",
  "generate-image": "Generate Image",
  "generate-video": "Generate Video",
  "my-generations": "My Generations",
  history: "History",
  billing: "Billing & Credits",
  settings: "Settings",
};

const ClientDashboard = () => {
  const [activeId, setActiveId] = useState("dashboard");

  const renderView = () => {
    switch (activeId) {
      case "dashboard":
        return <DashboardHome setActiveId={setActiveId} />;
      case "generate-image":
        return <GenerateView type="image" />;
      case "generate-video":
        return <GenerateView type="video" />;
      case "my-generations":
        return <MyGenerationsView />;
      case "history":
        return <HistoryView />;
      case "billing":
        return <BillingView />;
      default:
        return <PlaceholderView title={VIEW_TITLES[activeId] || activeId} />;
    }
  };

  return (
    <DashboardLayout
      role="user"
      title={VIEW_TITLES[activeId] || "Dashboard"}
      defaultActive={activeId}
      activeId={activeId}
      setActiveId={setActiveId}
    >
      {renderView()}
    </DashboardLayout>
  );
};

export default ClientDashboard;
