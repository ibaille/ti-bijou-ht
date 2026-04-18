"use client";
import { Suspense, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ui/ProductCard";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import { useStore } from "@/lib/store";
import { t } from "@/lib/utils";
import { DEMO_PRODUCTS, DEMO_CATEGORIES } from "@/lib/data";

function BoutiqueContent() {
  const searchParams = useSearchParams();
  const { lang, filters, setFilter, resetFilters, favorites } = useStore();
  useEffect(() => { const c = searchParams.get("category"); const f = searchParams.get("favorites"); if (c) setFilter("category", c); if (f === "true") setFilter("category", "__favorites__"); }, [searchParams, setFilter]);
  const isFav = filters.category === "__favorites__";
  const filtered = useMemo(() => {
    let p = DEMO_PRODUCTS;
    if (isFav) { p = p.filter((x) => favorites.includes(x.id)); }
    else {
      if (filters.category) { const cat = DEMO_CATEGORIES.find((c) => c.slug === filters.category); if (cat) p = p.filter((x) => x.category_id === cat.id); }
      if (filters.gender) p = p.filter((x) => x.gender === filters.gender);
      if (filters.age) p = p.filter((x) => x.age_range === filters.age);
      if (filters.search) { const q = filters.search.toLowerCase(); p = p.filter((x) => x.name.toLowerCase().includes(q) || x.name_ht.toLowerCase().includes(q)); }
    }
    return [...p].sort((a, b) => { if (filters.sort === "price_asc") return a.price - b.price; if (filters.sort === "price_desc") return b.price - a.price; if (filters.sort === "popular") return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0); return new Date(b.created_at).getTime() - new Date(a.created_at).getTime(); });
  }, [filters, favorites, isFav]);
  const hasFilters = filters.category || filters.gender || filters.age;
  return (
    <div className="max-w-[1200px] mx-auto px-5 pt-28 pb-16">
      <h1 className="font-display font-bold text-2xl sm:text-3xl text-gray-600 text-center mb-1">{isFav ? t(lang, "Mes Favoris", "Favori Mwen") : t(lang, "Notre Boutique", "Boutik Nou")}</h1>
      <p className="text-center text-gray-400 text-sm mb-8">{filtered.length} {t(lang, "articles", "atik")}</p>
      {!isFav && (<div className="mb-7"><div className="flex gap-2 flex-wrap">
        <select value={filters.category} onChange={(e) => setFilter("category", e.target.value)} className="py-2.5 px-4 border-2 border-gray-100 rounded-full text-sm font-body bg-white text-gray-500 min-w-[130px] appearance-none cursor-pointer"><option value="">{t(lang, "Toutes catégories", "Tout kategori")}</option>{DEMO_CATEGORIES.map((c) => <option key={c.id} value={c.slug}>{t(lang, c.name, c.name_ht)}</option>)}</select>
        <select value={filters.gender} onChange={(e) => setFilter("gender", e.target.value)} className="py-2.5 px-4 border-2 border-gray-100 rounded-full text-sm font-body bg-white text-gray-500 min-w-[110px] appearance-none cursor-pointer"><option value="">{t(lang, "Tous genres", "Tout sèks")}</option><option value="fille">{t(lang, "Fille", "Fi")}</option><option value="garcon">{t(lang, "Garçon", "Gason")}</option><option value="unisexe">Unisexe</option></select>
        <select value={filters.age} onChange={(e) => setFilter("age", e.target.value)} className="py-2.5 px-4 border-2 border-gray-100 rounded-full text-sm font-body bg-white text-gray-500 min-w-[110px] appearance-none cursor-pointer"><option value="">{t(lang, "Tous âges", "Tout laj")}</option><option value="0-3">0-3 {t(lang, "mois", "mwa")}</option><option value="3-6">3-6 {t(lang, "mois", "mwa")}</option><option value="6-12">6-12 {t(lang, "mois", "mwa")}</option></select>
        <select value={filters.sort} onChange={(e) => setFilter("sort", e.target.value)} className="py-2.5 px-4 border-2 border-gray-100 rounded-full text-sm font-body bg-white text-gray-500 min-w-[130px] appearance-none cursor-pointer"><option value="newest">{t(lang, "Plus récents", "Pi resan")}</option><option value="price_asc">{t(lang, "Prix croissant", "Pri monte")}</option><option value="price_desc">{t(lang, "Prix décroissant", "Pri desann")}</option><option value="popular">{t(lang, "Populaires", "Popilè")}</option></select>
      </div>{hasFilters && <button onClick={resetFilters} className="mt-3 text-sm font-display font-semibold text-rose-dark border-2 border-rose-poudre px-5 py-2 rounded-full hover:bg-rose-poudre/10 transition-colors flex items-center justify-center">{t(lang, "Effacer filtres", "Efase filt yo")} ✕</button>}</div>)}
      {filtered.length === 0 ? (<div className="text-center py-20 text-gray-400"><div className="text-5xl mb-4">{isFav ? "💝" : "🔍"}</div><p className="mb-4">{isFav ? t(lang, "Pas encore de favoris", "Poko gen favori") : t(lang, "Aucun article trouvé", "Pa jwenn atik")}</p>{isFav && <a href="/boutique" className="text-rose-dark font-display font-semibold hover:underline">{t(lang, "Découvrir nos articles", "Dekouvri atik nou yo")}</a>}</div>)
      : (<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">{filtered.map((p) => <ProductCard key={p.id} product={p} />)}</div>)}
      <WhatsAppFloat />
    </div>
  );
}
export default function BoutiquePage() {
  return <Suspense fallback={<div className="max-w-[1200px] mx-auto px-5 pt-28 pb-16 text-center text-gray-400">Chargement...</div>}><BoutiqueContent /></Suspense>;
}
