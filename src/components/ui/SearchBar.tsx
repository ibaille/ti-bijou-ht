"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useStore } from "@/lib/store";
import { DEMO_PRODUCTS } from "@/lib/data";
import { t, formatPrice } from "@/lib/utils";

export default function SearchBar() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { lang, searchOpen, setSearchOpen, filters, setFilter } = useStore();
  const query = filters.search;

  useEffect(() => {
    if (searchOpen && inputRef.current) inputRef.current.focus();
  }, [searchOpen]);

  const results = query.length > 1
    ? DEMO_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.name_ht.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSelect = (id: string) => {
    setSearchOpen(false);
    setFilter("search", "");
    router.push(`/produit/${id}`);
  };

  if (!searchOpen) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[150] bg-cream p-4 shadow-lg">
      <div className="max-w-[600px] mx-auto relative">
        <input
          ref={inputRef}
          type="text"
          placeholder={t(lang, "Rechercher un article...", "Chèche yon atik...")}
          value={query}
          onChange={(e) => setFilter("search", e.target.value)}
          className="w-full py-3.5 px-5 pr-12 border-2 border-rose-poudre rounded-full text-base font-body bg-white"
        />
        <button
          onClick={() => { setSearchOpen(false); setFilter("search", ""); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 flex items-center justify-center"
        >
          <X size={20} />
        </button>
        {results.length > 0 && (
          <div className="bg-white rounded-2xl mt-2 shadow-lg overflow-hidden">
            {results.map((p) => (
              <button
                key={p.id}
                onClick={() => handleSelect(p.id)}
                className="w-full px-5 py-3 border-b border-gray-50 flex justify-between items-center hover:bg-rose-poudre/5 transition-colors text-left"
              >
                <span className="font-display font-semibold text-sm text-gray-600">
                  {t(lang, p.name, p.name_ht)}
                </span>
                <span className="text-rose-dark font-bold text-sm">{formatPrice(p.price)}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
