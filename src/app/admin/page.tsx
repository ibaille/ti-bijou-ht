"use client";

import { useState, useEffect } from "react";
import { Package, MessageSquare, Eye, AlertTriangle, Loader2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Product, Message } from "@/lib/types";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [prodRes, msgRes] = await Promise.all([
          supabase.from("products").select("*").order("views", { ascending: false }),
          supabase.from("messages").select("*").order("created_at", { ascending: false }),
        ]);
        if (prodRes.data) setProducts(prodRes.data as Product[]);
        if (msgRes.data) setMessages(msgRes.data as Message[]);
      } catch { /* empty */ }
      setLoaded(true);
    })();
  }, []);

  const totalProducts = products.length;
  const totalMessages = messages.length;
  const unreadMessages = messages.filter((m) => m.status === "unread").length;
  const totalViews = products.reduce((sum, p) => sum + (p.views || 0), 0);
  const lowStock = products.filter((p) => p.stock <= 5).length;
  const topProducts = products.slice(0, 5);
  const recentMessages = messages.slice(0, 5);

  if (!loaded) {
    return (
      <div className="text-center py-20">
        <Loader2 size={28} className="mx-auto animate-spin text-rose-poudre mb-3" />
        <p className="text-sm text-gray-400">Chargement du dashboard...</p>
      </div>
    );
  }

  const stats = [
    { label: "Produits actifs", value: totalProducts, icon: Package, color: "bg-bleu-ciel/10 text-blue-600" },
    { label: "Messages", value: `${unreadMessages} / ${totalMessages}`, sub: "non lus / total", icon: MessageSquare, color: "bg-rose-poudre/10 text-rose-dark" },
    { label: "Vues totales", value: totalViews, icon: Eye, color: "bg-menthe/10 text-emerald-600" },
    { label: "Stock faible", value: lowStock, icon: AlertTriangle, color: "bg-sable/10 text-amber-600" },
  ];

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm">
              <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
                <Icon size={20} />
              </div>
              <div className="text-2xl font-display font-bold text-gray-700">{s.value}</div>
              <div className="text-xs text-gray-400 font-semibold">{s.label}</div>
              {s.sub && <div className="text-[10px] text-gray-300">{s.sub}</div>}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-display font-bold text-base text-gray-600 mb-4">
            {totalProducts > 0 ? "Produits les plus vus" : "Produits"}
          </h3>
          {topProducts.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <Package size={28} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">Aucun produit encore.</p>
              <a href="/admin/produits" className="text-rose-dark text-sm font-display font-semibold hover:underline">
                Ajouter votre premier produit →
              </a>
            </div>
          ) : (
            <div className="space-y-3">
              {topProducts.map((p, i) => (
                <div key={p.id} className="flex items-center gap-4 py-2 border-b border-gray-50 last:border-0">
                  <span className="text-sm font-bold text-gray-300 w-6">{i + 1}</span>
                  {p.images?.[0] && <img src={p.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-display font-semibold text-gray-600 truncate">{p.name}</div>
                    <div className="text-xs text-gray-400">{formatPrice(p.price)} · Stock: {p.stock}</div>
                  </div>
                  <div className="text-sm font-bold text-gray-400">{p.views || 0} vues</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Messages */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-display font-bold text-base text-gray-600 mb-4">
            {totalMessages > 0 ? "Messages récents" : "Messages"}
          </h3>
          {recentMessages.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <MessageSquare size={28} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">Aucun message reçu.</p>
              <p className="text-xs text-gray-300 mt-1">Les messages des clients apparaîtront ici.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentMessages.map((m) => (
                <div key={m.id} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${m.status === "unread" ? "bg-rose-dark" : m.status === "read" ? "bg-bleu-ciel" : "bg-menthe"}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-display font-semibold text-gray-600">{m.name}</div>
                    <div className="text-xs text-gray-400 truncate">{m.message}</div>
                    <div className="text-[10px] text-gray-300 mt-0.5">
                      {new Date(m.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                      {m.product_name && <span className="ml-2 text-lavande">· {m.product_name}</span>}
                    </div>
                  </div>
                </div>
              ))}
              <a href="/admin/messages" className="text-rose-dark text-sm font-display font-semibold hover:underline block text-center mt-2">
                Voir tous les messages →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
