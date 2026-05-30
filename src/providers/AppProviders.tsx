"use client";

import { useEffect, useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { createQueryClient } from "@/lib/query-client";
import { StoreHydrationContext } from "@/store/context/StoreHydrationContext";
import { useAuthStore } from "@/store/client/auth-store";
import { useCartStore } from "@/store/client/cart-store";
import { useFavoritesStore } from "@/store/client/favorites-store";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(createQueryClient);
  const [hydrated, setHydrated] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    void Promise.all([
      useCartStore.persist.rehydrate(),
      useFavoritesStore.persist.rehydrate(),
    ]).then(() => {
      setHydrated(true);
    });

    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        const text = await res.text();
        let data: { user?: { id: string; email: string; name?: string } } = {};
        try {
          data = text ? JSON.parse(text) : {};
        } catch {
          return;
        }
        if (data.user) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      }
    };

    checkAuth();
  }, [setUser]);

  return (
    <QueryClientProvider client={queryClient}>
      <StoreHydrationContext.Provider value={hydrated}>
        {children}
      </StoreHydrationContext.Provider>
    </QueryClientProvider>
  );
}
