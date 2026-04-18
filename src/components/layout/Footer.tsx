"use client";

import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { useStore } from "@/lib/store";
import { t, WHATSAPP_NUMBER } from "@/lib/utils";
import { DEMO_CATEGORIES } from "@/lib/data";
import { Mail, MapPin } from "lucide-react";

export default function Footer() {
  const { lang } = useStore();

  return (
    <footer className="bg-gradient-to-br from-[#FFF0F4] to-[#F0F4FF] mt-10">
      <div className="max-w-[1200px] mx-auto px-5 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Logo size="md" />
            <p className="text-sm text-gray-400 leading-relaxed mt-3">
              {t(lang, "Le meilleur pour votre petit trésor en Haïti", "Pi bon an pou ti trezò w nan Ayiti")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-bold text-sm text-gray-600 mb-3">
              {t(lang, "Navigation", "Navigasyon")}
            </h4>
            <div className="flex flex-col gap-1">
              {[
                { href: "/", fr: "Accueil", ht: "Akèy" },
                { href: "/boutique", fr: "Boutique", ht: "Boutik" },
                { href: "/a-propos", fr: "À propos", ht: "Sou Nou" },
                { href: "/faq", fr: "FAQ", ht: "FAQ" },
                { href: "/contact", fr: "Contact", ht: "Kontak" },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="text-sm text-gray-400 hover:text-rose-dark transition-colors py-1">
                  {t(lang, item.fr, item.ht)}
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display font-bold text-sm text-gray-600 mb-3">
              {t(lang, "Catégories", "Kategori")}
            </h4>
            <div className="flex flex-col gap-1">
              {DEMO_CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/boutique?category=${cat.slug}`}
                  className="text-sm text-gray-400 hover:text-rose-dark transition-colors py-1"
                >
                  {cat.icon} {t(lang, cat.name, cat.name_ht)}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-sm text-gray-600 mb-3">
              {t(lang, "Contact", "Kontak")}
            </h4>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#25D366] mb-2"
            >
              WhatsApp
            </a>
            <p className="flex items-center gap-2 text-sm text-gray-400 mb-1">
              <Mail size={14} /> info@tibijouht.com
            </p>
            <p className="flex items-center gap-2 text-sm text-gray-400">
              <MapPin size={14} /> Port-au-Prince, Haïti
            </p>
          </div>
        </div>

        <div className="border-t border-black/5 mt-8 pt-5 text-center text-xs text-gray-300">
          © 2026 Ti Bijou Haïti. {t(lang, "Tous droits réservés", "Tout dwa rezève")}.
        </div>
      </div>
    </footer>
  );
}
