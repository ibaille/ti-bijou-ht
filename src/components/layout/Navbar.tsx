"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, Heart, Globe } from "lucide-react";
import Logo from "@/components/ui/Logo";
import SearchBar from "@/components/ui/SearchBar";
import { useStore } from "@/lib/store";
import { t } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", labelFr: "Accueil", labelHt: "Akèy" },
  { href: "/boutique", labelFr: "Boutique", labelHt: "Boutik" },
  { href: "/a-propos", labelFr: "À propos", labelHt: "Sou Nou" },
  { href: "/faq", labelFr: "FAQ", labelHt: "FAQ" },
  { href: "/contact", labelFr: "Contact", labelHt: "Kontak" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const { lang, toggleLang, favorites, searchOpen, setSearchOpen, mobileMenuOpen, setMobileMenuOpen } = useStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [pathname, setMobileMenuOpen, setSearchOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 px-5 py-3 ${
          scrolled ? "bg-cream/95 backdrop-blur-xl border-b border-rose-poudre/15 shadow-sm" : ""
        }`}
      >
        <div className="max-w-[1200px] mx-auto flex justify-between items-center">
          <Link href="/">
            <Logo size={scrolled ? "sm" : "md"} />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-display font-semibold text-sm relative pb-1 transition-colors hover:text-rose-dark ${
                  pathname === item.href ? "text-rose-dark" : "text-gray-500"
                }`}
              >
                {t(lang, item.labelFr, item.labelHt)}
                {pathname === item.href && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-dark rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="text-xs font-display font-bold text-rose-dark border-2 border-rose-poudre/30 rounded-full px-2.5 py-1 hover:bg-rose-poudre/10 transition-colors flex items-center justify-center"
            >
              {lang === "fr" ? "HT" : "FR"}
            </button>
            <button onClick={() => setSearchOpen(true)} className="p-2 text-gray-400 hover:text-rose-dark transition-colors flex items-center justify-center">
              <Search size={20} />
            </button>
            <Link href="/boutique?favorites=true" className="p-2 text-gray-400 hover:text-rose-dark transition-colors relative flex items-center justify-center">
              <Heart size={20} />
              {favorites.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-dark text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-gray-500 flex items-center justify-center"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[200]">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute top-0 right-0 bottom-0 w-[85%] max-w-[360px] bg-cream shadow-2xl p-8 pt-20 flex flex-col gap-2 animate-slide-in">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-5 right-5 p-2 text-gray-400 flex items-center justify-center"
            >
              <X size={24} />
            </button>
            <div className="mb-6"><Logo size="lg" /></div>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-display font-semibold text-lg py-3.5 border-b border-gray-100 transition-colors ${
                  pathname === item.href ? "text-rose-dark" : "text-gray-500"
                }`}
              >
                {t(lang, item.labelFr, item.labelHt)}
              </Link>
            ))}
            <Link
              href="/boutique?favorites=true"
              onClick={() => setMobileMenuOpen(false)}
              className="font-display font-semibold text-lg py-3.5 border-b border-gray-100 text-gray-500"
            >
              {t(lang, "Mes Favoris", "Favori Mwen")} ({favorites.length})
            </Link>
            <div className="mt-auto pt-6">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "50940000000"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-display font-semibold py-3.5 rounded-full shadow-lg w-full"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Search overlay */}
      <SearchBar />
    </>
  );
}
