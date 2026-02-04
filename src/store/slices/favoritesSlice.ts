import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/lib/types";

const loadFavoritesFromStorage = (): Product[] => {
  if (typeof window === "undefined") return [];
  try {
    const serializedState = localStorage.getItem("favorites");
    if (serializedState === null) return [];
    return JSON.parse(serializedState);
  } catch {
    return [];
  }
};

const saveFavoritesToStorage = (state: Product[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("favorites", JSON.stringify(state));
  } catch (error) {
    console.log("Failed to save to Storage", error);
  }
};

const initialState: Product[] = [];

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    rehydrateFavorites: () => loadFavoritesFromStorage(),
    addToFavorites: (state, action: PayloadAction<Product>) => {
      if (!state.find((product) => product.id === action.payload.id)) {
        state.push(action.payload);
      }
      saveFavoritesToStorage(state);
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      const newState = state.filter((product) => product.id !== action.payload);
      saveFavoritesToStorage(newState);
      return newState;
    },
    toggleFavorite: (state, action: PayloadAction<Product>) => {
      const index = state.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index === -1) {
        state.push(action.payload);
      } else {
        state.splice(index, 1);
      }
      saveFavoritesToStorage(state);
    },
  },
});

export const { addToFavorites, removeFromFavorites, toggleFavorite, rehydrateFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
