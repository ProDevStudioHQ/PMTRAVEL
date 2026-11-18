/**
 * POST /api/revalidate - called by the CRM after any content change
 * (docs/api-contract.md 7.1).
 *
 *   Header: x-revalidate-secret: REVALIDATE_SECRET
 *   Body:   { "tags": ["programmes", "programme:imperial-cities", "sitemap", "site"] }
 *
 * Marks the tagged CRM data stale. With the "max" profile the next visitor
 * triggers the refresh; if the CRM is down at that moment the previous
 * version keeps being served instead of an error.
 */
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { parseRevalidateBody, secretsMatch } from "@/lib/revalidate";

export const dynamic = "force-dynamic";

const error = (status: number, code: string, message: string) =>
  NextResponse.json({ error: { code, message } }, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(req: Request) {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected) {
    console.error("[revalidate] REVALIDATE_SECRET is not set; refusing all calls");
    return error(500, "SERVER_ERROR", "Revalidation is not configured");
  }
  if (!secretsMatch(req.headers.get("x-revalidate-secret"), expected)) {
    console.warn("[revalidate] rejected: bad or missing secret");
    return error(401, "UNAUTHORIZED", "Invalid secret");
  }

  const parsed = parseRevalidateBody(await req.json().catch(() => null));
  if (!parsed.ok) {
    console.warn(`[revalidate] rejected: ${parsed.message}`);
    return error(422, "VALIDATION_ERROR", parsed.message);
  }

  for (const tag of parsed.tags) revalidateTag(tag, "max");
  const now = Date.now();
  console.info(`[revalidate] ${new Date(now).toISOString()} tags=${parsed.tags.join(",")}`);
  return NextResponse.json({ revalidated: true, tags: parsed.tags, now }, { headers: { "Cache-Control": "no-store" } });
}
