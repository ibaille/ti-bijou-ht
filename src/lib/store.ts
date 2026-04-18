import { create } from "zustand";
import { Lang, Filters } from "./types";

interface AppState {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;

  favorites: string[];
  toggleFavorite: (id: string) => void;

  filters: Filters;
  setFilter: (key: keyof Filters, value: string) => void;
  resetFilters: () => void;

  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;

  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const defaultFilters: Filters = {
  category: "",
  gender: "",
  age: "",
  sort: "newest",
  search: "",
};

export const useStore = create<AppState>((set) => ({
  lang: "fr",
  setLang: (lang) => set({ lang }),
  toggleLang: () => set((s) => ({ lang: s.lang === "fr" ? "ht" : "fr" })),

  favorites: [],
  toggleFavorite: (id) =>
    set((s) => ({
      favorites: s.favorites.includes(id)
        ? s.favorites.filter((f) => f !== id)
        : [...s.favorites, id],
    })),

  filters: defaultFilters,
  setFilter: (key, value) =>
    set((s) => ({ filters: { ...s.filters, [key]: value } })),
  resetFilters: () => set({ filters: defaultFilters }),

  searchOpen: false,
  setSearchOpen: (open) => set({ searchOpen: open }),

  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
}));
