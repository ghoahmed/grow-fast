import { useState } from "react";
import { SectionTitle } from "../ui";
import { ChevronDown } from "lucide-react";
import { faqs } from "../../constants";

function FAQItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border rounded-2xl transition-all duration-300 ${open ? "border-purple-500/30 bg-purple-500/5" : "border-white/5 bg-[#1E293B] hover:border-white/10"}`}
    >
      <button
        className="w-full flex items-center justify-between p-5 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-[#F8FAFC] text-sm pr-4">
          {item.q}
        </span>
        <ChevronDown
          size={18}
          className={`text-slate-400 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-purple-400" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-4">
          {item.a}
        </div>
      )}
    </div>
  );
}

export function FAQSection() {
  return (
    <section id="faq" className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionTitle
          label="FAQ"
          title="Got questions?"
          subtitle="Everything you need to know about LuminaAI."
        />
        <div className="space-y-3">
          {faqs.map((item) => (
            <FAQItem key={item.q} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
