"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, ChevronDown, Loader2 } from "lucide-react";
import Logo from "@/components/ui/Logo";
import ProductCard from "@/components/ui/ProductCard";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import { useStore } from "@/lib/store";
import { t, WHATSAPP_NUMBER } from "@/lib/utils";
import { DEMO_CATEGORIES, DEMO_TESTIMONIALS } from "@/lib/data";
import { Product } from "@/lib/types";
import { supabase } from "@/lib/supabase";

export default function HomePage() {
  const { lang } = useStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase.from("products").select("*").eq("is_active", true).order("created_at", { ascending: false });
        if (data) setProducts(data as Product[]);
      } catch { /* no products yet */ }
      setLoaded(true);
    })();
  }, []);

  const newProducts = products.filter((p) => p.badge === "new").slice(0, 4);
  const coupCoeur = products.filter((p) => p.is_coup_coeur).slice(0, 4);
  const hasProducts = products.length > 0;

  return (
    <>
      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-32 h-32 rounded-full bg-rose-poudre/5 top-[10%] left-[5%] animate-float" />
          <div className="absolute w-20 h-20 rounded-full bg-bleu-ciel/[0.08] top-[20%] right-[10%] animate-float" style={{ animationDelay: "1s" }} />
          <div className="absolute w-24 h-24 rounded-full bg-lavande/5 bottom-[20%] left-[15%] animate-float" style={{ animationDelay: "2s" }} />
        </div>
        <div className="relative z-10 max-w-[600px] animate-fade-in-up">
          <p className="text-xs font-display font-semibold text-lavande tracking-[4px] uppercase mb-4">{t(lang, "Bienvenue chez", "Byenveni nan")}</p>
          <div className="flex justify-center mb-6"><Logo size="lg" /></div>
          <h1 className="font-display font-bold text-3xl sm:text-5xl text-gray-600 leading-tight mb-4">
            {t(lang, "Le plus beau pour votre", "Pi bèl bagay pou")} <span className="text-rose-dark">{t(lang, "petit trésor", "ti trezò w")}</span>
          </h1>
          <p className="text-base text-gray-400 leading-relaxed mb-8 max-w-md mx-auto">
            {t(lang, "Découvrez notre collection exclusive d'articles pour nouveau-nés. Qualité, douceur et style pour les bébés d'Haïti.", "Dekouvri koleksyon eksklusif atik pou nouvo-ne Ayiti.")}
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/boutique" className="bg-gradient-to-r from-rose-poudre to-rose-dark text-white font-display font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-rose-poudre/30 flex items-center justify-center">
              {t(lang, "Découvrir la Collection", "Dekouvri Koleksyon an")} ✨
            </Link>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white font-display font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-[#25D366]/30 flex items-center justify-center">
              WhatsApp
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float text-gray-300"><ChevronDown size={20} /></div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-[1200px] mx-auto px-5 py-16">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-600 text-center mb-2">{t(lang, "Nos Catégories", "Kategori Nou yo")}</h2>
        <p className="text-center text-gray-400 text-sm mb-10">{t(lang, "Tout ce dont votre bébé a besoin", "Tout sa tibebe w bezwen")}</p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
          {DEMO_CATEGORIES.map((cat) => (
            <Link key={cat.id} href={`/boutique?category=${cat.slug}`} className="rounded-[20px] p-5 text-center transition-all duration-300 hover:-translate-y-1 border-2" style={{ background: `linear-gradient(135deg, ${cat.color}15, ${cat.color}05)`, borderColor: `${cat.color}20` }}>
              <div className="text-3xl mb-2">{cat.icon}</div>
              <div className="font-display font-bold text-xs sm:text-sm text-gray-600">{t(lang, cat.name, cat.name_ht)}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* LOADING STATE */}
      {!loaded && (
        <div className="text-center py-16">
          <Loader2 size={28} className="mx-auto animate-spin text-rose-poudre mb-3" />
          <p className="text-sm text-gray-400">{t(lang, "Chargement des articles...", "Chajman atik yo...")}</p>
        </div>
      )}

      {/* NOUVEAUTES - only show if products exist */}
      {loaded && newProducts.length > 0 && (
        <section className="max-w-[1200px] mx-auto px-5 py-16">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-600 text-center mb-2">{t(lang, "Nouveautés", "Nouvo Rive")}</h2>
          <p className="text-center text-gray-400 text-sm mb-10">{t(lang, "Les derniers articles", "Dènye atik yo")}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {newProducts.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* COUPS DE COEUR - only show if products exist */}
      {loaded && coupCoeur.length > 0 && (
        <section className="max-w-[1200px] mx-auto px-5 py-16">
          <div className="bg-gradient-to-br from-rose-poudre/5 to-bleu-ciel/5 rounded-[32px] p-6 sm:p-10">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-600 text-center mb-2">{t(lang, "Coups de Cœur", "Koudkè")} 💝</h2>
            <p className="text-center text-gray-400 text-sm mb-10">{t(lang, "Notre sélection spéciale", "Seleksyon espesyal nou")}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {coupCoeur.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* NO PRODUCTS YET message */}
      {loaded && !hasProducts && (
        <section className="max-w-[600px] mx-auto px-5 py-16 text-center">
          <div className="bg-gradient-to-br from-rose-poudre/5 to-bleu-ciel/5 rounded-[32px] p-10">
            <div className="text-5xl mb-4">🍼</div>
            <h3 className="font-display font-bold text-xl text-gray-600 mb-2">
              {t(lang, "Notre collection arrive bientôt !", "Koleksyon nou ap vini byento !")}
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              {t(lang, "Contactez-nous sur WhatsApp pour être informé(e) des nouveaux arrivages.", "Kontakte nou sou WhatsApp pou konnen lè nouvo atik rive.")}
            </p>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white font-display font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-[#25D366]/30 inline-flex items-center justify-center">
              WhatsApp
            </a>
          </div>
        </section>
      )}

      {/* ALL PRODUCTS preview - show if enough products */}
      {loaded && products.length > 4 && (
        <section className="max-w-[1200px] mx-auto px-5 py-16">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-600 text-center mb-2">{t(lang, "Tous nos articles", "Tout atik nou yo")}</h2>
          <p className="text-center text-gray-400 text-sm mb-10">{products.length} {t(lang, "articles disponibles", "atik disponib")}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {products.slice(0, 8).map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
          {products.length > 8 && (
            <div className="text-center mt-8">
              <Link href="/boutique" className="bg-gradient-to-r from-rose-poudre to-rose-dark text-white font-display font-semibold px-8 py-3.5 rounded-full shadow-md inline-flex items-center justify-center">
                {t(lang, "Voir tout", "Wè tout")} →
              </Link>
            </div>
          )}
        </section>
      )}

      {/* POURQUOI NOUS */}
      <section className="max-w-[1200px] mx-auto px-5 py-16">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-600 text-center mb-10">{t(lang, "Pourquoi Ti Bijou ?", "Poukisa Ti Bijou ?")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { i: "✨", f: "Qualité Premium", h: "Kalite Premyòm", df: "Articles sélectionnés avec soin", dh: "Atik chwazi ak swen" },
            { i: "👶", f: "100% Bébé", h: "100% Tibebe", df: "Spécialisé nouveau-nés", dh: "Espesyalize nan nouvo-ne" },
            { i: "🚚", f: "Livraison Haïti", h: "Livrezon Ayiti", df: "Partout en Haïti", dh: "Toupatou nan Ayiti" },
            { i: "🛡️", f: "Service Personnalisé", h: "Sèvis Pèsonalize", df: "Conseil et suivi WhatsApp", dh: "Konsèy ak swivi WhatsApp" },
          ].map((x, j) => (
            <div key={j} className="text-center p-7 rounded-3xl bg-white shadow-sm"><div className="text-3xl mb-3">{x.i}</div><div className="font-display font-bold text-base text-gray-600 mb-2">{t(lang, x.f, x.h)}</div><div className="text-sm text-gray-400">{t(lang, x.df, x.dh)}</div></div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-[1200px] mx-auto px-5 py-16">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-600 text-center mb-10">{t(lang, "Ce que disent les Mamans", "Sa Manman yo Di")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {DEMO_TESTIMONIALS.map((tm) => (
            <div key={tm.id} className="bg-white rounded-[20px] p-6 shadow-sm">
              <div className="flex gap-1 mb-3">{[...Array(tm.rating)].map((_, j) => <Star key={j} size={16} fill="#F4D7A7" stroke="#F4D7A7" />)}</div>
              <p className="text-sm text-gray-500 leading-relaxed mb-4 italic">&ldquo;{t(lang, tm.text_fr, tm.text_ht)}&rdquo;</p>
              <div className="font-display font-bold text-sm text-rose-dark">{tm.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[800px] mx-auto px-5 py-16">
        <div className="text-center p-10 sm:p-16 bg-gradient-to-br from-rose-poudre/[0.08] to-bleu-ciel/[0.08] rounded-[32px]">
          <h2 className="font-display font-bold text-2xl text-gray-600 mb-3">{t(lang, "Prêt(e) à découvrir nos trésors ?", "Pare pou dekouvri trezò nou yo ?")}</h2>
          <p className="text-gray-400 mb-6">{t(lang, "Contactez-nous sur WhatsApp pour un service personnalisé", "Kontakte nou sou WhatsApp pou yon sèvis pèsonalize")}</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/boutique" className="bg-gradient-to-r from-rose-poudre to-rose-dark text-white font-display font-semibold px-8 py-3.5 rounded-full shadow-md flex items-center justify-center">{t(lang, "Voir la Boutique", "Wè Boutik la")}</Link>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white font-display font-semibold px-8 py-3.5 rounded-full shadow-md flex items-center justify-center">WhatsApp</a>
          </div>
        </div>
      </section>

      <WhatsAppFloat />
    </>
  );
}
