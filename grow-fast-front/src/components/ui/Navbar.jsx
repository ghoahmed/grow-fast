import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui";
import { Sparkles, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Features", href: "#features" },
    { label: "Gallery", href: "#gallery" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0F172A]/80 backdrop-blur-xl border-b border-white/5 shadow-xl shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-900/40 group-hover:scale-110 transition-transform">
            <Sparkles size={16} className="text-white" />
          </div>
          <span
            className="font-bold text-lg text-[#F8FAFC] tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Lumina<span className="gradient-text">AI</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="px-4 py-2 text-sm text-slate-400 hover:text-white rounded-xl hover:bg-white/5 transition-all duration-200"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="primary" size="sm">
              <Sparkles size={14} />
              Start free
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/5"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0F172A]/95 backdrop-blur-xl border-b border-white/5 px-6 py-4 space-y-1">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 text-sm text-slate-400 hover:text-white rounded-xl hover:bg-white/5"
            >
              {l.label}
            </a>
          ))}
          <div className="flex gap-3 pt-3">
            <Link to="/login" className="flex-1">
              <Button variant="secondary" size="sm" className="w-full">
                Sign in
              </Button>
            </Link>
            <Link to="/register" className="flex-1">
              <Button variant="primary" size="sm" className="w-full">
                Start free
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
