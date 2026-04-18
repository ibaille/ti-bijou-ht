"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, MessageSquare, LogOut, Menu, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "@/lib/utils";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [auth, setAuth] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => { if (sessionStorage.getItem("tb_admin") === "ok") setAuth(true); }, []);

  const handleLogin = () => {
    setError("");
    if (form.email === ADMIN_EMAIL && form.password === ADMIN_PASSWORD) {
      sessionStorage.setItem("tb_admin", "ok");
      setAuth(true);
    } else {
      setError("Email ou mot de passe incorrect");
    }
  };

  const handleLogout = () => { sessionStorage.removeItem("tb_admin"); setAuth(false); };

  if (!auth) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-5">
        <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-lg">
          <div className="flex justify-center mb-6"><Logo size="md" /></div>
          <h2 className="font-display font-bold text-xl text-gray-600 text-center mb-6">Administration</h2>
          {error && <p className="text-red-500 text-sm text-center mb-4 bg-red-50 p-2 rounded-xl">{error}</p>}
          <div className="flex flex-col gap-3">
            <input type="email" placeholder="Email" className="w-full py-3 px-4 border-2 border-gray-100 rounded-xl text-base bg-white" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input type="password" placeholder="Mot de passe" className="w-full py-3 px-4 border-2 border-gray-100 rounded-xl text-base bg-white" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
            <button onClick={handleLogin} className="w-full bg-gradient-to-r from-rose-poudre to-rose-dark text-white font-display font-semibold py-3.5 rounded-full mt-2 flex items-center justify-center">Se connecter</button>
          </div>
        </div>
      </div>
    );
  }

  const nav = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/produits", label: "Produits", icon: Package },
    { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform md:translate-x-0 ${sidebar ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-5 border-b border-gray-100 flex justify-between items-center"><Logo size="sm" /><button onClick={() => setSidebar(false)} className="md:hidden p-1 flex items-center justify-center"><X size={20} /></button></div>
        <nav className="p-4 flex flex-col gap-1">
          {nav.map((item) => { const Icon = item.icon; const active = pathname === item.href; return (
            <Link key={item.href} href={item.href} onClick={() => setSidebar(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-display font-semibold transition-colors ${active ? "bg-rose-poudre/10 text-rose-dark" : "text-gray-500 hover:bg-gray-50"}`}><Icon size={18} />{item.label}</Link>
          ); })}
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-display font-semibold text-gray-400 hover:text-red-500 mt-4 transition-colors"><LogOut size={18} /> Déconnexion</button>
        </nav>
      </aside>
      {sidebar && <div className="fixed inset-0 bg-black/30 z-40 md:hidden" onClick={() => setSidebar(false)} />}
      <div className="flex-1 min-w-0">
        <header className="bg-white border-b border-gray-100 px-5 py-3 flex items-center gap-3 sticky top-0 z-30">
          <button onClick={() => setSidebar(true)} className="md:hidden p-2 text-gray-500 flex items-center justify-center"><Menu size={20} /></button>
          <h1 className="font-display font-bold text-lg text-gray-600">{nav.find((n) => n.href === pathname)?.label || "Admin"}</h1>
        </header>
        <div className="p-5 md:p-8">{children}</div>
      </div>
    </div>
  );
}
