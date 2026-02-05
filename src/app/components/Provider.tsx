"use client";

import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/store/store";
import { rehydrateCart } from "@/store/slices/cartSlice";
import { rehydrateFavorites } from "@/store/slices/favoritesSlice";
import { setUser } from "@/store/slices/authSlice";

function StoreHydrator({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(rehydrateCart());
    dispatch(rehydrateFavorites());
    
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.user) {
          dispatch(setUser(data.user));
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      }
    };
    
    checkAuth();
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
