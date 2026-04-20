"use client";

import { useState, useEffect, useCallback } from "react";
import { Mail, MailOpen, CheckCircle, Clock, Loader2 } from "lucide-react";
import { Message } from "@/lib/types";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Message | null>(null);

  const loadMessages = useCallback(async () => {
    try {
      const { data, error } = await supabase.from("messages").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      if (data) setMessages(data as Message[]);
    } catch { toast.error("Erreur de chargement"); }
    setLoaded(true);
  }, []);

  useEffect(() => { loadMessages(); }, [loadMessages]);

  const filtered = messages.filter((m) => filter === "all" || m.status === filter);
  const unreadCount = messages.filter((m) => m.status === "unread").length;

  const updateStatus = async (id: string, status: "read" | "handled") => {
    try {
      const { error } = await supabase.from("messages").update({ status }).eq("id", id);
      if (error) throw error;
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
      if (selected?.id === id) setSelected({ ...selected, status });
    } catch { toast.error("Erreur de mise à jour"); }
  };

  const statusIcon = (s: string) => {
    if (s === "unread") return <Mail size={14} className="text-rose-dark" />;
    if (s === "read") return <MailOpen size={14} className="text-bleu-ciel" />;
    return <CheckCircle size={14} className="text-emerald-500" />;
  };

  const statusLabel = (s: string) => s === "unread" ? "Non lu" : s === "read" ? "Lu" : "Traité";

  if (!loaded) {
    return (
      <div className="text-center py-20">
        <Loader2 size={28} className="mx-auto animate-spin text-rose-poudre mb-3" />
        <p className="text-sm text-gray-400">Chargement des messages...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          { key: "all", label: `Tous (${messages.length})` },
          { key: "unread", label: `Non lus (${unreadCount})` },
          { key: "read", label: "Lus" },
          { key: "handled", label: "Traités" },
        ].map((f) => (
          <button key={f.key} onClick={() => setFilter(f.key)} className={`px-4 py-2 rounded-full text-sm font-display font-semibold transition-colors flex items-center justify-center ${filter === f.key ? "bg-rose-poudre/20 text-rose-dark" : "bg-white text-gray-500 hover:bg-gray-50"}`}>
            {f.label}
          </button>
        ))}
      </div>

      {messages.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 shadow-sm text-center text-gray-400">
          <Mail size={36} className="mx-auto mb-3 opacity-30" />
          <p className="font-display font-semibold mb-1">Aucun message</p>
          <p className="text-sm text-gray-300">Les messages de vos clients apparaîtront ici.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Message List */}
          <div className="lg:col-span-1 space-y-2">
            {filtered.map((m) => (
              <button
                key={m.id}
                onClick={() => { setSelected(m); if (m.status === "unread") updateStatus(m.id, "read"); }}
                className={`w-full text-left p-4 rounded-xl transition-all ${selected?.id === m.id ? "bg-rose-poudre/10 border-2 border-rose-poudre/30" : "bg-white border-2 border-transparent hover:border-gray-100"} shadow-sm`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-display font-bold text-sm text-gray-600">{m.name}</span>
                  {statusIcon(m.status)}
                </div>
                <p className="text-xs text-gray-400 truncate">{m.message}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] text-gray-300">
                    {new Date(m.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                  </span>
                  {m.product_name && <span className="text-[10px] bg-lavande/20 text-purple-700 px-2 py-0.5 rounded-full">{m.type === "interest" ? "Intérêt" : "Contact"}</span>}
                </div>
              </button>
            ))}
            {filtered.length === 0 && <div className="text-center py-10 text-gray-400 text-sm">Aucun message dans cette catégorie</div>}
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selected ? (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-bold text-lg text-gray-600">{selected.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">{statusIcon(selected.status)} {statusLabel(selected.status)}</div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="text-[10px] text-gray-400 font-semibold mb-0.5">Téléphone</div>
                    <a href={`tel:${selected.phone}`} className="text-sm text-gray-600 font-semibold">{selected.phone}</a>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="text-[10px] text-gray-400 font-semibold mb-0.5">Email</div>
                    <div className="text-sm text-gray-600">{selected.email || "—"}</div>
                  </div>
                  {selected.product_name && (
                    <div className="bg-lavande/10 rounded-xl p-3 col-span-2">
                      <div className="text-[10px] text-gray-400 font-semibold mb-0.5">Produit</div>
                      <div className="text-sm text-gray-600 font-semibold">{selected.product_name}</div>
                    </div>
                  )}
                </div>
                <div className="bg-gray-50 rounded-xl p-4 mb-5">
                  <div className="text-[10px] text-gray-400 font-semibold mb-1">Message</div>
                  <p className="text-sm text-gray-600 leading-relaxed">{selected.message}</p>
                </div>
                <div className="text-xs text-gray-300 mb-4">
                  Reçu le {new Date(selected.created_at).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                </div>
                <div className="flex gap-2 flex-wrap">
                  <a href={`https://wa.me/${selected.phone.replace(/\s/g, "").replace("+", "")}`} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white text-sm font-display font-semibold px-5 py-2.5 rounded-full flex items-center justify-center">
                    Répondre WhatsApp
                  </a>
                  {selected.status !== "handled" && (
                    <button onClick={() => updateStatus(selected.id, "handled")} className="bg-menthe/20 text-emerald-700 text-sm font-display font-semibold px-5 py-2.5 rounded-full flex items-center justify-center">
                      Marquer traité ✓
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-10 shadow-sm text-center text-gray-400">
                <Clock size={32} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">Sélectionnez un message</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
