import { Lang } from "./types";
export function formatPrice(p: number): string { return p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " HTG"; }
export function getWhatsAppLink(number: string, name?: string, price?: number): string { const msg = name ? `Bonjou! M enterese nan: ${name} (${formatPrice(price||0)}). Mèsi!` : "Bonjou! M ta renmen gen plis enfòmasyon. Mèsi!"; return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`; }
export function t(lang: Lang, fr: string, ht: string): string { return lang === "ht" ? ht : fr; }
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "50944882973";
export const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@tibijouht.com";
export const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "TiBijou2026!";
