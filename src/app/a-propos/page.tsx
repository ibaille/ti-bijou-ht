"use client";

import Logo from "@/components/ui/Logo";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import { useStore } from "@/lib/store";
import { t } from "@/lib/utils";

export default function AProposPage() {
  const { lang } = useStore();

  return (
    <div className="max-w-[700px] mx-auto px-5 pt-28 pb-16">
      <div className="flex justify-center mb-10">
        <Logo size="lg" />
      </div>

      <h1 className="font-display font-bold text-2xl sm:text-3xl text-gray-600 text-center mb-8">
        {t(lang, "Notre Histoire", "Istwa Nou")}
      </h1>

      <div className="text-base text-gray-500 leading-[2] space-y-4">
        <p>
          {t(
            lang,
            "Ti Bijou Haïti est né d'un constat simple : les mamans haïtiennes méritent un espace en ligne fiable, élégant et complet pour trouver les plus beaux articles pour leurs nouveau-nés.",
            "Ti Bijou Ayiti fèt nan yon konsta senp: manman ayisyèn yo merite yon espas sou entènèt ki fyab, elegan e konplè pou jwenn pi bèl atik pou nouvo-ne yo."
          )}
        </p>
        <p>
          {t(
            lang,
            "Chaque article est sélectionné avec amour et rigueur pour garantir qualité, confort et sécurité. Nous croyons que chaque bébé est un petit bijou qui mérite ce qu'il y a de mieux.",
            "Chak atik chwazi ak lanmou ak rigè pou garanti kalite, konfò ak sekirite. Nou kwè chak tibebe se yon ti bijou ki merite sa ki pi bon."
          )}
        </p>
        <p>
          {t(
            lang,
            "Notre mission est de rendre accessible aux familles haïtiennes des produits de qualité à des prix justes, avec un service personnalisé et chaleureux.",
            "Misyon nou se fè pwodui bon kalite aksesib pou fanmi ayisyèn yo nan bon pri, ak yon sèvis pèsonalize e chalere."
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-12">
        {[
          { emoji: "💝", titleFr: "Amour", titleHt: "Lanmou", descFr: "Chaque sélection faite avec cœur", descHt: "Chak seleksyon fèt ak kè" },
          { emoji: "🌟", titleFr: "Qualité", titleHt: "Kalite", descFr: "Standards élevés, prix justes", descHt: "Estanda wo, pri jis" },
          { emoji: "🤝", titleFr: "Confiance", titleHt: "Konfyans", descFr: "Service transparent et fiable", descHt: "Sèvis transparan e fyab" },
        ].map((v, i) => (
          <div key={i} className="text-center p-6 bg-white rounded-[20px] shadow-sm">
            <div className="text-4xl mb-2">{v.emoji}</div>
            <div className="font-display font-bold text-gray-600 mb-1">{t(lang, v.titleFr, v.titleHt)}</div>
            <div className="text-sm text-gray-400">{t(lang, v.descFr, v.descHt)}</div>
          </div>
        ))}
      </div>

      <WhatsAppFloat />
    </div>
  );
}
