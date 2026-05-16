import { useNavigate } from "react-router-dom";
import { Button } from ".";
import { Sparkles } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { NAV_LINKS } from "../../constants";

export default function LandingNavbar() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const toDashboard = () => {
    if (user?.role === "admin") navigate("/dashboard/admin");
    else navigate("/dashboard/client");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#0F172A]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            GrowFast
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="px-4 py-2 text-sm text-slate-400 hover:text-white rounded-xl hover:bg-white/5 transition-all duration-200"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <Button variant="primary" size="sm" onClick={toDashboard}>
              Go to Dashboard
            </Button>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/login")}
              >
                Sign in
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate("/register")}
              >
                Get started free
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
