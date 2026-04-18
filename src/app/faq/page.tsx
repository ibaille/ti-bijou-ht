"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import { useStore } from "@/lib/store";
import { t } from "@/lib/utils";
import { FAQ_DATA } from "@/lib/data";

function FAQItem({ faq, lang }: { faq: typeof FAQ_DATA[0]; lang: "fr" | "ht" }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-5 py-4.5 flex justify-between items-center text-left font-display font-bold text-[15px] text-gray-600"
      >
        {t(lang, faq.q_fr, faq.q_ht)}
        <ChevronDown
          size={16}
          className={`flex-shrink-0 ml-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-400"
        style={{ maxHeight: open ? 200 : 0 }}
      >
        <p className="px-5 pb-4 text-sm text-gray-500 leading-relaxed">
          {t(lang, faq.a_fr, faq.a_ht)}
        </p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const { lang } = useStore();

  return (
    <div className="max-w-[700px] mx-auto px-5 pt-28 pb-16">
      <h1 className="font-display font-bold text-2xl sm:text-3xl text-gray-600 text-center mb-2">
        {t(lang, "Questions Fréquentes", "Kesyon ki Souvan Poze")}
      </h1>
      <p className="text-center text-gray-400 text-sm mb-10">FAQ</p>

      <div className="flex flex-col gap-3">
        {FAQ_DATA.map((faq, i) => (
          <FAQItem key={i} faq={faq} lang={lang} />
        ))}
      </div>

      <WhatsAppFloat />
    </div>
  );
}
