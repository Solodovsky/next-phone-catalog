import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  totalCount: number;
};

const getDefaultState = (): CartState => ({ items: [], totalCount: 0 });

const loadCartFromStorage = (): CartState => {
  if (typeof window === "undefined") return getDefaultState();
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) return getDefaultState();
    return JSON.parse(serializedState);
  } catch {
    return getDefaultState();
  }
};

const saveCartToStorage = (state: CartState) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("cart", JSON.stringify(state));
  } catch (error) {
    console.log("Failed to save to Storage", error);
  }
};

const initialState: CartState = getDefaultState();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    rehydrateCart: () => loadCartFromStorage(),
    addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalCount += 1;
      saveCartToStorage(state);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        state.totalCount -= item.quantity;
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
      saveCartToStorage(state);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        const diff = action.payload.quantity - item.quantity;
        item.quantity = action.payload.quantity;
        state.totalCount += diff;
      }
      saveCartToStorage(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalCount = 0;
      saveCartToStorage(state);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, rehydrateCart } =
  cartSlice.actions;
export default cartSlice.reducer;
