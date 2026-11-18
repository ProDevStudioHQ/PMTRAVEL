/**
 * Validation for POST /api/revalidate (docs/api-contract.md 7.1).
 * Pure functions, kept apart from the route so they can be unit-tested.
 */
import { createHash, timingSafeEqual } from "node:crypto";

export const MAX_TAGS = 20;

/** The only tags the CRM may send (contract section 8). */
const ALLOWED_TAG = /^(?:site|categories|programmes|sitemap|programme:[a-z0-9]+(?:-[a-z0-9]+)*)$/;

export const isAllowedTag = (tag: unknown): tag is string => typeof tag === "string" && tag.length <= 200 && ALLOWED_TAG.test(tag);

/**
 * Constant-time comparison. Both sides are hashed first so neither the length
 * nor the content of the secret leaks through timing.
 */
export function secretsMatch(given: string | null | undefined, expected: string | null | undefined): boolean {
  if (!given || !expected) return false;
  const a = createHash("sha256").update(given).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

export type ParsedTags = { ok: true; tags: string[] } | { ok: false; message: string };

/** Body must be { tags: string[] } with 1-20 allowed tags. Duplicates are dropped. */
export function parseRevalidateBody(body: unknown): ParsedTags {
  if (!body || typeof body !== "object" || !("tags" in body)) return { ok: false, message: "Body must be { \"tags\": string[] }" };
  const tags = (body as { tags: unknown }).tags;
  if (!Array.isArray(tags) || tags.length === 0) return { ok: false, message: "tags must be a non-empty array" };
  if (tags.length > MAX_TAGS) return { ok: false, message: `At most ${MAX_TAGS} tags per call` };
  const bad = tags.filter((t) => !isAllowedTag(t));
  if (bad.length > 0) return { ok: false, message: `Unknown tag(s): ${bad.slice(0, 5).map(String).join(", ")}` };
  return { ok: true, tags: [...new Set(tags as string[])] };
}
