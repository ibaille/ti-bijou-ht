export interface Category { id: string; name: string; name_ht: string; slug: string; icon: string; color: string; sort_order: number; }
export interface Product { id: string; name: string; name_ht: string; description: string; description_ht: string; price: number; old_price: number | null; category_id: string; gender: "fille" | "garcon" | "unisexe"; age_range: "0-3" | "3-6" | "6-12"; colors: string[]; sizes: string[]; images: string[]; badge: "new" | "popular" | "limited" | null; is_featured: boolean; is_coup_coeur: boolean; stock: number; is_active: boolean; views: number; created_at: string; }
export interface Message { id: string; name: string; phone: string; email: string | null; message: string; product_id: string | null; product_name: string | null; type: "contact" | "interest"; status: "unread" | "read" | "handled"; created_at: string; }
export interface Testimonial { id: string; name: string; text_fr: string; text_ht: string; rating: number; is_active: boolean; }
export type Lang = "fr" | "ht";
export interface Filters { category: string; gender: string; age: string; sort: string; search: string; }
