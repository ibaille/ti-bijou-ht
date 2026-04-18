"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import { useStore } from "@/lib/store";
import { t, WHATSAPP_NUMBER } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

export default function ContactPage() {
  const { lang } = useStore();
  const [form, setForm] = useState({ name: "", phone: "", email: "", product: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.message) {
      toast.error(t(lang, "Veuillez remplir les champs obligatoires", "Tanpri ranpli chan obligatwa yo"));
      return;
    }
    setLoading(true);
    try {
      await supabase.from("messages").insert({
        name: form.name,
        phone: form.phone,
        email: form.email || null,
        message: form.message,
        product_name: form.product || null,
        type: "contact",
      });
    } catch {
      // Demo mode
    }
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="max-w-[600px] mx-auto px-5 pt-28 pb-16">
      <h1 className="font-display font-bold text-2xl sm:text-3xl text-gray-600 text-center mb-2">
        {t(lang, "Contactez-nous", "Kontakte Nou")}
      </h1>
      <p className="text-center text-gray-400 text-sm mb-8">
        {t(lang, "Nous sommes là pour vous aider", "Nou la pou ede w")}
      </p>

      {/* Quick contact */}
      <div className="flex gap-3 justify-center flex-wrap mb-10">
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white font-display font-semibold px-6 py-3 rounded-full shadow-md flex items-center justify-center"
        >
          WhatsApp
        </a>
        <a
          href="https://m.me/tibijouht"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-[#1877F2] font-display font-semibold px-6 py-3 rounded-full border-2 border-[#1877F2] flex items-center justify-center"
        >
          Messenger
        </a>
      </div>

      {/* Form */}
      {sent ? (
        <div className="text-center py-12 bg-menthe/10 rounded-[20px]">
          <div className="text-5xl mb-3">✅</div>
          <h3 className="font-display font-bold text-emerald-700 mb-2">
            {t(lang, "Message envoyé !", "Mesaj voye !")}
          </h3>
          <p className="text-sm text-gray-500">
            {t(lang, "Nous vous répondrons rapidement.", "Nou pral reponn ou vit.")}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <input
            className="w-full py-3.5 px-4 border-2 border-gray-100 rounded-xl text-base font-body bg-white"
            placeholder={t(lang, "Votre nom *", "Non w *")}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="w-full py-3.5 px-4 border-2 border-gray-100 rounded-xl text-base font-body bg-white"
            placeholder={t(lang, "Téléphone *", "Telefòn *")}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <input
            className="w-full py-3.5 px-4 border-2 border-gray-100 rounded-xl text-base font-body bg-white"
            placeholder={t(lang, "Email (optionnel)", "Imèl (opsyonèl)")}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="w-full py-3.5 px-4 border-2 border-gray-100 rounded-xl text-base font-body bg-white"
            placeholder={t(lang, "Produit qui vous intéresse", "Pwodui ki enterese w")}
            value={form.product}
            onChange={(e) => setForm({ ...form, product: e.target.value })}
          />
          <textarea
            className="w-full py-3.5 px-4 border-2 border-gray-100 rounded-xl text-base font-body bg-white min-h-[120px] resize-y"
            placeholder={t(lang, "Votre message *", "Mesaj ou *")}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gradient-to-r from-rose-poudre to-rose-dark text-white font-display font-semibold py-4 rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? "..." : t(lang, "Envoyer", "Voye")} 📨
          </button>
        </div>
      )}

      {/* Contact cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
        {[
          { icon: <Phone size={18} />, labelFr: "Téléphone", labelHt: "Telefòn", value: "+509 40 00 00 00" },
          { icon: <Mail size={18} />, labelFr: "Email", labelHt: "Imèl", value: "info@tibijouht.com" },
          { icon: <MapPin size={18} />, labelFr: "Zone", labelHt: "Zòn", value: "Port-au-Prince" },
        ].map((c, i) => (
          <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm">
            <div className="text-rose-dark">{c.icon}</div>
            <div>
              <div className="text-[11px] text-gray-400 font-semibold">{t(lang, c.labelFr, c.labelHt)}</div>
              <div className="text-sm text-gray-600 font-semibold">{c.value}</div>
            </div>
          </div>
        ))}
      </div>

      <WhatsAppFloat />
    </div>
  );
}
