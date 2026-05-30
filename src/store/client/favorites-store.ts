import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Product } from "@/lib/types";
import { createLegacyStorage } from "./legacy-storage";

type FavoritesPersisted = {
  favorites: Product[];
};

type FavoritesStore = FavoritesPersisted & {
  toggleFavorite: (product: Product) => void;
};

const favoritesLegacyStorage = createLegacyStorage((legacy) => {
  if (!Array.isArray(legacy)) return null;
  return JSON.stringify({
    state: { favorites: legacy },
    version: 0,
  });
});

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (product) => {
        const { favorites } = get();
        const index = favorites.findIndex((p) => p.id === product.id);

        if (index === -1) {
          set({ favorites: [...favorites, product] });
        } else {
          set({
            favorites: favorites.filter((p) => p.id !== product.id),
          });
        }
      },

    }),
    {
      name: "favorites",
      skipHydration: true,
      storage: createJSONStorage(() => favoritesLegacyStorage),
      partialize: (state) => ({ favorites: state.favorites }),
    },
  ),
);
