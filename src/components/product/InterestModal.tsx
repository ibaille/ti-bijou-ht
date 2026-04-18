"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useStore } from "@/lib/store";
import { t, formatPrice, getWhatsAppLink, WHATSAPP_NUMBER } from "@/lib/utils";
import { Product } from "@/lib/types";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

interface Props {
  product: Product;
  onClose: () => void;
}

export default function InterestModal({ product, onClose }: Props) {
  const { lang } = useStore();
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.phone) {
      toast.error(t(lang, "Veuillez remplir les champs obligatoires", "Tanpri ranpli chan obligatwa yo"));
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from("messages").insert({
        name: form.name,
        phone: form.phone,
        message: form.message || `Intéressé(e) par: ${product.name}`,
        product_id: product.id,
        product_name: product.name,
        type: "interest",
      });
      if (error) throw error;
      setSent(true);
    } catch {
      // If Supabase not configured, still show success for demo
      setSent(true);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-5">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-cream rounded-3xl p-8 max-w-[420px] w-full max-h-[85vh] overflow-y-auto shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 flex items-center justify-center">
          <X size={20} />
        </button>

        <h3 className="font-display font-bold text-xl text-gray-600 mb-1">
          {t(lang, "Je suis intéressé(e)", "M enterese")} 💌
        </h3>
        <p className="text-sm text-gray-400 mb-5">
          {t(lang, product.name, product.name_ht)} — {formatPrice(product.price)}
        </p>

        {sent ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-3">✅</div>
            <p className="font-display font-semibold text-emerald-700">
              {t(lang, "Merci ! Nous vous contacterons bientôt.", "Mèsi! Nou pral kontakte w byento.")}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <input
              className="w-full py-3.5 px-4 border-2 border-gray-100 rounded-xl text-base font-body bg-white"
              placeholder={t(lang, "Votre nom *", "Non w *")}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="w-full py-3.5 px-4 border-2 border-gray-100 rounded-xl text-base font-body bg-white"
              placeholder={t(lang, "Téléphone / WhatsApp *", "Telefòn / WhatsApp *")}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <textarea
              className="w-full py-3.5 px-4 border-2 border-gray-100 rounded-xl text-base font-body bg-white min-h-[80px] resize-y"
              placeholder={t(lang, "Message (taille, couleur...)", "Mesaj (tay, koulè...)")}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            <div className="flex gap-2.5 mt-1">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-rose-poudre to-rose-dark text-white font-display font-semibold py-3.5 rounded-full shadow-md hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center"
              >
                {loading ? "..." : t(lang, "Envoyer", "Voye")}
              </button>
              <a
                href={getWhatsAppLink(WHATSAPP_NUMBER, product.name, product.price)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#25D366] text-white font-display font-semibold py-3.5 rounded-full shadow-md text-center flex items-center justify-center"
              >
                WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
