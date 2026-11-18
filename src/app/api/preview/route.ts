/**
 * GET /api/preview?secret=...&section=tours&category=group-tours&slug=imperial-cities
 * (docs/api-contract.md 7.2). Opened by the CRM's Preview button: turns on
 * Next.js Draft Mode, then opens the programme page, which then fetches the
 * draft with CRM_PREVIEW_KEY and no caching.
 */
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { secretsMatch } from "@/lib/revalidate";

export const dynamic = "force-dynamic";

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  if (!secretsMatch(q.get("secret"), process.env.CRM_PREVIEW_KEY)) {
    console.warn("[preview] rejected: bad or missing secret");
    return new Response("Invalid preview link", { status: 401, headers: { "Cache-Control": "no-store" } });
  }

  const section = q.get("section");
  const category = q.get("category") ?? "";
  const slug = q.get("slug") ?? "";
  if ((section !== "experiences" && section !== "tours") || !SLUG.test(category) || !SLUG.test(slug)) {
    return new Response("Invalid section, category or slug", { status: 400, headers: { "Cache-Control": "no-store" } });
  }

  (await draftMode()).enable();
  redirect(`/${section}/${category}/${slug}`);
}
