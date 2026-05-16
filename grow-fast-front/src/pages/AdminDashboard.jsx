import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { StatCard, Badge, Card, Avatar } from "../components/ui";
import {
  Sparkles,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Activity,
  Eye,
  Ban,
} from "lucide-react";
import {
  ADMIN_STATS,
  RECENT_USERS,
  MODERATION_QUEUE,
  SYSTEM_HEALTH,
} from "../constants";

// ── Mini sparkline ────────────────────────────────────────────────────────

const SPARKLINE = [42, 65, 55, 78, 91, 84, 110, 98, 125, 148, 132, 162];

function Sparkline({ color = "purple" }) {
  const max = Math.max(...SPARKLINE);
  const min = Math.min(...SPARKLINE);
  const norm = (v) => ((v - min) / (max - min)) * 100;
  const pts = SPARKLINE.map(
    (v, i) => `${(i / (SPARKLINE.length - 1)) * 100},${100 - norm(v)}`,
  ).join(" ");
  return (
    <svg
      viewBox="0 0 100 40"
      className="w-full h-10 overflow-visible"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={`sg-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="0%"
            stopColor={color === "purple" ? "#a78bfa" : "#f472b6"}
            stopOpacity="0.3"
          />
          <stop
            offset="100%"
            stopColor={color === "purple" ? "#a78bfa" : "#f472b6"}
            stopOpacity="0"
          />
        </linearGradient>
      </defs>
      <polyline
        points={pts}
        fill="none"
        stroke={color === "purple" ? "#a78bfa" : "#f472b6"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

// ── Platform activity bar chart ───────────────────────────────────────────

const ACTIVITY_DATA = [
  { label: "Mon", gens: 5800 },
  { label: "Tue", gens: 7200 },
  { label: "Wed", gens: 6100 },
  { label: "Thu", gens: 8900 },
  { label: "Fri", gens: 10200 },
  { label: "Sat", gens: 9100 },
  { label: "Sun", gens: 7400 },
];

function ActivityChart() {
  const max = Math.max(...ACTIVITY_DATA.map((d) => d.gens));
  return (
    <div className="flex items-end gap-2 h-32 mt-2">
      {ACTIVITY_DATA.map((d, i) => (
        <div
          key={d.label}
          className="flex-1 flex flex-col items-center gap-1.5"
        >
          <div
            className="w-full rounded-t-lg bg-gradient-to-t from-purple-600/70 to-pink-500/40 transition-all duration-700"
            style={{
              height: `${(d.gens / max) * 100}%`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
          <span className="text-[9px] text-slate-500">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

// ── Plan distribution donut (SVG) ─────────────────────────────────────────

function PlanDonut() {
  const plans = [
    { label: "Pro", pct: 47, color: "#a78bfa" },
    { label: "Free", pct: 38, color: "#334155" },
    { label: "Ent.", pct: 15, color: "#f472b6" },
  ];
  let offset = 0;
  const r = 36;
  const circ = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-6">
      <svg width="96" height="96" viewBox="0 0 96 96">
        <circle
          cx="48"
          cy="48"
          r={r}
          fill="none"
          stroke="#1e293b"
          strokeWidth="14"
        />
        {plans.map((p) => {
          const dash = (p.pct / 100) * circ;
          const gap = circ - dash;
          const el = (
            <circle
              key={p.label}
              cx="48"
              cy="48"
              r={r}
              fill="none"
              stroke={p.color}
              strokeWidth="14"
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
              style={{
                transformOrigin: "48px 48px",
                transform: "rotate(-90deg)",
              }}
            />
          );
          offset += dash;
          return el;
        })}
        <text
          x="48"
          y="52"
          textAnchor="middle"
          fill="#f8fafc"
          fontSize="13"
          fontWeight="700"
        >
          Users
        </text>
      </svg>
      <div className="space-y-2">
        {plans.map((p) => (
          <div key={p.label} className="flex items-center gap-2 text-xs">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ background: p.color }}
            />
            <span className="text-slate-400">{p.label}</span>
            <span className="text-slate-200 font-semibold ml-auto">
              {p.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Views ─────────────────────────────────────────────────────────────────

function AdminHome({ setActiveId }) {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {ADMIN_STATS.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-1">
            <h3
              className="font-semibold text-[#F8FAFC]"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Weekly Generations
            </h3>
            <Badge variant="purple">↑ 18%</Badge>
          </div>
          <p className="text-xs text-slate-500 mb-2">
            Total platform generations this week
          </p>
          <ActivityChart />
        </Card>

        {/* Plan split */}
        <Card>
          <h3
            className="font-semibold text-[#F8FAFC] mb-4"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Plan Distribution
          </h3>
          <PlanDonut />
          <div className="mt-4 pt-4 border-t border-white/5 text-center">
            <p
              className="text-2xl font-bold text-[#F8FAFC]"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              12,847
            </p>
            <p className="text-xs text-slate-500">Total registered users</p>
          </div>
        </Card>
      </div>

      {/* Trend cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-2">
            <h3
              className="font-semibold text-[#F8FAFC]"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Revenue (30d)
            </h3>
            <span className="text-xs text-emerald-400 font-semibold">
              +18% MoM
            </span>
          </div>
          <p
            className="text-3xl font-bold text-[#F8FAFC] mb-2"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            $84,320
          </p>
          <Sparkline color="purple" />
        </Card>
        <Card>
          <div className="flex items-center justify-between mb-2">
            <h3
              className="font-semibold text-[#F8FAFC]"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              New Users (30d)
            </h3>
            <span className="text-xs text-emerald-400 font-semibold">
              +12% MoM
            </span>
          </div>
          <p
            className="text-3xl font-bold text-[#F8FAFC] mb-2"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            1,284
          </p>
          <Sparkline color="pink" />
        </Card>
      </div>

      {/* Recent users + moderation preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent users */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3
              className="font-semibold text-[#F8FAFC]"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Recent Users
            </h3>
            <button
              onClick={() => setActiveId("users")}
              className="text-xs text-purple-400 hover:text-purple-300"
            >
              View all →
            </button>
          </div>
          <Card className="p-0 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  {["User", "Plan", "Generations", "Status"].map((h) => (
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
                {RECENT_USERS.slice(0, 5).map((u, i) => (
                  <tr
                    key={i}
                    className="border-b border-white/5 hover:bg-white/2 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={u.name} size="sm" />
                        <div>
                          <p className="text-sm font-medium text-slate-200">
                            {u.name}
                          </p>
                          <p className="text-xs text-slate-500">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={
                          u.plan === "Pro"
                            ? "purple"
                            : u.plan === "Enterprise"
                              ? "pink"
                              : "default"
                        }
                      >
                        {u.plan}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-300">
                      {u.gens.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-medium ${u.status === "active" ? "text-emerald-400" : "text-red-400"}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${u.status === "active" ? "bg-emerald-400" : "bg-red-400"}`}
                        />
                        {u.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        {/* Moderation preview */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3
              className="font-semibold text-[#F8FAFC]"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Moderation Queue
            </h3>
            <button
              onClick={() => setActiveId("moderation")}
              className="text-xs text-purple-400 hover:text-purple-300"
            >
              View all →
            </button>
          </div>
          <div className="space-y-2">
            {MODERATION_QUEUE.slice(0, 4).map((item, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl border transition-colors ${item.urgent ? "border-red-500/20 bg-red-500/5" : "border-white/5 bg-[#1E293B]"}`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-xs text-slate-300 line-clamp-1 flex-1">
                    {item.prompt}
                  </p>
                  {item.urgent && (
                    <AlertTriangle
                      size={12}
                      className="text-red-400 flex-shrink-0 mt-0.5"
                    />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="red">{item.flag}</Badge>
                  <span className="text-[10px] text-slate-500">
                    {item.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function UsersView() {
  const [search, setSearch] = useState("");
  const filtered = RECENT_USERS.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2
          className="text-xl font-bold text-[#F8FAFC]"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Users
        </h2>
        <div className="flex items-center gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users…"
            className="bg-[#0F172A]/60 border border-white/10 rounded-xl px-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/40 w-52"
          />
        </div>
      </div>
      <Card className="p-0 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              {[
                "User",
                "Plan",
                "Joined",
                "Generations",
                "Status",
                "Actions",
              ].map((h) => (
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
            {filtered.map((u, i) => (
              <tr
                key={i}
                className="border-b border-white/5 hover:bg-white/2 transition-colors group"
              >
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={u.name} size="sm" />
                    <div>
                      <p className="text-sm font-medium text-slate-200">
                        {u.name}
                      </p>
                      <p className="text-xs text-slate-500">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <Badge
                    variant={
                      u.plan === "Pro"
                        ? "purple"
                        : u.plan === "Enterprise"
                          ? "pink"
                          : "default"
                    }
                  >
                    {u.plan}
                  </Badge>
                </td>
                <td className="px-4 py-3.5 text-sm text-slate-400">
                  {u.joined}
                </td>
                <td className="px-4 py-3.5 text-sm text-slate-300 font-medium">
                  {u.gens.toLocaleString()}
                </td>
                <td className="px-4 py-3.5">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-medium ${u.status === "active" ? "text-emerald-400" : "text-red-400"}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${u.status === "active" ? "bg-emerald-400" : "bg-red-400"}`}
                    />
                    {u.status}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                      <Eye size={13} />
                    </button>
                    <button className="w-7 h-7 rounded-lg bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center text-red-400 transition-colors">
                      <Ban size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function ModerationView() {
  const [items, setItems] = useState(MODERATION_QUEUE);
  const approve = (i) => setItems((prev) => prev.filter((_, idx) => idx !== i));
  const reject = (i) => setItems((prev) => prev.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2
          className="text-xl font-bold text-[#F8FAFC]"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Moderation Queue
        </h2>
        <Badge variant="red">{items.length} pending</Badge>
      </div>
      {items.length === 0 ? (
        <div className="flex items-center justify-center h-48">
          <div className="text-center">
            <CheckCircle size={32} className="text-emerald-400 mx-auto mb-3" />
            <p className="text-slate-300 font-medium">Queue is clear!</p>
            <p className="text-sm text-slate-500">No items awaiting review.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, i) => (
            <div
              key={i}
              className={`p-5 rounded-2xl border transition-all ${item.urgent ? "border-red-500/25 bg-red-500/5" : "border-white/8 bg-[#1E293B]"}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {item.urgent && (
                      <AlertTriangle size={14} className="text-red-400" />
                    )}
                    <Badge variant="red">{item.flag}</Badge>
                    <Badge variant={item.type === "video" ? "pink" : "purple"}>
                      {item.type}
                    </Badge>
                    <span className="text-xs text-slate-500">{item.time}</span>
                  </div>
                  <p className="text-sm text-slate-200 mb-1">{item.prompt}</p>
                  <p className="text-xs text-slate-500">
                    Reported by system · User:{" "}
                    <span className="text-slate-400 font-mono">
                      {item.user}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => approve(i)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-colors"
                  >
                    <CheckCircle size={13} /> Approve
                  </button>
                  <button
                    onClick={() => reject(i)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold hover:bg-red-500/20 transition-colors"
                  >
                    <XCircle size={13} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SystemView() {
  const statusColor = (s) =>
    s === "good"
      ? "text-emerald-400"
      : s === "warn"
        ? "text-amber-400"
        : "text-red-400";
  const statusBg = (s) =>
    s === "good"
      ? "bg-emerald-400"
      : s === "warn"
        ? "bg-amber-400"
        : "bg-red-400";

  return (
    <div className="space-y-6">
      <h2
        className="text-xl font-bold text-[#F8FAFC]"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        System Health
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SYSTEM_HEALTH.map((s) => (
          <Card key={s.label} className="flex items-center gap-4">
            <div
              className={`w-3 h-3 rounded-full ${statusBg(s.status)} flex-shrink-0`}
            />
            <div className="flex-1">
              <p className="text-xs text-slate-500 mb-0.5">{s.label}</p>
              <p
                className={`text-lg font-bold ${statusColor(s.status)}`}
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {s.value}
              </p>
            </div>
            <Activity size={16} className="text-slate-600" />
          </Card>
        ))}
      </div>
      {/* GPU clusters */}
      <Card>
        <h3
          className="font-semibold text-[#F8FAFC] mb-4"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          GPU Cluster Utilization
        </h3>
        <div className="space-y-3">
          {[
            { name: "Cluster A (US-East)", load: 82, jobs: 94 },
            { name: "Cluster B (EU-West)", load: 67, jobs: 71 },
            { name: "Cluster C (AP-South)", load: 45, jobs: 47 },
          ].map((c) => (
            <div key={c.name}>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300">{c.name}</span>
                <span className="text-slate-500">
                  {c.jobs} active jobs · {c.load}%
                </span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${c.load > 75 ? "bg-gradient-to-r from-amber-500 to-orange-500" : "bg-gradient-to-r from-purple-500 to-pink-500"}`}
                  style={{ width: `${c.load}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
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
  dashboard: "Admin Dashboard",
  users: "Users",
  generations: "Generations",
  analytics: "Analytics",
  moderation: "Moderation",
  billing: "Billing & Plans",
  notifications: "Notifications",
  system: "System",
  logs: "Logs",
  settings: "Settings",
};

const AdminDashboard = () => {
  const [activeId, setActiveId] = useState("dashboard");

  const renderView = () => {
    switch (activeId) {
      case "dashboard":
        return <AdminHome setActiveId={setActiveId} />;
      case "users":
        return <UsersView />;
      case "moderation":
        return <ModerationView />;
      case "system":
        return <SystemView />;
      default:
        return <PlaceholderView title={VIEW_TITLES[activeId] || activeId} />;
    }
  };

  return (
    <DashboardLayout
      role="admin"
      title={VIEW_TITLES[activeId] || "Dashboard"}
      defaultActive={activeId}
      activeId={activeId}
      setActiveId={setActiveId}
    >
      {renderView()}
    </DashboardLayout>
  );
};

export default AdminDashboard;
