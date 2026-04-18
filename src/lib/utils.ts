import { Lang } from "./types";

export function formatPrice(price: number): string {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " HTG";
}

export function getWhatsAppLink(number: string, productName?: string, price?: number): string {
  const msg = productName
    ? `Bonjou! M enterese nan pwodui: ${productName} (${formatPrice(price || 0)}). Mèsi!`
    : "Bonjou! M ta renmen gen plis enfòmasyon sou pwodui nou yo. Mèsi!";
  return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
}

export function t(lang: Lang, fr: string, ht: string): string {
  return lang === "ht" ? ht : fr;
}

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function getImageUrl(path: string): string {
  if (path.startsWith("http")) return path;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return `${base}/storage/v1/object/public/product-images/${path}`;
}

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "50940000000";
