import "server-only";
import { createHash } from "node:crypto";

/**
 * Fixed-window rate limiting, held in process memory.
 *
 * LIMITATION, stated rather than hidden: this is per container instance. With
 * one instance behind Dokploy that is the real limit; the moment the app is
 * scaled horizontally it becomes per-instance and the effective limit
 * multiplies. Replacing it with a shared store is the point at which Redis
 * becomes a proven need rather than a guess.
 */

export const LIMITS = {
  rfq: { max: 5, windowMs: 60 * 60 * 1000 },
  contact: { max: 3, windowMs: 60 * 60 * 1000 },
  auth: { max: 10, windowMs: 60 * 60 * 1000 },
} as const;

export type LimitName = keyof typeof LIMITS;

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

function sweep(now: number) {
  if (buckets.size < 1000) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

export function rateLimit(name: LimitName, identifier: string): RateLimitResult {
  const { max, windowMs } = LIMITS[name];
  const now = Date.now();
  sweep(now);

  const key = `${name}:${identifier}`;
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: max - 1, retryAfterSeconds: 0 };
  }

  bucket.count += 1;
  const retryAfterSeconds = Math.ceil((bucket.resetAt - now) / 1000);
  return {
    allowed: bucket.count <= max,
    remaining: Math.max(0, max - bucket.count),
    retryAfterSeconds,
  };
}

/**
 * We rate-limit and audit by IP but never store the address itself. The salt
 * keeps the hash from being reversible by enumerating the IPv4 space.
 */
export function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT ?? "pm-travel-dev-salt";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

/**
 * Behind Dokploy's proxy the client address arrives in x-forwarded-for. The
 * left-most entry is the client; the rest are proxies.
 */
export function clientIpFrom(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return headers.get("x-real-ip")?.trim() ?? "unknown";
}
