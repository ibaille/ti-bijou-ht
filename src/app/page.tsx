"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, ChevronDown } from "lucide-react";
import Logo from "@/components/ui/Logo";
import ProductCard from "@/components/ui/ProductCard";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import { useStore } from "@/lib/store";
import { t, WHATSAPP_NUMBER } from "@/lib/utils";
import { DEMO_PRODUCTS, DEMO_CATEGORIES, DEMO_TESTIMONIALS } from "@/lib/data";
import { Product } from "@/lib/types";
import { supabase } from "@/lib/supabase";

export default function HomePage() {
  const { lang } = useStore();
  const [products, setProducts] = useState<Product[]>(DEMO_PRODUCTS);
  useEffect(() => { (async () => { try { const { data } = await supabase.from("products").select("*").eq("is_active", true).order("created_at", { ascending: false }); if (data && data.length > 0) setProducts(data as Product[]); } catch {} })(); }, []);
  const newProducts = products.filter((p) => p.badge === "new").slice(0, 4);
  const coupCoeur = products.filter((p) => p.is_coup_coeur).slice(0, 4);
  return (<>
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-28 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"><div className="absolute w-32 h-32 rounded-full bg-rose-poudre/5 top-[10%] left-[5%] animate-float" /><div className="absolute w-20 h-20 rounded-full bg-bleu-ciel/[0.08] top-[20%] right-[10%] animate-float" style={{animationDelay:"1s"}} /><div className="absolute w-24 h-24 rounded-full bg-lavande/5 bottom-[20%] left-[15%] animate-float" style={{animationDelay:"2s"}} /></div>
      <div className="relative z-10 max-w-[600px] animate-fade-in-up">
        <p className="text-xs font-display font-semibold text-lavande tracking-[4px] uppercase mb-4">{t(lang,"Bienvenue chez","Byenveni nan")}</p>
        <div className="flex justify-center mb-6"><Logo size="lg" /></div>
        <h1 className="font-display font-bold text-3xl sm:text-5xl text-gray-600 leading-tight mb-4">{t(lang,"Le plus beau pour votre","Pi bèl bagay pou")} <span className="text-rose-dark">{t(lang,"petit trésor","ti trezò w")}</span></h1>
        <p className="text-base text-gray-400 leading-relaxed mb-8 max-w-md mx-auto">{t(lang,"Découvrez notre collection exclusive d'articles pour nouveau-nés en Haïti.","Dekouvri koleksyon eksklusif atik pou nouvo-ne Ayiti.")}</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/boutique" className="bg-gradient-to-r from-rose-poudre to-rose-dark text-white font-display font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-rose-poudre/30 flex items-center justify-center">{t(lang,"Découvrir la Collection","Dekouvri Koleksyon an")} ✨</Link>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white font-display font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-[#25D366]/30 flex items-center justify-center">WhatsApp</a>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float text-gray-300"><ChevronDown size={20} /></div>
    </section>
    <section className="max-w-[1200px] mx-auto px-5 py-16"><h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-600 text-center mb-2">{t(lang,"Nos Catégories","Kategori Nou yo")}</h2><p className="text-center text-gray-400 text-sm mb-10">{t(lang,"Tout ce dont votre bébé a besoin","Tout sa tibebe w bezwen")}</p><div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">{DEMO_CATEGORIES.map((cat)=>(<Link key={cat.id} href={`/boutique?category=${cat.slug}`} className="rounded-[20px] p-5 text-center transition-all duration-300 hover:-translate-y-1 border-2" style={{background:`linear-gradient(135deg,${cat.color}15,${cat.color}05)`,borderColor:`${cat.color}20`}}><div className="text-3xl mb-2">{cat.icon}</div><div className="font-display font-bold text-xs sm:text-sm text-gray-600">{t(lang,cat.name,cat.name_ht)}</div></Link>))}</div></section>
    {newProducts.length>0&&<section className="max-w-[1200px] mx-auto px-5 py-16"><h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-600 text-center mb-2">{t(lang,"Nouveautés","Nouvo Rive")}</h2><p className="text-center text-gray-400 text-sm mb-10">{t(lang,"Les derniers articles","Dènye atik yo")}</p><div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">{newProducts.map((p)=><ProductCard key={p.id} product={p}/>)}</div></section>}
    {coupCoeur.length>0&&<section className="max-w-[1200px] mx-auto px-5 py-16"><div className="bg-gradient-to-br from-rose-poudre/5 to-bleu-ciel/5 rounded-[32px] p-6 sm:p-10"><h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-600 text-center mb-2">{t(lang,"Coups de Cœur","Koudkè")} 💝</h2><p className="text-center text-gray-400 text-sm mb-10">{t(lang,"Notre sélection spéciale","Seleksyon espesyal nou")}</p><div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">{coupCoeur.map((p)=><ProductCard key={p.id} product={p}/>)}</div></div></section>}
    <section className="max-w-[1200px] mx-auto px-5 py-16"><h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-600 text-center mb-10">{t(lang,"Pourquoi Ti Bijou ?","Poukisa Ti Bijou ?")}</h2><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">{[{i:"✨",f:"Qualité Premium",h:"Kalite Premyòm",df:"Articles sélectionnés avec soin",dh:"Atik chwazi ak swen"},{i:"👶",f:"100% Bébé",h:"100% Tibebe",df:"Spécialisé nouveau-nés",dh:"Espesyalize nan nouvo-ne"},{i:"🚚",f:"Livraison Haïti",h:"Livrezon Ayiti",df:"Partout en Haïti",dh:"Toupatou nan Ayiti"},{i:"🛡️",f:"Service Personnalisé",h:"Sèvis Pèsonalize",df:"Conseil WhatsApp",dh:"Konsèy WhatsApp"}].map((x,j)=>(<div key={j} className="text-center p-7 rounded-3xl bg-white shadow-sm"><div className="text-3xl mb-3">{x.i}</div><div className="font-display font-bold text-base text-gray-600 mb-2">{t(lang,x.f,x.h)}</div><div className="text-sm text-gray-400">{t(lang,x.df,x.dh)}</div></div>))}</div></section>
    <section className="max-w-[1200px] mx-auto px-5 py-16"><h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-600 text-center mb-10">{t(lang,"Ce que disent les Mamans","Sa Manman yo Di")}</h2><div className="grid grid-cols-1 md:grid-cols-3 gap-5">{DEMO_TESTIMONIALS.map((tm)=>(<div key={tm.id} className="bg-white rounded-[20px] p-6 shadow-sm"><div className="flex gap-1 mb-3">{[...Array(tm.rating)].map((_,j)=><Star key={j} size={16} fill="#F4D7A7" stroke="#F4D7A7"/>)}</div><p className="text-sm text-gray-500 leading-relaxed mb-4 italic">&ldquo;{t(lang,tm.text_fr,tm.text_ht)}&rdquo;</p><div className="font-display font-bold text-sm text-rose-dark">{tm.name}</div></div>))}</div></section>
    <section className="max-w-[800px] mx-auto px-5 py-16"><div className="text-center p-10 sm:p-16 bg-gradient-to-br from-rose-poudre/[0.08] to-bleu-ciel/[0.08] rounded-[32px]"><h2 className="font-display font-bold text-2xl text-gray-600 mb-3">{t(lang,"Prêt(e) à découvrir nos trésors ?","Pare pou dekouvri trezò nou yo ?")}</h2><p className="text-gray-400 mb-6">{t(lang,"Contactez-nous sur WhatsApp","Kontakte nou sou WhatsApp")}</p><div className="flex gap-3 justify-center flex-wrap"><Link href="/boutique" className="bg-gradient-to-r from-rose-poudre to-rose-dark text-white font-display font-semibold px-8 py-3.5 rounded-full shadow-md flex items-center justify-center">{t(lang,"Voir la Boutique","Wè Boutik la")}</Link><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white font-display font-semibold px-8 py-3.5 rounded-full shadow-md flex items-center justify-center">WhatsApp</a></div></div></section>
    <WhatsAppFloat/>
  </>);
}
