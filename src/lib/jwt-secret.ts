const DEV_FALLBACK =
  "__next-phone-catalog-local-dev-jwt-secret-do-not-use-in-production__";

export function resolveJwtSecret(): string | null {
  const fromEnv = process.env.JWT_SECRET?.trim();
  if (fromEnv) return fromEnv;
  if (process.env.NODE_ENV === "development") {
    return DEV_FALLBACK;
  }
  return null;
}
