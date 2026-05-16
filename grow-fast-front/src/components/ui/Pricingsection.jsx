import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, SectionTitle } from "../ui";
import { Check } from "lucide-react";
import { plans } from "../../constants";

export default function PricingSection() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="relative py-32 px-6 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-purple-600/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[300px] bg-pink-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <SectionTitle
          label="Pricing"
          title="Simple, transparent pricing"
          subtitle="No hidden fees. No surprise charges. Cancel anytime."
        />

        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-4 mb-14">
          <span
            className={`text-sm ${!yearly ? "text-white" : "text-slate-500"}`}
          >
            Monthly
          </span>
          <button
            onClick={() => setYearly(!yearly)}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${yearly ? "bg-purple-600" : "bg-white/10"}`}
          >
            <span
              className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${yearly ? "left-7" : "left-1"}`}
            />
          </button>
          <span
            className={`text-sm ${yearly ? "text-white" : "text-slate-500"}`}
          >
            Yearly
            <span className="ml-2 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
              Save 35%
            </span>
          </span>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const price = yearly ? plan.price.yearly : plan.price.monthly;
            const isPopular = plan.badge === "Most Popular";

            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-6 border transition-all duration-300 ${
                  isPopular
                    ? "bg-gradient-to-b from-purple-600/20 to-[#1E293B] border-purple-500/40 shadow-2xl shadow-purple-900/20 scale-[1.02]"
                    : "bg-[#1E293B] border-white/5 hover:border-white/15"
                }`}
              >
                {/* Popular badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-900/40">
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Plan header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${isPopular ? "bg-purple-500/20" : "bg-white/5"}`}
                  >
                    <plan.icon
                      size={18}
                      className={
                        isPopular ? "text-purple-400" : "text-slate-400"
                      }
                    />
                  </div>
                  <div>
                    <h3
                      className="font-bold text-[#F8FAFC]"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {plan.name}
                    </h3>
                    <p className="text-xs text-slate-500">{plan.description}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-end gap-1">
                    <span
                      className="text-4xl font-bold text-[#F8FAFC]"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      ${price}
                    </span>
                    {price > 0 && (
                      <span className="text-slate-500 text-sm mb-1.5">
                        /month
                      </span>
                    )}
                    {price === 0 && (
                      <span className="text-slate-500 text-sm mb-1.5">
                        forever
                      </span>
                    )}
                  </div>
                  {yearly && price > 0 && (
                    <p className="text-xs text-emerald-400 mt-1">
                      Billed ${price * 12}/year · Save $
                      {(plan.price.monthly - price) * 12}
                    </p>
                  )}
                </div>

                {/* CTA */}
                <Link to="/register" className="block mb-6">
                  <Button
                    variant={plan.ctaVariant}
                    size="md"
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </Link>

                {/* Divider */}
                <div className="border-t border-white/5 mb-5" />

                {/* Features */}
                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 text-sm text-slate-300"
                    >
                      <Check
                        size={14}
                        className="text-emerald-400 flex-shrink-0"
                      />
                      {f}
                    </li>
                  ))}
                  {plan.missing.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 text-sm text-slate-600 line-through"
                    >
                      <span className="w-3.5 h-3.5 flex-shrink-0 rounded-full border border-slate-700" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Fine print */}
        <p className="text-center text-sm text-slate-600 mt-10">
          All plans include a 7-day free trial. No credit card required to
          start.
        </p>
      </div>
    </section>
  );
}
