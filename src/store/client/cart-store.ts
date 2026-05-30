import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createLegacyStorage } from "./legacy-storage";

export type CartItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

type CartPersisted = {
  items: CartItem[];
  totalCount: number;
};

type CartStore = CartPersisted & {
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
};

const cartLegacyStorage = createLegacyStorage((legacy) => {
  if (
    !legacy ||
    typeof legacy !== "object" ||
    !("items" in legacy) ||
    !Array.isArray((legacy as CartPersisted).items)
  ) {
    return null;
  }
  const { items, totalCount } = legacy as CartPersisted;
  return JSON.stringify({
    state: { items, totalCount },
    version: 0,
  });
});

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalCount: 0,

      addToCart: (payload) => {
        const { items, totalCount } = get();
        const existing = items.find((item) => item.id === payload.id);

        if (existing) {
          set({
            items: items.map((item) =>
              item.id === payload.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
            totalCount: totalCount + 1,
          });
        } else {
          set({
            items: [...items, { ...payload, quantity: 1 }],
            totalCount: totalCount + 1,
          });
        }
      },

      removeFromCart: (id) => {
        const { items, totalCount } = get();
        const item = items.find((i) => i.id === id);
        if (!item) return;

        set({
          items: items.filter((i) => i.id !== id),
          totalCount: totalCount - item.quantity,
        });
      },

      updateQuantity: (id, quantity) => {
        const { items, totalCount } = get();
        const item = items.find((i) => i.id === id);
        if (!item) return;

        const diff = quantity - item.quantity;
        set({
          items: items.map((i) => (i.id === id ? { ...i, quantity } : i)),
          totalCount: totalCount + diff,
        });
      },

    }),
    {
      name: "cart",
      skipHydration: true,
      storage: createJSONStorage(() => cartLegacyStorage),
      partialize: (state) => ({
        items: state.items,
        totalCount: state.totalCount,
      }),
    },
  ),
);
