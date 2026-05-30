type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();

export type RateLimitResult =
  | { ok: true }
  | { ok: false; retryAfterSec: number };

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now >= entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }

  if (entry.count >= limit) {
    return {
      ok: false,
      retryAfterSec: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
    };
  }

  entry.count += 1;
  return { ok: true };
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

const AUTH_LIMIT = 10;
const AUTH_WINDOW_MS = 15 * 60 * 1000;

export function checkAuthRateLimit(
  route: "login" | "register",
  request: Request,
): RateLimitResult {
  const ip = getClientIp(request);
  return checkRateLimit(`auth:${route}:${ip}`, AUTH_LIMIT, AUTH_WINDOW_MS);
}
