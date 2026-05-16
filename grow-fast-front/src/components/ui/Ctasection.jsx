import { Link } from "react-router-dom";
import { Button } from "../ui";
import { Sparkles, ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden border border-purple-500/20 bg-gradient-to-br from-purple-600/20 via-[#1E293B] to-pink-600/10 p-12 md:p-20 text-center">
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-600/15 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold tracking-widest uppercase mb-6">
              <Sparkles size={12} />
              No credit card required
            </div>

            <h2
              className="text-4xl md:text-5xl font-bold text-[#F8FAFC] mb-5 leading-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Start creating in{" "}
              <span className="gradient-text">30 seconds</span>
            </h2>

            <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Join 12,000+ creators generating stunning visuals every day. Free
              to start, no strings attached.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button
                  variant="accent"
                  size="xl"
                  className="hover-glow w-full sm:w-auto"
                >
                  <Sparkles size={20} />
                  Create your free account
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="ghost" size="xl" className="w-full sm:w-auto">
                  Already have an account? Sign in
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
