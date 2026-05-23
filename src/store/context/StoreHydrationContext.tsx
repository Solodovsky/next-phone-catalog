"use client";

import { createContext, useContext } from "react";

export const StoreHydrationContext = createContext(false);

export function useStoreHydrated() {
  return useContext(StoreHydrationContext);
}
