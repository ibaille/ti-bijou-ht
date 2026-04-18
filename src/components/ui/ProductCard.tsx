"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useStore } from "@/lib/store";
import { t, formatPrice } from "@/lib/utils";
import { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const { lang, favorites, toggleFavorite } = useStore();
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
    <div className="group bg-white rounded-[20px] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-400 relative">
      {product.badge && (
        <span className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-[11px] font-display font-bold tracking-wide ${badgeStyles[product.badge]}`}>
          {t(lang, badgeLabels[product.badge].fr, badgeLabels[product.badge].ht)}
        </span>
      )}

      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(product.id); }}
        className="absolute top-2.5 right-2.5 z-10 p-2 bg-white/90 rounded-full shadow-sm hover:scale-110 transition-transform flex items-center justify-center"
      >
        <Heart size={18} fill={isFav ? "#F4A7BB" : "none"} stroke={isFav ? "#F4A7BB" : "#ccc"} />
      </button>

      <Link href={`/produit/${product.id}`}>
        <div className="overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        <div className="p-3.5">
          <h3 className="font-display font-bold text-sm text-gray-600 leading-tight mb-1.5 line-clamp-2">
            {t(lang, product.name, product.name_ht)}
          </h3>
          <div className="flex items-center gap-2">
            <span className="font-bold text-base text-rose-dark">{formatPrice(product.price)}</span>
            {product.old_price && (
              <span className="text-xs text-gray-300 line-through">{formatPrice(product.old_price)}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
