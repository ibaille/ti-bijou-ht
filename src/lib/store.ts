import { create } from "zustand";
import { Lang, Filters } from "./types";
interface AppState { lang: Lang; setLang: (l: Lang) => void; toggleLang: () => void; favorites: string[]; toggleFavorite: (id: string) => void; filters: Filters; setFilter: (k: keyof Filters, v: string) => void; resetFilters: () => void; searchOpen: boolean; setSearchOpen: (o: boolean) => void; mobileMenuOpen: boolean; setMobileMenuOpen: (o: boolean) => void; }
const df: Filters = { category: "", gender: "", age: "", sort: "newest", search: "" };
export const useStore = create<AppState>((set) => ({
  lang: "fr", setLang: (lang) => set({ lang }), toggleLang: () => set((s) => ({ lang: s.lang === "fr" ? "ht" : "fr" })),
  favorites: [], toggleFavorite: (id) => set((s) => ({ favorites: s.favorites.includes(id) ? s.favorites.filter((f) => f !== id) : [...s.favorites, id] })),
  filters: df, setFilter: (k, v) => set((s) => ({ filters: { ...s.filters, [k]: v } })), resetFilters: () => set({ filters: df }),
  searchOpen: false, setSearchOpen: (o) => set({ searchOpen: o }),
  mobileMenuOpen: false, setMobileMenuOpen: (o) => set({ mobileMenuOpen: o }),
}));
