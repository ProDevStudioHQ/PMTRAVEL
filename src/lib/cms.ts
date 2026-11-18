/**
 * Server-only client for the PM Travel CRM public API (docs/api-contract.md).
 *
 * Every call:
 *  - authenticates with x-api-key (CRM_API_KEY; CRM_PREVIEW_KEY for drafts),
 *  - is cached by Next with the tags from contract section 8 and a one-hour
 *    safety-net revalidate (the CRM calls /api/revalidate on every change),
 *  - times out after 5 seconds,
 *  - is validated with Zod before anything reaches a page.
 *
 * Nothing here throws to a page. The layout gets the local fallback; lists and
 * programmes return null / a typed result so the page decides what to show.
 */
import "server-only";
import type { ZodType } from "zod";
import fallbackSite from "@/content/fallback-site.json";
import {
  CategoryListSchema,
  ProgrammeDetailSchema,
  ProgrammeListSchema,
  RedirectSchema,
  SitePayloadSchema,
  SitemapSchema,
} from "@/lib/cms-schemas";
import type { Category, Paginated, ProgrammeDetail, ProgrammeSummary, Section, SitePayload, SitemapEntry } from "@/types/cms";

export const CMS_TIMEOUT_MS = 5_000;
export const CMS_REVALIDATE_SECONDS = 3600;

/** Contract section 8. */
export const CMS_TAGS = {
  site: "site",
  categories: "categories",
  programmes: "programmes",
  sitemap: "sitemap",
  programme: (slug: string) => `programme:${slug}`,
} as const;

export class CmsNotFoundError extends Error {
  constructor(path: string) {
    super(`CMS 404 on ${path}`);
    this.name = "CmsNotFoundError";
  }
}

const apiBase = () => (process.env.CRM_API_URL ?? "").trim().replace(/\/+$/, "");

/** True when the site is configured to talk to a CRM at all. */
export const isCmsConfigured = () => Boolean(apiBase() && process.env.CRM_API_KEY);

/*
 * Build-time short circuit. During `next build` every page renders the layout;
 * if the CRM is unreachable, each would wait the full timeout. After one
 * failure the rest of the build uses the fallback immediately. At runtime this
 * is off: a render there should always try (Next serves cached data anyway).
 */
const BUILD_PHASE = "phase-production-build";
let buildFailedAt = 0;
const isBuild = () => process.env.NEXT_PHASE === BUILD_PHASE;

type RequestOptions = { tags: string[]; preview?: boolean };

/** Low-level GET. Returns parsed JSON, throws CmsNotFoundError on 404 and Error on anything else. */
async function cmsGet(path: string, { tags, preview = false }: RequestOptions): Promise<unknown> {
  const base = apiBase();
  if (!base) throw new Error("CRM_API_URL is not set");
  const key = preview ? process.env.CRM_PREVIEW_KEY : process.env.CRM_API_KEY;
  if (!key) throw new Error(preview ? "CRM_PREVIEW_KEY is not set" : "CRM_API_KEY is not set");
  if (isBuild() && buildFailedAt && Date.now() - buildFailedAt < 60_000) {
    throw new Error("CRM unreachable earlier in this build");
  }

  const url = `${base}${path}${preview ? `${path.includes("?") ? "&" : "?"}preview=true` : ""}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CMS_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { "x-api-key": key, Accept: "application/json" },
      signal: controller.signal,
      ...(preview ? { cache: "no-store" as const } : { next: { tags, revalidate: CMS_REVALIDATE_SECONDS } }),
    });
    if (res.status === 404) throw new CmsNotFoundError(path);
    if (!res.ok) throw new Error(`CMS ${res.status} on ${path}`);
    return await res.json();
  } catch (error) {
    if (!(error instanceof CmsNotFoundError) && isBuild()) buildFailedAt = Date.now();
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

function parse<T>(schema: ZodType<T>, data: unknown, path: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const first = result.error.issues.slice(0, 3).map((i) => `${i.path.join(".")}: ${i.message}`);
    throw new Error(`CMS response for ${path} failed validation (${first.join("; ")})`);
  }
  return result.data;
}

function logFailure(what: string, error: unknown) {
  // Never log URLs with keys or full bodies; the message is enough to diagnose.
  console.error(`[cms] ${what} failed: ${error instanceof Error ? error.message : String(error)}`);
}

/* ------------------------------------------------------------------ */
/* Site layout                                                         */
/* ------------------------------------------------------------------ */

export type SiteSource = "cms" | "fallback";

/** The bundled snapshot (src/content/fallback-site.json, refreshed by scripts/pull-fallback.mjs). */
export const FALLBACK_SITE = fallbackSite as unknown as SitePayload;

/** Layout data plus where it came from. Never throws. */
export async function getSiteWithSource(): Promise<{ site: SitePayload; source: SiteSource }> {
  if (!isCmsConfigured()) return { site: FALLBACK_SITE, source: "fallback" };
  try {
    const data = await cmsGet("/site", { tags: [CMS_TAGS.site] });
    return { site: parse(SitePayloadSchema, data, "/site") as SitePayload, source: "cms" };
  } catch (error) {
    logFailure("getSite", error);
    return { site: FALLBACK_SITE, source: "fallback" };
  }
}

/** Header, top bar, navigation, footer and settings. Falls back to the local snapshot. */
export async function getSite(): Promise<SitePayload> {
  return (await getSiteWithSource()).site;
}

/* ------------------------------------------------------------------ */
/* Categories and programme lists                                      */
/* ------------------------------------------------------------------ */

/** Categories of one section, or null when the CRM cannot be reached. */
export async function getCategories(section: Section): Promise<Category[] | null> {
  if (!isCmsConfigured()) return null;
  const path = `/categories?section=${section}`;
  try {
    return parse(CategoryListSchema, await cmsGet(path, { tags: [CMS_TAGS.categories] }), path).items as Category[];
  } catch (error) {
    logFailure("getCategories", error);
    return null;
  }
}

export type ProgrammeQuery = { section: Section; category?: string; featured?: boolean; page?: number; limit?: number };

/** One page of programme cards, or null when the CRM cannot be reached. */
export async function getProgrammes(query: ProgrammeQuery): Promise<Paginated<ProgrammeSummary> | null> {
  if (!isCmsConfigured()) return null;
  const q = new URLSearchParams({ section: query.section });
  if (query.category) q.set("category", query.category);
  if (query.featured) q.set("featured", "true");
  if (query.page && query.page > 1) q.set("page", String(Math.floor(query.page)));
  if (query.limit) q.set("limit", String(Math.min(50, Math.max(1, Math.floor(query.limit)))));
  const path = `/programmes?${q}`;
  try {
    return parse(ProgrammeListSchema, await cmsGet(path, { tags: [CMS_TAGS.programmes] }), path) as Paginated<ProgrammeSummary>;
  } catch (error) {
    logFailure("getProgrammes", error);
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* One programme                                                       */
/* ------------------------------------------------------------------ */

export type ProgrammeResult =
  | { kind: "ok"; programme: ProgrammeDetail }
  | { kind: "redirect"; to: string }
  | { kind: "not_found" }
  | { kind: "unavailable" };

/**
 * One programme. In a page:
 *   const r = await getProgramme("TOURS", slug, { preview });
 *   if (r.kind === "redirect") permanentRedirect(r.to);
 *   if (r.kind === "not_found") notFound();
 */
export async function getProgramme(section: Section, slug: string, { preview = false }: { preview?: boolean } = {}): Promise<ProgrammeResult> {
  if (!isCmsConfigured()) return { kind: "unavailable" };
  if (!/^[a-z0-9-]{1,160}$/.test(slug)) return { kind: "not_found" };
  const path = `/programmes/${section.toLowerCase()}/${slug}`;
  try {
    const data = await cmsGet(path, { tags: [CMS_TAGS.programmes, CMS_TAGS.programme(slug)], preview });
    const moved = RedirectSchema.safeParse(data);
    if (moved.success) return { kind: "redirect", to: moved.data.redirect };
    return { kind: "ok", programme: parse(ProgrammeDetailSchema, data, path) as ProgrammeDetail };
  } catch (error) {
    if (error instanceof CmsNotFoundError) return { kind: "not_found" };
    logFailure("getProgramme", error);
    return { kind: "unavailable" };
  }
}

/* ------------------------------------------------------------------ */
/* Sitemap                                                             */
/* ------------------------------------------------------------------ */

/** Category and programme paths published in the CRM, or null when it cannot be reached. */
export async function getSitemap(): Promise<SitemapEntry[] | null> {
  if (!isCmsConfigured()) return null;
  try {
    return parse(SitemapSchema, await cmsGet("/sitemap", { tags: [CMS_TAGS.sitemap] }), "/sitemap").items;
  } catch (error) {
    logFailure("getSitemap", error);
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* Health                                                              */
/* ------------------------------------------------------------------ */

/**
 * Live, uncached check used by /api/health: can we reach the CRM with our key,
 * and does /site still match the contract?
 */
export async function checkCmsLive(): Promise<SiteSource> {
  if (!isCmsConfigured()) return "fallback";
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CMS_TIMEOUT_MS);
  try {
    const res = await fetch(`${apiBase()}/site`, {
      headers: { "x-api-key": process.env.CRM_API_KEY ?? "", Accept: "application/json" },
      signal: controller.signal,
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`CMS ${res.status} on /site`);
    parse(SitePayloadSchema, await res.json(), "/site");
    return "cms";
  } catch (error) {
    logFailure("health check", error);
    return "fallback";
  } finally {
    clearTimeout(timer);
  }
}
