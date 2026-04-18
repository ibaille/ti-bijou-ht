"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Eye, Search } from "lucide-react";
import { DEMO_PRODUCTS, DEMO_CATEGORIES } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/lib/types";

export default function AdminProductsPage() {
  const [products, setProducts] = useState(DEMO_PRODUCTS);
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "", name_ht: "", description: "", description_ht: "",
    price: "", old_price: "", category_id: "", gender: "unisexe",
    age_range: "0-3", stock: "", badge: "", is_coup_coeur: false,
  });

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const openNew = () => {
    setEditingProduct(null);
    setForm({
      name: "", name_ht: "", description: "", description_ht: "",
      price: "", old_price: "", category_id: "", gender: "unisexe",
      age_range: "0-3", stock: "", badge: "", is_coup_coeur: false,
    });
    setShowForm(true);
  };

  const openEdit = (p: Product) => {
    setEditingProduct(p);
    setForm({
      name: p.name, name_ht: p.name_ht, description: p.description, description_ht: p.description_ht,
      price: p.price.toString(), old_price: p.old_price?.toString() || "",
      category_id: p.category_id, gender: p.gender, age_range: p.age_range,
      stock: p.stock.toString(), badge: p.badge || "", is_coup_coeur: p.is_coup_coeur,
    });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.name || !form.price) return;

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? { ...p, ...form, price: Number(form.price), old_price: form.old_price ? Number(form.old_price) : null, stock: Number(form.stock), badge: (form.badge || null) as any }
            : p
        )
      );
    } else {
      const newProduct: Product = {
        id: `prod-${Date.now()}`,
        ...form,
        price: Number(form.price),
        old_price: form.old_price ? Number(form.old_price) : null,
        stock: Number(form.stock),
        badge: (form.badge || null) as any,
        colors: [], sizes: [],
        images: ["https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop"],
        is_featured: false,
        is_active: true,
        views: 0,
        created_at: new Date().toISOString(),
      } as any;
      setProducts((prev) => [newProduct, ...prev]);
    }
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Supprimer ce produit ?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-2.5 pl-9 pr-4 border-2 border-gray-100 rounded-xl text-sm bg-white"
          />
        </div>
        <button
          onClick={openNew}
          className="bg-gradient-to-r from-rose-poudre to-rose-dark text-white font-display font-semibold px-5 py-2.5 rounded-full text-sm flex items-center gap-2 shadow-md justify-center"
        >
          <Plus size={16} /> Ajouter
        </button>
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowForm(false)} />
          <div className="relative bg-white rounded-2xl p-6 max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl">
            <h3 className="font-display font-bold text-lg text-gray-600 mb-4">
              {editingProduct ? "Modifier le produit" : "Nouveau produit"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input className="col-span-full py-2.5 px-3 border-2 border-gray-100 rounded-xl text-sm bg-white" placeholder="Nom (FR) *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input className="col-span-full py-2.5 px-3 border-2 border-gray-100 rounded-xl text-sm bg-white" placeholder="Nom (Créole)" value={form.name_ht} onChange={(e) => setForm({ ...form, name_ht: e.target.value })} />
              <input className="py-2.5 px-3 border-2 border-gray-100 rounded-xl text-sm bg-white" placeholder="Prix (HTG) *" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              <input className="py-2.5 px-3 border-2 border-gray-100 rounded-xl text-sm bg-white" placeholder="Ancien prix" type="number" value={form.old_price} onChange={(e) => setForm({ ...form, old_price: e.target.value })} />
              <select className="py-2.5 px-3 border-2 border-gray-100 rounded-xl text-sm bg-white text-gray-500" value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })}>
                <option value="">Catégorie</option>
                {DEMO_CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <select className="py-2.5 px-3 border-2 border-gray-100 rounded-xl text-sm bg-white text-gray-500" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
                <option value="fille">Fille</option>
                <option value="garcon">Garçon</option>
                <option value="unisexe">Unisexe</option>
              </select>
              <select className="py-2.5 px-3 border-2 border-gray-100 rounded-xl text-sm bg-white text-gray-500" value={form.age_range} onChange={(e) => setForm({ ...form, age_range: e.target.value })}>
                <option value="0-3">0-3 mois</option>
                <option value="3-6">3-6 mois</option>
                <option value="6-12">6-12 mois</option>
              </select>
              <input className="py-2.5 px-3 border-2 border-gray-100 rounded-xl text-sm bg-white" placeholder="Stock" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
              <select className="py-2.5 px-3 border-2 border-gray-100 rounded-xl text-sm bg-white text-gray-500" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })}>
                <option value="">Aucun badge</option>
                <option value="new">Nouveau</option>
                <option value="popular">Populaire</option>
                <option value="limited">Stock limité</option>
              </select>
              <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer col-span-full">
                <input type="checkbox" checked={form.is_coup_coeur} onChange={(e) => setForm({ ...form, is_coup_coeur: e.target.checked })} className="w-4 h-4 rounded" />
                Coup de cœur
              </label>
              <textarea className="col-span-full py-2.5 px-3 border-2 border-gray-100 rounded-xl text-sm bg-white min-h-[80px]" placeholder="Description (FR)" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              <textarea className="col-span-full py-2.5 px-3 border-2 border-gray-100 rounded-xl text-sm bg-white min-h-[80px]" placeholder="Description (Créole)" value={form.description_ht} onChange={(e) => setForm({ ...form, description_ht: e.target.value })} />
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={handleSave} className="flex-1 bg-gradient-to-r from-rose-poudre to-rose-dark text-white font-display font-semibold py-3 rounded-full flex items-center justify-center">
                {editingProduct ? "Enregistrer" : "Créer"}
              </button>
              <button onClick={() => setShowForm(false)} className="px-6 py-3 border-2 border-gray-200 rounded-full text-sm text-gray-500 font-display font-semibold flex items-center justify-center">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-display font-semibold text-gray-400 text-xs">Produit</th>
                <th className="text-left px-4 py-3 font-display font-semibold text-gray-400 text-xs hidden sm:table-cell">Catégorie</th>
                <th className="text-left px-4 py-3 font-display font-semibold text-gray-400 text-xs">Prix</th>
                <th className="text-left px-4 py-3 font-display font-semibold text-gray-400 text-xs hidden md:table-cell">Stock</th>
                <th className="text-left px-4 py-3 font-display font-semibold text-gray-400 text-xs hidden md:table-cell">Vues</th>
                <th className="text-right px-4 py-3 font-display font-semibold text-gray-400 text-xs">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const cat = DEMO_CATEGORIES.find((c) => c.id === p.category_id);
                return (
                  <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-25">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={p.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                        <span className="font-display font-semibold text-gray-600 truncate max-w-[150px]">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-400 hidden sm:table-cell">{cat?.icon} {cat?.name}</td>
                    <td className="px-4 py-3 font-bold text-rose-dark">{formatPrice(p.price)}</td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${p.stock <= 5 ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
                        {p.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 hidden md:table-cell">{p.views}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-1">
                        <button onClick={() => openEdit(p)} className="p-2 text-gray-400 hover:text-bleu-ciel transition-colors flex items-center justify-center">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDelete(p.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors flex items-center justify-center">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
