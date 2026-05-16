import {
  BarChart3,
  Building2,
  Cpu,
  Film,
  Globe,
  ImageIcon,
  Layers,
  LayoutDashboard,
  ShieldCheck,
  Sliders,
  Sparkles,
  Users,
  Wand2,
  Zap,
  History,
  CreditCard,
  Settings,
  Bell,
  FileText,
} from "lucide-react";

// ── Navigation ────────────────────────────────────────────────────────────

export const NAV_CLIENT = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "generate-image", label: "Generate Image", icon: ImageIcon },
  { id: "generate-video", label: "Generate Video", icon: Film },
  { id: "my-generations", label: "My Generations", icon: Layers, badge: 3 },
  { id: "history", label: "History", icon: History },
  { id: "billing", label: "Billing & Credits", icon: CreditCard },
  { id: "settings", label: "Settings", icon: Settings },
];

export const NAV_ADMIN = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "users", label: "Users", icon: Users },
  { id: "generations", label: "Generations", icon: Sparkles },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "moderation", label: "Moderation", icon: ShieldCheck, badge: 5 },
  { id: "billing", label: "Billing & Plans", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "system", label: "System", icon: Sliders },
  { id: "logs", label: "Logs", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

// ── Notifications ─────────────────────────────────────────────────────────

export const notifs = [
  {
    text: "Your image generation is complete",
    time: "2 min ago",
    dot: "bg-emerald-400",
  },
  {
    text: "You have 50 credits remaining this month",
    time: "1 hour ago",
    dot: "bg-amber-400",
  },
  {
    text: "New style presets added: Neon Noir, Crystal",
    time: "3 hours ago",
    dot: "bg-purple-400",
  },
  {
    text: "Your Pro plan renews in 5 days",
    time: "Yesterday",
    dot: "bg-pink-400",
  },
];

// ── Client mock data ──────────────────────────────────────────────────────

export const CLIENT_STATS = [
  {
    label: "Credits Left",
    value: "1,420",
    change: "-580 used",
    color: "purple",
    icon: CreditCard,
  },
  {
    label: "Images Generated",
    value: "284",
    change: "+34 this week",
    color: "pink",
    icon: ImageIcon,
  },
  {
    label: "Videos Generated",
    value: "47",
    change: "+8 this week",
    color: "amber",
    icon: Film,
  },
  {
    label: "Queue Position",
    value: "#1",
    change: "Instant now",
    color: "emerald",
    icon: Sparkles,
  },
];

export const RECENT_GENERATIONS = [
  {
    prompt: "Cyberpunk samurai in neon-lit Tokyo rain",
    type: "image",
    style: "Cinematic",
    status: "done",
    time: "2m ago",
    grad: "from-purple-700/50 to-indigo-700/30",
  },
  {
    prompt: "Aerial ocean drone shot at golden hour",
    type: "video",
    style: "Nature",
    status: "done",
    time: "15m ago",
    grad: "from-pink-700/50 to-rose-700/30",
  },
  {
    prompt: "Crystal cave bioluminescent creatures",
    type: "image",
    style: "Fantasy",
    status: "done",
    time: "1h ago",
    grad: "from-cyan-700/50 to-teal-700/30",
  },
  {
    prompt: "Abstract fluid art with warm palette",
    type: "image",
    style: "Abstract",
    status: "done",
    time: "2h ago",
    grad: "from-amber-700/50 to-orange-700/30",
  },
  {
    prompt: "Futuristic city timelapse from rooftop",
    type: "video",
    style: "Sci-fi",
    status: "processing",
    time: "Just now",
    grad: "from-emerald-700/50 to-green-700/30",
  },
  {
    prompt: "Portrait of an empress, baroque lighting",
    type: "image",
    style: "Portrait",
    status: "done",
    time: "3h ago",
    grad: "from-violet-700/50 to-purple-700/30",
  },
];

export const USAGE_HISTORY = [
  { date: "May 15", images: 12, videos: 3, credits: 54 },
  { date: "May 14", images: 8, videos: 1, credits: 28 },
  { date: "May 13", images: 20, videos: 5, credits: 90 },
  { date: "May 12", images: 6, videos: 0, credits: 18 },
  { date: "May 11", images: 15, videos: 2, credits: 61 },
  { date: "May 10", images: 9, videos: 4, credits: 49 },
  { date: "May 9", images: 18, videos: 6, credits: 102 },
];

// ── Admin mock data ───────────────────────────────────────────────────────

export const ADMIN_STATS = [
  {
    label: "Total Users",
    value: "12,847",
    change: "+342 this week",
    color: "purple",
    icon: Users,
  },
  {
    label: "Generations Today",
    value: "48,291",
    change: "+12% vs yesterday",
    color: "pink",
    icon: Sparkles,
  },
  {
    label: "Monthly Revenue",
    value: "$84,320",
    change: "+18% MoM",
    color: "emerald",
    icon: CreditCard,
  },
  {
    label: "Flagged Content",
    value: "23",
    change: "5 urgent",
    color: "amber",
    icon: ShieldCheck,
  },
];

export const RECENT_USERS = [
  {
    name: "Alex Mercer",
    email: "alex@example.com",
    plan: "Pro",
    joined: "Today",
    status: "active",
    gens: 284,
  },
  {
    name: "Layla Hassan",
    email: "layla@example.com",
    plan: "Free",
    joined: "Yesterday",
    status: "active",
    gens: 47,
  },
  {
    name: "Kai Nakamura",
    email: "kai@example.com",
    plan: "Enterprise",
    joined: "May 13",
    status: "active",
    gens: 1204,
  },
  {
    name: "Sofia Reyes",
    email: "sofia@example.com",
    plan: "Pro",
    joined: "May 12",
    status: "suspended",
    gens: 91,
  },
  {
    name: "Marcus Bell",
    email: "marcus@example.com",
    plan: "Free",
    joined: "May 11",
    status: "active",
    gens: 18,
  },
  {
    name: "Yuna Park",
    email: "yuna@example.com",
    plan: "Pro",
    joined: "May 10",
    status: "active",
    gens: 376,
  },
];

export const MODERATION_QUEUE = [
  {
    prompt: "Graphic violence scene in ancient war",
    user: "user_8x2k",
    type: "image",
    flag: "Violence",
    time: "5m ago",
    urgent: true,
  },
  {
    prompt: "Copyrighted cartoon character recreation",
    user: "user_3p9q",
    type: "video",
    flag: "Copyright",
    time: "12m ago",
    urgent: true,
  },
  {
    prompt: "Misleading political deepfake scene",
    user: "user_1a7b",
    type: "video",
    flag: "Deepfake",
    time: "1h ago",
    urgent: false,
  },
  {
    prompt: "Explicit content attempt",
    user: "user_9z4c",
    type: "image",
    flag: "NSFW",
    time: "2h ago",
    urgent: false,
  },
  {
    prompt: "Extremist symbol in illustration",
    user: "user_5r8d",
    type: "image",
    flag: "Extremism",
    time: "3h ago",
    urgent: false,
  },
];

export const SYSTEM_HEALTH = [
  { label: "API Latency", value: "148ms", status: "good" },
  { label: "GPU Utilization", value: "73%", status: "good" },
  { label: "Queue Depth", value: "212 jobs", status: "warn" },
  { label: "Error Rate", value: "0.3%", status: "good" },
  { label: "Storage", value: "61% used", status: "good" },
  { label: "CDN Cache Hit", value: "94%", status: "good" },
];

export const items = [
  {
    type: "image",
    span: "col-span-2 row-span-2",
    gradient: "from-purple-700/60 via-indigo-600/40 to-transparent",
    prompt: "Cyberpunk samurai in neon-lit Tokyo rain, ultra cinematic",
    style: "Cinematic",
  },
  {
    type: "video",
    span: "col-span-1 row-span-1",
    gradient: "from-pink-700/60 via-rose-600/40 to-transparent",
    prompt: "Ocean waves crashing at golden hour",
    style: "Photorealistic",
  },
  {
    type: "image",
    span: "col-span-1 row-span-1",
    gradient: "from-amber-700/60 via-orange-600/40 to-transparent",
    prompt: "Abstract fluid art, warm palette",
    style: "Abstract",
  },
  {
    type: "video",
    span: "col-span-1 row-span-2",
    gradient: "from-emerald-700/60 via-teal-600/40 to-transparent",
    prompt: "Aerial flythrough of a lush forest canopy",
    style: "Nature",
  },
  {
    type: "image",
    span: "col-span-1 row-span-1",
    gradient: "from-violet-700/60 via-purple-600/40 to-transparent",
    prompt: "Portrait of a futuristic empress",
    style: "Fantasy",
  },
  {
    type: "image",
    span: "col-span-1 row-span-1",
    gradient: "from-cyan-700/60 via-blue-600/40 to-transparent",
    prompt: "Deep ocean bioluminescent creatures",
    style: "Sci-fi",
  },
];

// Decorative gradient overlays for visual interest
export const accentColors = [
  "bg-gradient-to-br from-purple-900/80 via-indigo-900/60 to-slate-900/40",
  "bg-gradient-to-br from-pink-900/80 via-rose-900/60 to-slate-900/40",
  "bg-gradient-to-br from-amber-900/80 via-orange-900/60 to-slate-900/40",
  "bg-gradient-to-br from-emerald-900/80 via-teal-900/60 to-slate-900/40",
  "bg-gradient-to-br from-violet-900/80 via-purple-900/60 to-slate-900/40",
  "bg-gradient-to-br from-cyan-900/80 via-blue-900/60 to-slate-900/40",
];

export const faqs = [
  {
    q: "What AI models power LuminaAI?",
    a: "We use an ensemble of state-of-the-art diffusion models including our proprietary Lumina-XL architecture, fine-tuned on curated datasets for maximum quality and prompt adherence.",
  },
  {
    q: "Do I own the content I generate?",
    a: "Yes. On paid plans you get full commercial rights to everything you create. Free plan generations are for personal, non-commercial use only.",
  },
  {
    q: "How long are videos I can generate?",
    a: "Currently up to 60 seconds per generation on Pro, and up to 3 minutes on Enterprise. We're actively working on longer-form video support.",
  },
  {
    q: "Can I use LuminaAI via API?",
    a: "Yes — API access is available on the Enterprise plan. We offer REST endpoints with SDKs for Python, Node.js, and Go. Documentation is available in the developer portal.",
  },
  {
    q: "What happens if I hit my generation limit?",
    a: "You'll be notified when approaching the limit. You can upgrade your plan at any time, or purchase additional generation packs without changing your subscription.",
  },
  {
    q: "Is my data used to train AI models?",
    a: "Never. Your private generations are not used for any training purposes. We take data privacy seriously — see our privacy policy for full details.",
  },
];

export const features = [
  {
    icon: Wand2,
    color: "purple",
    badge: "Core",
    title: "Text-to-Image",
    description:
      "Describe anything and watch it materialize. Our models understand artistic style, lighting, composition, and mood from natural language.",
  },
  {
    icon: Film,
    color: "pink",
    badge: "Core",
    title: "Text-to-Video",
    description:
      "Go beyond still images. Generate fluid, cinematic video clips up to 60 seconds from a single prompt with full motion control.",
  },
  {
    icon: Zap,
    color: "amber",
    badge: "Performance",
    title: "Lightning Fast",
    description:
      "Images in under 4 seconds, videos in under 30. Our distributed GPU infrastructure ensures you're never waiting long.",
  },
  {
    icon: Layers,
    color: "blue",
    badge: "Creative",
    title: "Style Library",
    description:
      "Choose from 80+ curated style presets — anime, photorealism, oil painting, watercolor, cyberpunk, and more — or blend your own.",
  },
  {
    icon: Sliders,
    color: "emerald",
    badge: "Control",
    title: "Fine-Tune Everything",
    description:
      "Aspect ratio, CFG scale, steps, seed, model checkpoint. Power-user controls that give you precise command over every generation.",
  },
  {
    icon: ShieldCheck,
    color: "purple",
    badge: "Safety",
    title: "Safe by Default",
    description:
      "Built-in content moderation with customizable filters. Your generations are private by default and never used for training.",
  },
];

export const colorMap = {
  purple: {
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    badge: "purple",
    glow: "group-hover:shadow-purple-900/20",
    border: "group-hover:border-purple-500/30",
  },
  pink: {
    bg: "bg-pink-500/10",
    text: "text-pink-400",
    badge: "pink",
    glow: "group-hover:shadow-pink-900/20",
    border: "group-hover:border-pink-500/30",
  },
  amber: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    badge: "amber",
    glow: "group-hover:shadow-amber-900/20",
    border: "group-hover:border-amber-500/30",
  },
  blue: {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    badge: "blue",
    glow: "group-hover:shadow-blue-900/20",
    border: "group-hover:border-blue-500/30",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    badge: "green",
    glow: "group-hover:shadow-emerald-900/20",
    border: "group-hover:border-emerald-500/30",
  },
};

// Stats bar at the top of the section
export const stats = [
  { icon: ImageIcon, value: "50+ Models", label: "generation models" },
  { icon: Cpu, value: "4s avg", label: "image generation" },
  { icon: Film, value: "4K", label: "max resolution" },
  { icon: Globe, value: "99.9%", label: "uptime SLA" },
];

export const plans = [
  {
    name: "Free",
    icon: Zap,
    price: { monthly: 0, yearly: 0 },
    description: "Perfect for exploring AI generation",
    badge: null,
    color: "default",
    cta: "Get started free",
    ctaVariant: "secondary",
    features: [
      "50 image generations / month",
      "5 video generations / month",
      "720p max resolution",
      "10 style presets",
      "Community gallery access",
      "Standard queue priority",
    ],
    missing: ["4K resolution", "Commercial license", "API access"],
  },
  {
    name: "Pro",
    icon: Sparkles,
    price: { monthly: 29, yearly: 19 },
    description: "For creators who need more power",
    badge: "Most Popular",
    color: "purple",
    cta: "Start Pro trial",
    ctaVariant: "primary",
    features: [
      "2,000 image generations / month",
      "200 video generations / month",
      "4K max resolution",
      "80+ style presets",
      "Private generations",
      "Priority queue",
      "Commercial license",
      "Advanced controls",
    ],
    missing: ["Dedicated GPU", "Team seats"],
  },
  {
    name: "Enterprise",
    icon: Building2,
    price: { monthly: 99, yearly: 79 },
    description: "For teams and high-volume use cases",
    badge: "Best Value",
    color: "pink",
    cta: "Contact sales",
    ctaVariant: "accent",
    features: [
      "Unlimited generations",
      "8K max resolution",
      "All style presets + custom",
      "Dedicated GPU cluster",
      "API access (1M req/mo)",
      "Team seats (up to 25)",
      "SSO & admin controls",
      "SLA + priority support",
      "White-label options",
    ],
    missing: [],
  },
];
