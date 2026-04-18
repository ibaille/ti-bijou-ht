"use client";

import Link from "next/link";
import { Star, ChevronDown } from "lucide-react";
import Logo from "@/components/ui/Logo";
import ProductCard from "@/components/ui/ProductCard";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import { useStore } from "@/lib/store";
import { t, WHATSAPP_NUMBER } from "@/lib/utils";
import { DEMO_PRODUCTS, DEMO_CATEGORIES, DEMO_TESTIMONIALS } from "@/lib/data";

export default function HomePage() {
  const { lang } = useStore();

  const newProducts = DEMO_PRODUCTS.filter((p) => p.badge === "new");
  const coupCoeur = DEMO_PRODUCTS.filter((p) => p.is_coup_coeur);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-28 pb-16 relative overflow-hidden">
        {/* Decorative bubbles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-32 h-32 rounded-full bg-rose-poudre/5 top-[10%] left-[5%] animate-float" />
          <div className="absolute w-20 h-20 rounded-full bg-bleu-ciel/8 top-[20%] right-[10%] animate-float" style={{ animationDelay: "1s" }} />
          <div className="absolute w-24 h-24 rounded-full bg-lavande/5 bottom-[20%] left-[15%] animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute w-16 h-16 rounded-full bg-menthe/8 bottom-[30%] right-[20%] animate-float" style={{ animationDelay: "0.5s" }} />
          <div className="absolute w-40 h-40 rounded-full bg-sable/5 top-[50%] right-[5%] animate-float" style={{ animationDelay: "1.5s" }} />
        </div>

        <div className="relative z-10 max-w-[600px] animate-fade-in-up">
          <p className="text-xs font-display font-semibold text-lavande tracking-[4px] uppercase mb-4">
            {t(lang, "Bienvenue chez", "Byenveni nan")}
          </p>
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-5xl text-gray-600 leading-tight mb-4">
            {t(lang, "Le plus beau pour votre", "Pi bèl bagay pou")}{" "}
            <span className="text-rose-dark">{t(lang, "petit trésor", "ti trezò w")}</span>
          </h1>
          <p className="text-base text-gray-400 leading-relaxed mb-8 max-w-md mx-auto">
            {t(
              lang,
              "Découvrez notre collection exclusive d'articles pour nouveau-nés. Qualité, douceur et style pour les bébés d'Haïti.",
              "Dekouvri koleksyon eksklusif atik pou nouvo-ne nou yo. Kalite, dousè ak stil pou tibebe Ayiti."
            )}
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/boutique"
              className="bg-gradient-to-r from-rose-poudre to-rose-dark text-white font-display font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-rose-poudre/30 hover:shadow-xl transition-all flex items-center justify-center"
            >
              {t(lang, "Découvrir la Collection", "Dekouvri Koleksyon an")} ✨
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white font-display font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-[#25D366]/30 flex items-center justify-center"
            >
              WhatsApp
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float text-gray-300">
          <ChevronDown size={20} />
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="max-w-[1200px] mx-auto px-5 py-16">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-600 text-center mb-2">
          {t(lang, "Nos Catégories", "Kategori Nou yo")}
        </h2>
        <p className="text-center text-gray-400 text-sm mb-10">
          {t(lang, "Tout ce dont votre bébé a besoin", "Tout sa tibebe w bezwen")}
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
          {DEMO_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/boutique?category=${cat.slug}`}
              className="rounded-[20px] p-5 text-center transition-all duration-300 hover:-translate-y-1 border-2"
              style={{
                background: `linear-gradient(135deg, ${cat.color}15, ${cat.color}05)`,
                borderColor: `${cat.color}20`,
              }}
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <div className="font-display font-bold text-xs sm:text-sm text-gray-600">
                {t(lang, cat.name, cat.name_ht)}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== NOUVEAUTES ===== */}
      <section className="max-w-[1200px] mx-auto px-5 py-16">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-600 text-center mb-2">
          {t(lang, "Nouveautés", "Nouvo Rive")}
        </h2>
        <p className="text-center text-gray-400 text-sm mb-10">
          {t(lang, "Les derniers articles ajoutés", "Dènye atik ki sot rive")}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {newProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ===== COUPS DE COEUR ===== */}
      <section className="max-w-[1200px] mx-auto px-5 py-16">
        <div className="bg-gradient-to-br from-rose-poudre/5 to-bleu-ciel/5 rounded-[32px] p-6 sm:p-10">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-600 text-center mb-2">
            {t(lang, "Coups de Cœur", "Koudkè")} 💝
          </h2>
          <p className="text-center text-gray-400 text-sm mb-10">
            {t(lang, "Notre sélection spéciale pour vous", "Seleksyon espesyal nou pou ou")}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {coupCoeur.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== POURQUOI NOUS ===== */}
      <section className="max-w-[1200px] mx-auto px-5 py-16">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-600 text-center mb-2">
          {t(lang, "Pourquoi Ti Bijou ?", "Poukisa Ti Bijou ?")}
        </h2>
        <p className="text-center text-gray-400 text-sm mb-10">
          {t(lang, "Ce qui nous rend spéciaux", "Sa ki fè nou espesyal")}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: "✨", titleFr: "Qualité Premium", titleHt: "Kalite Premyòm", descFr: "Articles sélectionnés avec soin", descHt: "Atik ki chwazi ak swen" },
            { icon: "👶", titleFr: "100% Bébé", titleHt: "100% Tibebe", descFr: "Spécialisé nouveau-nés", descHt: "Espesyalize nan nouvo-ne" },
            { icon: "🚚", titleFr: "Livraison Haïti", titleHt: "Livrezon Ayiti", descFr: "Partout en Haïti", descHt: "Toupatou nan Ayiti" },
            { icon: "🛡️", titleFr: "Service Personnalisé", titleHt: "Sèvis Pèsonalize", descFr: "Conseil et suivi WhatsApp", descHt: "Konsèy ak swivi WhatsApp" },
          ].map((f, i) => (
            <div key={i} className="text-center p-7 rounded-3xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">{f.icon}</div>
              <div className="font-display font-bold text-base text-gray-600 mb-2">{t(lang, f.titleFr, f.titleHt)}</div>
              <div className="text-sm text-gray-400">{t(lang, f.descFr, f.descHt)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="max-w-[1200px] mx-auto px-5 py-16">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-600 text-center mb-2">
          {t(lang, "Ce que disent les Mamans", "Sa Manman yo Di")}
        </h2>
        <p className="text-center text-gray-400 text-sm mb-10">
          {t(lang, "Témoignages de nos clientes", "Temwayaj kliyan nou yo")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {DEMO_TESTIMONIALS.map((tm) => (
            <div key={tm.id} className="bg-white rounded-[20px] p-6 shadow-sm">
              <div className="flex gap-1 mb-3">
                {[...Array(tm.rating)].map((_, j) => (
                  <Star key={j} size={16} fill="#F4D7A7" stroke="#F4D7A7" />
                ))}
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-4 italic">
                &ldquo;{t(lang, tm.text_fr, tm.text_ht)}&rdquo;
              </p>
              <div className="font-display font-bold text-sm text-rose-dark">{tm.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="max-w-[800px] mx-auto px-5 py-16">
        <div className="text-center p-10 sm:p-16 bg-gradient-to-br from-rose-poudre/8 to-bleu-ciel/8 rounded-[32px]">
          <h2 className="font-display font-bold text-2xl text-gray-600 mb-3">
            {t(lang, "Prêt(e) à découvrir nos trésors ?", "Pare pou dekouvri trezò nou yo ?")}
          </h2>
          <p className="text-gray-400 mb-6">
            {t(lang, "Contactez-nous sur WhatsApp pour un service personnalisé", "Kontakte nou sou WhatsApp pou yon sèvis pèsonalize")}
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/boutique"
              className="bg-gradient-to-r from-rose-poudre to-rose-dark text-white font-display font-semibold px-8 py-3.5 rounded-full shadow-md flex items-center justify-center"
            >
              {t(lang, "Voir la Boutique", "Wè Boutik la")}
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white font-display font-semibold px-8 py-3.5 rounded-full shadow-md flex items-center justify-center"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <WhatsAppFloat />
    </>
  );
}
