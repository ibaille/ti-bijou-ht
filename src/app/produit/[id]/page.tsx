"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Heart, Share2 } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import InterestModal from "@/components/product/InterestModal";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import { useStore } from "@/lib/store";
import { t, formatPrice, getWhatsAppLink, WHATSAPP_NUMBER } from "@/lib/utils";
import { DEMO_PRODUCTS, DEMO_CATEGORIES } from "@/lib/data";
import { Product } from "@/lib/types";
import { supabase } from "@/lib/supabase";

export default function ProductPage() {
  const params = useParams();
  const { lang, favorites, toggleFavorite } = useStore();
  const [showInterest, setShowInterest] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState<Product | null>(null);
  const [similar, setSimilar] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await supabase.from("products").select("*").eq("id", params.id).single();
        if (data) {
          setProduct(data as Product);
          const { data: sim } = await supabase.from("products").select("*").eq("category_id", data.category_id).neq("id", data.id).eq("is_active", true).limit(4);
          if (sim) setSimilar(sim as Product[]);
        }
      } catch {
        // fallback to demo
        const demo = DEMO_PRODUCTS.find((p) => p.id === params.id);
        if (demo) { setProduct(demo); setSimilar(DEMO_PRODUCTS.filter((s) => s.category_id === demo.category_id && s.id !== demo.id).slice(0, 4)); }
      }
      setLoading(false);
    })();
  }, [params.id]);

  if (loading) return <div className="max-w-[1200px] mx-auto px-5 pt-28 text-center py-20 text-gray-400">Chargement...</div>;
  if (!product) return (<div className="max-w-[1200px] mx-auto px-5 pt-28 text-center py-20"><div className="text-5xl mb-4">😕</div><p className="text-gray-400 mb-4">{t(lang,"Produit non trouvé","Pa jwenn pwodui a")}</p><Link href="/boutique" className="text-rose-dark font-display font-semibold hover:underline">{t(lang,"Retour","Retounen")}</Link></div>);

  const p = product;
  const cat = DEMO_CATEGORIES.find((c) => c.id === p.category_id);
  const isFav = favorites.includes(p.id);
  const badges: Record<string,{cls:string,fr:string,ht:string}> = { new:{cls:"bg-menthe/80 text-emerald-800",fr:"Nouveau",ht:"Nouvo"}, popular:{cls:"bg-sable/80 text-amber-800",fr:"Populaire",ht:"Popilè"}, limited:{cls:"bg-rose-poudre/80 text-rose-900",fr:"Stock limité",ht:"Stòk limite"} };

  return (
    <div className="max-w-[1200px] mx-auto px-5 pt-28 pb-16">
      <Link href="/boutique" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-rose-dark transition-colors mb-6"><ChevronLeft size={18}/>{t(lang,"Retour","Retounen")}</Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="rounded-3xl overflow-hidden" style={{background:`linear-gradient(135deg,${cat?.color||"#eee"}15,#fff)`}}><img src={p.images?.[selectedImage]||p.images?.[0]} alt={p.name} className="w-full aspect-square object-cover"/></div>
          {p.images && p.images.length>1&&<div className="flex gap-2 mt-3">{p.images.map((img,i)=>(<button key={i} onClick={()=>setSelectedImage(i)} className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors flex items-center justify-center ${i===selectedImage?"border-rose-poudre":"border-gray-100"}`}><img src={img} alt="" className="w-full h-full object-cover"/></button>))}</div>}
        </div>
        <div>
          {p.badge&&badges[p.badge]&&<span className={`inline-block px-3.5 py-1 rounded-full text-xs font-display font-bold mb-3 ${badges[p.badge].cls}`}>{t(lang,badges[p.badge].fr,badges[p.badge].ht)}</span>}
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-gray-600 mb-2 leading-tight">{t(lang,p.name,p.name_ht)}</h1>
          <div className="flex items-center gap-3 mb-5"><span className="text-2xl sm:text-3xl font-bold text-rose-dark">{formatPrice(p.price)}</span>{p.old_price&&<span className="text-base text-gray-300 line-through">{formatPrice(p.old_price)}</span>}</div>
          <p className="text-base text-gray-500 leading-relaxed mb-6">{t(lang,p.description,p.description_ht)}</p>
          {p.colors&&p.colors.length>0&&<div className="mb-4"><div className="font-display font-semibold text-xs text-gray-400 mb-2 uppercase tracking-wide">{t(lang,"Couleurs","Koulè")}</div><div className="flex gap-2 flex-wrap">{p.colors.map((c)=><span key={c} className="px-3.5 py-1.5 rounded-full bg-gray-50 text-sm text-gray-500">{c}</span>)}</div></div>}
          {p.sizes&&p.sizes.length>0&&<div className="mb-6"><div className="font-display font-semibold text-xs text-gray-400 mb-2 uppercase tracking-wide">{t(lang,"Tailles","Tay")}</div><div className="flex gap-2">{p.sizes.map((s)=><span key={s} className="px-4 py-2 rounded-xl border-2 border-gray-100 text-sm font-display font-semibold text-gray-500">{s}</span>)}</div></div>}
          <div className="flex flex-col gap-2.5 mb-6">
            <button onClick={()=>setShowInterest(true)} className="w-full bg-gradient-to-r from-rose-poudre to-rose-dark text-white font-display font-semibold py-4 rounded-full shadow-lg shadow-rose-poudre/30 flex items-center justify-center">{t(lang,"Je suis intéressé(e)","M enterese")} 💌</button>
            <a href={getWhatsAppLink(WHATSAPP_NUMBER,p.name,p.price)} target="_blank" rel="noopener noreferrer" className="w-full bg-[#25D366] text-white font-display font-semibold py-4 rounded-full shadow-lg shadow-[#25D366]/30 text-center flex items-center justify-center">{t(lang,"Commander via WhatsApp","Kòmande sou WhatsApp")}</a>
          </div>
          <div className="flex gap-3 items-center">
            <button onClick={()=>toggleFavorite(p.id)} className="p-2.5 border-2 border-gray-100 rounded-xl hover:border-rose-poudre transition-colors flex items-center justify-center"><Heart size={20} fill={isFav?"#F4A7BB":"none"} stroke={isFav?"#F4A7BB":"#ccc"}/></button>
            <a href={`https://wa.me/?text=${encodeURIComponent(`Ti Bijou HT: ${p.name} — ${formatPrice(p.price)}`)}`} target="_blank" rel="noopener noreferrer" className="p-2.5 border-2 border-gray-100 rounded-xl text-[#25D366] hover:border-[#25D366] transition-colors flex items-center justify-center"><Share2 size={20}/></a>
          </div>
          <div className={`mt-4 px-4 py-3 rounded-xl text-sm ${p.stock<=5?"bg-rose-poudre/10 text-rose-900":"bg-menthe/10 text-emerald-700"}`}>{p.stock<=5?`⚠️ ${t(lang,`Plus que ${p.stock} en stock!`,`Sèlman ${p.stock} ki rete!`)}`:`✅ ${t(lang,"En stock","An stòk")}`}</div>
        </div>
      </div>
      {similar.length>0&&<div className="mt-16"><h2 className="font-display font-bold text-2xl text-gray-600 text-center mb-6">{t(lang,"Articles Similaires","Atik Ki Sanble")}</h2><div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">{similar.map((s)=><ProductCard key={s.id} product={s}/>)}</div></div>}
      {showInterest&&<InterestModal product={p} onClose={()=>setShowInterest(false)}/>}
      <WhatsAppFloat/>
    </div>
  );
}
