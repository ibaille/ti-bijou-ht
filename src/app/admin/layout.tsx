"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, MessageSquare, LogOut, Menu, X } from "lucide-react";
import Logo from "@/components/ui/Logo";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth");
    if (auth === "true") setAuthenticated(true);
  }, []);

  const handleLogin = () => {
    // Simple demo auth — replace with Supabase Auth in production
    if (loginForm.email === "cherliereveil67@gmail.com" && loginForm.password === "Cherisma") { {
      sessionStorage.setItem("admin_auth", "true");
      setAuthenticated(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setAuthenticated(false);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-5">
        <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-lg">
          <div className="flex justify-center mb-6"><Logo size="md" /></div>
          <h2 className="font-display font-bold text-xl text-gray-600 text-center mb-6">Admin</h2>
          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email"
              className="w-full py-3 px-4 border-2 border-gray-100 rounded-xl text-base bg-white"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              className="w-full py-3 px-4 border-2 border-gray-100 rounded-xl text-base bg-white"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-rose-poudre to-rose-dark text-white font-display font-semibold py-3.5 rounded-full mt-2 flex items-center justify-center"
            >
              Se connecter
            </button>
          </div>
          <p className="text-xs text-gray-300 text-center mt-4">Demo: entrez n&apos;importe quel email/mot de passe</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/produits", label: "Produits", icon: Package },
    { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <Logo size="sm" />
          <button onClick={() => setSidebarOpen(false)} className="md:hidden p-1 flex items-center justify-center"><X size={20} /></button>
        </div>
        <nav className="p-4 flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-display font-semibold transition-colors ${
                  active ? "bg-rose-poudre/10 text-rose-dark" : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-display font-semibold text-gray-400 hover:text-red-500 mt-4 transition-colors"
          >
            <LogOut size={18} /> Déconnexion
          </button>
        </nav>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 min-w-0">
        <header className="bg-white border-b border-gray-100 px-5 py-3 flex items-center gap-3 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 text-gray-500 flex items-center justify-center">
            <Menu size={20} />
          </button>
          <h1 className="font-display font-bold text-lg text-gray-600">
            {navItems.find((n) => n.href === pathname)?.label || "Admin"}
          </h1>
        </header>
        <div className="p-5 md:p-8">{children}</div>
      </div>
    </div>
  );
}
