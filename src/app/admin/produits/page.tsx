"use client";
import { useState, useRef } from "react";
import { Plus, Edit, Trash2, Search, Upload, X, Image as ImageIcon } from "lucide-react";
import { DEMO_PRODUCTS, DEMO_CATEGORIES } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/lib/types";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

export default function AdminProductsPage() {
  const [products, setProducts] = useState(DEMO_PRODUCTS);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({ name: "", name_ht: "", description: "", description_ht: "", price: "", old_price: "", category_id: "", gender: "unisexe", age_range: "0-3", stock: "", badge: "", is_coup_coeur: false, colors: "", sizes: "" });

  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  const openNew = () => { setEditing(null); setForm({ name: "", name_ht: "", description: "", description_ht: "", price: "", old_price: "", category_id: "", gender: "unisexe", age_range: "0-3", stock: "", badge: "", is_coup_coeur: false, colors: "", sizes: "" }); setImageUrls([]); setShowForm(true); };

  const openEdit = (p: Product) => { setEditing(p); setForm({ name: p.name, name_ht: p.name_ht, description: p.description, description_ht: p.description_ht, price: p.price.toString(), old_price: p.old_price?.toString() || "", category_id: p.category_id, gender: p.gender, age_range: p.age_range, stock: p.stock.toString(), badge: p.badge || "", is_coup_coeur: p.is_coup_coeur, colors: p.colors.join(", "), sizes: p.sizes.join(", ") }); setImageUrls(p.images || []); setShowForm(true); };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files; if (!files || files.length === 0) return;
    setUploading(true); const urls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i]; const ext = file.name.split(".").pop();
      const path = `products/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
      try {
        const { error } = await supabase.storage.from("product-images").upload(path, file, { cacheControl: "3600", upsert: false });
        if (error) { toast.error(`Erreur: ${file.name}`); continue; }
        const { data } = supabase.storage.from("product-images").getPublicUrl(path);
        if (data?.publicUrl) urls.push(data.publicUrl);
      } catch { toast.error(`Erreur: ${file.name}`); }
    }
    if (urls.length > 0) { setImageUrls((prev) => [...prev, ...urls]); toast.success(`${urls.length} image(s) uploadée(s)`); }
    setUploading(false); if (fileRef.current) fileRef.current.value = "";
  };

  const handleSave = () => {
    if (!form.name || !form.price) { toast.error("Nom et prix obligatoires"); return; }
    if (imageUrls.length === 0) { toast.error("Ajoutez au moins une image"); return; }
    const data = {
      name: form.name, name_ht: form.name_ht || form.name, description: form.description, description_ht: form.description_ht || form.description,
      price: Number(form.price), old_price: form.old_price ? Number(form.old_price) : null, category_id: form.category_id,
      gender: form.gender as "fille" | "garcon" | "unisexe", age_range: form.age_range as "0-3" | "3-6" | "6-12",
      stock: Number(form.stock) || 0, badge: (form.badge || null) as "new" | "popular" | "limited" | null, is_coup_coeur: form.is_coup_coeur,
      colors: form.colors ? form.colors.split(",").map((c) => c.trim()).filter(Boolean) : [],
      sizes: form.sizes ? form.sizes.split(",").map((s) => s.trim()).filter(Boolean) : [], images: imageUrls,
    };
    if (editing) { setProducts((prev) => prev.map((p) => p.id === editing.id ? { ...p, ...data } : p)); toast.success("Produit modifié !"); }
    else { setProducts((prev) => [{ id: `prod-${Date.now()}`, ...data, is_featured: false, is_active: true, views: 0, created_at: new Date().toISOString() }, ...prev]); toast.success("Produit créé !"); }
    setShowForm(false);
  };

  const handleDelete = (id: string) => { if (confirm("Supprimer ce produit ?")) { setProducts((prev) => prev.filter((p) => p.id !== id)); toast.success("Supprimé"); } };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-sm"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="text" placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full py-2.5 pl-9 pr-4 border-2 border-gray-100 rounded-xl text-sm bg-white" /></div>
        <button onClick={openNew} className="bg-gradient-to-r from-rose-poudre to-rose-dark text-white font-display font-semibold px-5 py-2.5 rounded-full text-sm flex items-center gap-2 shadow-md justify-center"><Plus size={16} /> Ajouter un produit</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowForm(false)} />
          <div className="relative bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 p-1 text-gray-400 flex items-center justify-center"><X size={18} /></button>
            <h3 className="font-display font-bold text-lg text-gray-600 mb-5">{editing ? "Modifier le produit" : "Nouveau produit"}</h3>

            <div className="mb-5">
              <label className="font-display font-semibold text-xs text-gray-400 uppercase tracking-wide mb-2 block">Photos *</label>
              {imageUrls.length > 0 && <div className="flex gap-2 flex-wrap mb-3">{imageUrls.map((url, i) => (
                <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-gray-100 group">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                  <button onClick={() => setImageUrls((p) => p.filter((_, j) => j !== i))} className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><X size={12} /></button>
                  {i === 0 && <span className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[9px] text-center py-0.5">Principal</span>}
                </div>
              ))}</div>}
              <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" />
              <button onClick={() => fileRef.current?.click()} disabled={uploading} className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-400 hover:border-rose-poudre hover:text-rose-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                {uploading ? "Envoi en cours..." : <><Upload size={18} />{imageUrls.length === 0 ? "Cliquez pour ajouter des photos" : "Ajouter d'autres photos"}</>}
              </button>
              <p className="text-[11px] text-gray-300 mt-1">La première image sera l&apos;image principale.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input className="col-span-full py-2.5 px-3 border-2 border-gray-100 rounded-xl text-sm bg-white" placeholder="Nom (Français) *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input className="col-span-full py-2.5 px-3 border-2 border-gray-100 rounded-xl text-sm bg-white" placeholder="Nom (Créole)" value={form.name_ht} onChange={(e) => setForm({ ...form, name_ht: e.target.value })} />
              <input className="py-2.5 px-3 border-2 border-gray-100 rounded-xl text-sm bg-white" placeholder="Prix HTG *" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              <input className="py-2.5 px-3 border-2 border-gray-100 rounded-xl text-sm bg-white" placeholder="Ancien prix" type="number" value={form.old_price} onChange={(e) => setForm({ ...form, old_price: e.target.value })} />
              <select className="py-2.5 px-3 border-2 border-gray-100 rounded-xl text-sm bg-white text-gray-500" value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })}><option value="">Catégorie</option>{DEMO_CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}</select>
              <select className="py-2.5 px-3 border-2 border-gray-100 rounded-xl text-sm bg-white text-gray-500" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}><option value="fille">👧 Fille</option><option value="garcon">👦 Garçon</option><option value="unisexe">👶 Unisexe</option></select>
              <select className="py-2.5 px-3 border-2 border-gray-100 rounded-xl text-sm bg-white text-gray-500" value={form.age_range} onChange={(e) => setForm({ ...form, age_range: e.target.value })}><option value="0-3">0-3 mois</option><option value="3-6">3-6 mois</option><option value="6-12">6-12 mois</option></select>
              <input className="py-2.5 px-3 border-2 border-gray-100 rounded-xl text-sm bg-white" placeholder="Stock" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
              <select className="py-2.5 px-3 border-2 border-gray-100 rounded-xl text-sm bg-white text-gray-500" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })}><option value="">Aucun badge</option><option value="new">🆕 Nouveau</option><option value="popular">🔥 Populaire</option><option value="limited">⚡ Stock limité</option></select>
              <input className="py-2.5 px-3 border-2 border-gray-100 rounded-xl text-sm bg-white" placeholder="Couleurs (Rose, Bleu...)" value={form.colors} onChange={(e) => setForm({ ...form, colors: e.target.value })} />
              <input className="py-2.5 px-3 border-2 border-gray-100 rounded-xl text-sm bg-white" placeholder="Tailles (NB, 0-3M...)" value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} />
              <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer"><input type="checkbox" checked={form.is_coup_coeur} onChange={(e) => setForm({ ...form, is_coup_coeur: e.target.checked })} className="w-4 h-4 rounded accent-rose-dark" /> 💝 Coup de cœur</label>
              <textarea className="col-span-full py-2.5 px-3 border-2 border-gray-100 rounded-xl text-sm bg-white min-h-[80px] resize-y" placeholder="Description (Français)" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              <textarea className="col-span-full py-2.5 px-3 border-2 border-gray-100 rounded-xl text-sm bg-white min-h-[80px] resize-y" placeholder="Description (Créole)" value={form.description_ht} onChange={(e) => setForm({ ...form, description_ht: e.target.value })} />
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={handleSave} className="flex-1 bg-gradient-to-r from-rose-poudre to-rose-dark text-white font-display font-semibold py-3 rounded-full flex items-center justify-center">{editing ? "💾 Enregistrer" : "✨ Créer"}</button>
              <button onClick={() => setShowForm(false)} className="px-6 py-3 border-2 border-gray-200 rounded-full text-sm text-gray-500 font-display font-semibold flex items-center justify-center">Annuler</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100"><tr>
              <th className="text-left px-4 py-3 font-display font-semibold text-gray-400 text-xs">Produit</th>
              <th className="text-left px-4 py-3 font-display font-semibold text-gray-400 text-xs hidden sm:table-cell">Catégorie</th>
              <th className="text-left px-4 py-3 font-display font-semibold text-gray-400 text-xs">Prix</th>
              <th className="text-left px-4 py-3 font-display font-semibold text-gray-400 text-xs hidden md:table-cell">Stock</th>
              <th className="text-right px-4 py-3 font-display font-semibold text-gray-400 text-xs">Actions</th>
            </tr></thead>
            <tbody>{filtered.map((p) => { const cat = DEMO_CATEGORIES.find((c) => c.id === p.category_id); return (
              <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="px-4 py-3"><div className="flex items-center gap-3"><img src={p.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" /><span className="font-display font-semibold text-gray-600 truncate max-w-[150px]">{p.name}</span></div></td>
                <td className="px-4 py-3 text-gray-400 hidden sm:table-cell">{cat?.icon} {cat?.name}</td>
                <td className="px-4 py-3 font-bold text-rose-dark">{formatPrice(p.price)}</td>
                <td className="px-4 py-3 hidden md:table-cell"><span className={`px-2 py-1 rounded-full text-xs font-bold ${p.stock <= 5 ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>{p.stock}</span></td>
                <td className="px-4 py-3 text-right"><div className="flex justify-end gap-1">
                  <button onClick={() => openEdit(p)} className="p-2 text-gray-400 hover:text-bleu-ciel transition-colors flex items-center justify-center"><Edit size={16} /></button>
                  <button onClick={() => handleDelete(p.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors flex items-center justify-center"><Trash2 size={16} /></button>
                </div></td>
              </tr>
            ); })}</tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="text-center py-10 text-gray-400 text-sm"><ImageIcon size={32} className="mx-auto mb-2 opacity-30" />Aucun produit</div>}
      </div>
    </div>
  );
}
