import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";

export const viewport: Viewport = { themeColor: "#F4A7BB" };

export const metadata: Metadata = {
  title: "Ti Bijou Haïti — Boutique pour Nouveau-nés",
  description: "Collection exclusive d'articles pour nouveau-nés en Haïti. Vêtements, chaussures, accessoires, soins et jouets.",
  keywords: ["bébé", "nouveau-né", "Haïti", "boutique", "vêtements bébé"],
  openGraph: { title: "Ti Bijou Haïti", description: "Le plus beau pour votre petit trésor en Haïti", type: "website", locale: "fr_HT" },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="font-body bg-cream text-charcoal min-h-screen">
        <Toaster position="top-center" toastOptions={{ style: { fontFamily: "'Quicksand', sans-serif", borderRadius: "16px", background: "#fff", color: "#555" } }} />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
