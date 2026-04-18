"use client";

import { useState } from "react";
import { Mail, MailOpen, CheckCircle, Clock } from "lucide-react";

interface DemoMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  product_name: string | null;
  type: "contact" | "interest";
  status: "unread" | "read" | "handled";
  created_at: string;
}

const DEMO_MESSAGES: DemoMessage[] = [
  { id: "msg-1", name: "Marie Joseph", phone: "+509 37 12 34 56", email: "marie@email.com", message: "Bonjou! M ta renmen konnen si ansanm layèt woz la disponib nan tay 3-6 mwa?", product_name: "Ensemble Layette Rose", type: "interest", status: "unread", created_at: "2026-04-10T08:30:00Z" },
  { id: "msg-2", name: "Jean Pierre", phone: "+509 46 78 90 12", email: "", message: "Bonjour, est-ce que vous livrez aux Cayes? Quel serait le délai?", product_name: null, type: "contact", status: "unread", created_at: "2026-04-09T14:20:00Z" },
  { id: "msg-3", name: "Sophie Desrosiers", phone: "+509 34 56 78 90", email: "sophie.d@gmail.com", message: "M enterese nan wòb batèm dantèl la pou pitit fi m. Èske gen tay 6-12 mwa?", product_name: "Robe Baptême Dentelle", type: "interest", status: "read", created_at: "2026-04-08T10:00:00Z" },
  { id: "msg-4", name: "Paul André", phone: "+509 48 90 12 34", email: "", message: "Je voudrais commander le coffret soin pour un cadeau. Comment faire?", product_name: "Coffret Soin Nouveau-né", type: "interest", status: "handled", created_at: "2026-04-07T16:45:00Z" },
  { id: "msg-5", name: "Carline Michel", phone: "+509 38 12 56 78", email: "carline.m@hotmail.com", message: "Bonsoir, acceptez-vous Natcash comme paiement?", product_name: null, type: "contact", status: "handled", created_at: "2026-04-06T19:30:00Z" },
];

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState(DEMO_MESSAGES);
  const [filter, setFilter] = useState<string>("all");
  const [selected, setSelected] = useState<DemoMessage | null>(null);

  const filtered = messages.filter((m) => {
    if (filter === "all") return true;
    return m.status === filter;
  });

  const unreadCount = messages.filter((m) => m.status === "unread").length;

  const updateStatus = (id: string, status: "read" | "handled") => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
    if (selected?.id === id) setSelected({ ...selected, status });
  };

  const statusIcon = (status: string) => {
    if (status === "unread") return <Mail size={14} className="text-rose-dark" />;
    if (status === "read") return <MailOpen size={14} className="text-bleu-ciel" />;
    return <CheckCircle size={14} className="text-emerald-500" />;
  };

  const statusLabel = (status: string) => {
    if (status === "unread") return "Non lu";
    if (status === "read") return "Lu";
    return "Traité";
  };

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
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-full text-sm font-display font-semibold transition-colors flex items-center justify-center ${
              filter === f.key ? "bg-rose-poudre/20 text-rose-dark" : "bg-white text-gray-500 hover:bg-gray-50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Message List */}
        <div className="lg:col-span-1 space-y-2">
          {filtered.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setSelected(m);
                if (m.status === "unread") updateStatus(m.id, "read");
              }}
              className={`w-full text-left p-4 rounded-xl transition-all ${
                selected?.id === m.id ? "bg-rose-poudre/10 border-2 border-rose-poudre/30" : "bg-white border-2 border-transparent hover:border-gray-100"
              } shadow-sm`}
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
                {m.product_name && (
                  <span className="text-[10px] bg-lavande/20 text-purple-700 px-2 py-0.5 rounded-full">{m.type === "interest" ? "Intérêt" : "Contact"}</span>
                )}
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-10 text-gray-400 text-sm">Aucun message</div>
          )}
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selected ? (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-lg text-gray-600">{selected.name}</h3>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  {statusIcon(selected.status)}
                  {statusLabel(selected.status)}
                </div>
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
                    <div className="text-[10px] text-gray-400 font-semibold mb-0.5">Produit concerné</div>
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
                <a
                  href={`https://wa.me/${selected.phone.replace(/\s/g, "").replace("+", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-white text-sm font-display font-semibold px-5 py-2.5 rounded-full flex items-center justify-center"
                >
                  Répondre WhatsApp
                </a>
                {selected.status !== "handled" && (
                  <button
                    onClick={() => updateStatus(selected.id, "handled")}
                    className="bg-menthe/20 text-emerald-700 text-sm font-display font-semibold px-5 py-2.5 rounded-full flex items-center justify-center"
                  >
                    Marquer comme traité
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-10 shadow-sm text-center text-gray-400">
              <Clock size={32} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">Sélectionnez un message pour voir les détails</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
