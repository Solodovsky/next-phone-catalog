import type { StateStorage } from "zustand/middleware";

function readRaw(name: string): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(name);
}

export function createLegacyStorage(
  toPersistedJson: (legacy: unknown) => string | null,
): StateStorage {
  return {
    getItem: (name) => {
      const raw = readRaw(name);
      if (!raw) return null;

      try {
        const parsed: unknown = JSON.parse(raw);
        if (
          parsed &&
          typeof parsed === "object" &&
          "state" in (parsed as object)
        ) {
          return raw;
        }
        return toPersistedJson(parsed);
      } catch {
        return null;
      }
    },
    setItem: (name, value) => {
      localStorage.setItem(name, value);
    },
    removeItem: (name) => {
      localStorage.removeItem(name);
    },
  };
}
