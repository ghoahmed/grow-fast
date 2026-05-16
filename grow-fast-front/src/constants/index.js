import {
  BarChart3,
  Building2,
  CalendarDays,
  Cpu,
  Film,
  Globe,
  ImageIcon,
  Layers,
  LayoutDashboard,
  MessageSquare,
  Scissors,
  ShieldCheck,
  Sliders,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Wand2,
  Zap,
} from "lucide-react";

export const notifs = [
  { text: "New booking from Maria G.", time: "2m ago", dot: "bg-purple-400" },
  { text: "Payment received $85", time: "14m ago", dot: "bg-emerald-400" },
  { text: "3 appointments tomorrow", time: "1h ago", dot: "bg-amber-400" },
];

export const NAV_OWNER = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: CalendarDays, label: "Appointments", id: "appointments", badge: 3 },
  { icon: Scissors, label: "Services", id: "services" },
  { icon: Users, label: "Clients", id: "clients" },
  { icon: TrendingUp, label: "Analytics", id: "analytics" },
  { icon: Star, label: "Reviews", id: "reviews" },
  { icon: MessageSquare, label: "Messages", id: "messages", badge: 2 },
];

export const NAV_CLIENT = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: CalendarDays, label: "Book Now", id: "book" },
  { icon: Star, label: "My Bookings", id: "bookings" },
  { icon: MessageSquare, label: "Messages", id: "messages" },
];

export const NAV_ADMIN = [
  { icon: LayoutDashboard, label: "Overview", id: "dashboard" },
  { icon: Users, label: "Users", id: "users" },
  { icon: Scissors, label: "Salons", id: "salons" },
  { icon: BarChart3, label: "Analytics", id: "analytics" },
  { icon: ShieldCheck, label: "Moderation", id: "moderation" },
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
