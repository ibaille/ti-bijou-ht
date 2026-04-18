"use client";

import { Package, MessageSquare, Eye, TrendingUp } from "lucide-react";
import { DEMO_PRODUCTS } from "@/lib/data";

export default function AdminDashboard() {
  const totalProducts = DEMO_PRODUCTS.length;
  const totalViews = DEMO_PRODUCTS.reduce((sum, p) => sum + p.views, 0);
  const lowStock = DEMO_PRODUCTS.filter((p) => p.stock <= 5).length;

  const stats = [
    { label: "Produits actifs", value: totalProducts, icon: Package, color: "bg-bleu-ciel/10 text-blue-600" },
    { label: "Messages", value: 8, icon: MessageSquare, color: "bg-rose-poudre/10 text-rose-dark" },
    { label: "Vues totales", value: totalViews, icon: Eye, color: "bg-menthe/10 text-emerald-600" },
    { label: "Stock faible", value: lowStock, icon: TrendingUp, color: "bg-sable/10 text-amber-600" },
  ];

  const topProducts = [...DEMO_PRODUCTS].sort((a, b) => b.views - a.views).slice(0, 5);

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
            </div>
          );
        })}
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-display font-bold text-base text-gray-600 mb-4">Produits les plus vus</h3>
        <div className="space-y-3">
          {topProducts.map((p, i) => (
            <div key={p.id} className="flex items-center gap-4 py-2 border-b border-gray-50 last:border-0">
              <span className="text-sm font-bold text-gray-300 w-6">{i + 1}</span>
              <img src={p.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-display font-semibold text-gray-600 truncate">{p.name}</div>
                <div className="text-xs text-gray-400">Stock: {p.stock}</div>
              </div>
              <div className="text-sm font-bold text-gray-500">{p.views} vues</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
