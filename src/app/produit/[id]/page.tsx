"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Heart, Share2 } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import InterestModal from "@/components/product/InterestModal";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import { useStore } from "@/lib/store";
import { t, formatPrice, getWhatsAppLink, WHATSAPP_NUMBER } from "@/lib/utils";
import { DEMO_PRODUCTS, DEMO_CATEGORIES } from "@/lib/data";

export default function ProductPage() {
  const params = useParams();
  const { lang, favorites, toggleFavorite } = useStore();
  const [showInterest, setShowInterest] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = DEMO_PRODUCTS.find((p) => p.id === params.id);
  if (!product) {
    return (
      <div className="max-w-[1200px] mx-auto px-5 pt-28 text-center py-20">
        <div className="text-5xl mb-4">😕</div>
        <p className="text-gray-400 mb-4">{t(lang, "Produit non trouvé", "Pa jwenn pwodui a")}</p>
        <Link href="/boutique" className="text-rose-dark font-display font-semibold hover:underline">
          {t(lang, "Retour à la boutique", "Retounen nan boutik la")}
        </Link>
      </div>
    );
  }

  const category = DEMO_CATEGORIES.find((c) => c.id === product.category_id);
  const similar = DEMO_PRODUCTS.filter((p) => p.category_id === product.category_id && p.id !== product.id).slice(0, 4);
  const isFav = favorites.includes(product.id);

  const badgeStyles: Record<string, string> = {
    new: "bg-menthe/80 text-emerald-800",
    popular: "bg-sable/80 text-amber-800",
    limited: "bg-rose-poudre/80 text-rose-900",
  };
  const badgeLabels: Record<string, { fr: string; ht: string }> = {
    new: { fr: "Nouveau", ht: "Nouvo" },
    popular: { fr: "Populaire", ht: "Popilè" },
    limited: { fr: "Stock limité", ht: "Stòk limite" },
  };

  return (
    <div className="max-w-[1200px] mx-auto px-5 pt-28 pb-16">
      <Link href="/boutique" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-rose-dark transition-colors mb-6">
        <ChevronLeft size={18} /> {t(lang, "Retour", "Retounen")}
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Images */}
        <div>
          <div
            className="rounded-3xl overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${category?.color || "#eee"}15, #fff)` }}
          >
            <img
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              className="w-full aspect-square object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors flex items-center justify-center ${
                    i === selectedImage ? "border-rose-poudre" : "border-gray-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          {product.badge && (
            <span className={`inline-block px-3.5 py-1 rounded-full text-xs font-display font-bold mb-3 ${badgeStyles[product.badge]}`}>
              {t(lang, badgeLabels[product.badge].fr, badgeLabels[product.badge].ht)}
            </span>
          )}

          <h1 className="font-display font-bold text-2xl sm:text-3xl text-gray-600 mb-2 leading-tight">
            {t(lang, product.name, product.name_ht)}
          </h1>

          <div className="flex items-center gap-3 mb-5">
            <span className="text-2xl sm:text-3xl font-bold text-rose-dark">{formatPrice(product.price)}</span>
            {product.old_price && (
              <span className="text-base text-gray-300 line-through">{formatPrice(product.old_price)}</span>
            )}
          </div>

          <p className="text-base text-gray-500 leading-relaxed mb-6">
            {t(lang, product.description, product.description_ht)}
          </p>

          {/* Colors */}
          {product.colors.length > 0 && (
            <div className="mb-4">
              <div className="font-display font-semibold text-xs text-gray-400 mb-2 uppercase tracking-wide">
                {t(lang, "Couleurs disponibles", "Koulè ki disponib")}
              </div>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((c) => (
                  <span key={c} className="px-3.5 py-1.5 rounded-full bg-gray-50 text-sm text-gray-500 font-body">{c}</span>
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes.length > 0 && (
            <div className="mb-6">
              <div className="font-display font-semibold text-xs text-gray-400 mb-2 uppercase tracking-wide">
                {t(lang, "Tailles", "Tay")}
              </div>
              <div className="flex gap-2">
                {product.sizes.map((s) => (
                  <span key={s} className="px-4 py-2 rounded-xl border-2 border-gray-100 text-sm font-display font-semibold text-gray-500 cursor-pointer hover:border-rose-poudre transition-colors">{s}</span>
                ))}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col gap-2.5 mb-6">
            <button
              onClick={() => setShowInterest(true)}
              className="w-full bg-gradient-to-r from-rose-poudre to-rose-dark text-white font-display font-semibold py-4 rounded-full shadow-lg shadow-rose-poudre/30 hover:shadow-xl transition-all flex items-center justify-center"
            >
              {t(lang, "Je suis intéressé(e)", "M enterese")} 💌
            </button>
            <a
              href={getWhatsAppLink(WHATSAPP_NUMBER, product.name, product.price)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] text-white font-display font-semibold py-4 rounded-full shadow-lg shadow-[#25D366]/30 text-center flex items-center justify-center"
            >
              {t(lang, "Commander via WhatsApp", "Kòmande sou WhatsApp")}
            </a>
          </div>

          {/* Secondary actions */}
          <div className="flex gap-3 items-center">
            <button
              onClick={() => toggleFavorite(product.id)}
              className="p-2.5 border-2 border-gray-100 rounded-xl hover:border-rose-poudre transition-colors flex items-center justify-center"
            >
              <Heart size={20} fill={isFav ? "#F4A7BB" : "none"} stroke={isFav ? "#F4A7BB" : "#ccc"} />
            </button>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`Gade sa m jwenn sou Ti Bijou HT: ${product.name} — ${formatPrice(product.price)}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 border-2 border-gray-100 rounded-xl text-[#25D366] hover:border-[#25D366] transition-colors flex items-center justify-center"
            >
              <Share2 size={20} />
            </a>
          </div>

          {/* Stock info */}
          <div className={`mt-4 px-4 py-3 rounded-xl text-sm ${product.stock <= 5 ? "bg-rose-poudre/10 text-rose-900" : "bg-menthe/10 text-emerald-700"}`}>
            {product.stock <= 5
              ? `⚠️ ${t(lang, `Plus que ${product.stock} en stock!`, `Sèlman ${product.stock} ki rete!`)}`
              : `✅ ${t(lang, "En stock", "An stòk")}`}
          </div>
        </div>
      </div>

      {/* Similar products */}
      {similar.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display font-bold text-2xl text-gray-600 text-center mb-6">
            {t(lang, "Articles Similaires", "Atik Ki Sanble")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {similar.map((s) => (
              <ProductCard key={s.id} product={s} />
            ))}
          </div>
        </div>
      )}

      {showInterest && <InterestModal product={product} onClose={() => setShowInterest(false)} />}
      <WhatsAppFloat />
    </div>
  );
}
