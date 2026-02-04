"use client";

import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/store/store";
import { rehydrateCart } from "@/store/slices/cartSlice";
import { rehydrateFavorites } from "@/store/slices/favoritesSlice";

function StoreHydrator({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(rehydrateCart());
    dispatch(rehydrateFavorites());
  }, [dispatch]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <StoreHydrator>{children}</StoreHydrator>
    </Provider>
  );
}
