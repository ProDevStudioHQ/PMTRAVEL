import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import fallback from "@/content/fallback-site.json";
import { ProgrammeDetailSchema, SitePayloadSchema } from "@/lib/cms-schemas";
import { FALLBACK_SITE, getCategories, getProgramme, getSiteWithSource, getSitemap } from "@/lib/cms";

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

const image = { url: "https://crm.pm-travelagency.com/media/a.webp", alt: "A", width: 1600, height: 900, sizes: [] };
const programme = {
  id: "p1",
  section: "TOURS",
  category: { name: "Group Tours", slug: "group-tours", colorToken: "majorelle" },
  slug: "imperial-cities",
  title: "Imperial Cities",
  subtitle: null,
  shortDescription: "Eight days.",
  durationDays: 8,
  durationNights: 7,
  route: ["Marrakech", "Fès"],
  groupType: "GROUP",
  price: { from: 1250, currency: "EUR", note: null },
  b2bNetRatesNote: false,
  cover: image,
  isFeatured: true,
  updatedAt: "2026-11-18T22:49:00.000Z",
  overviewHtml: "<p>Hi</p>",
  highlights: [],
  minPax: null,
  maxPax: null,
  startCity: null,
  endCity: null,
  included: [],
  notIncluded: [],
  days: [{ dayNumber: 1, title: "Arrive", description: "…", overnightCity: "Marrakech", meals: { breakfast: false, lunch: false, dinner: true } }],
  gallery: [],
  pdf: { access: "PUBLIC", fileName: "a.pdf", sizeBytes: 1000, url: "https://crm.pm-travelagency.com/media/a.pdf" },
  seo: { title: null, description: null, ogImage: null },
  publishedAt: "2026-11-18T22:49:00.000Z",
};

const fetchMock = vi.fn();

beforeEach(() => {
  process.env.CRM_API_URL = "https://crm.test/api/public/v1";
  process.env.CRM_API_KEY = "read-key";
  process.env.CRM_PREVIEW_KEY = "preview-key";
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
  vi.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("Zod schemas", () => {
  it("accept the bundled fallback snapshot", () => {
    expect(SitePayloadSchema.safeParse(fallback).success).toBe(true);
  });

  it("reject malformed CRM data", () => {
    const { nav, ...noNav } = structuredClone(fallback) as Record<string, unknown>;
    void nav;
    expect(SitePayloadSchema.safeParse(noNav).success).toBe(false);
    expect(SitePayloadSchema.safeParse({ ...fallback, topBar: { ...fallback.topBar, enabled: "yes" } }).success).toBe(false);
    expect(ProgrammeDetailSchema.safeParse({ ...programme, slug: "Not A Slug" }).success).toBe(false);
    expect(ProgrammeDetailSchema.safeParse({ ...programme, groupType: "SOLO" }).success).toBe(false);
    expect(ProgrammeDetailSchema.safeParse({ ...programme, price: { from: "1250", currency: "EUR", note: null } }).success).toBe(false);
    expect(ProgrammeDetailSchema.safeParse(programme).success).toBe(true);
  });
});

describe("getSite", () => {
  it("returns CRM data and sends the read key with the site tag", async () => {
    fetchMock.mockResolvedValue(json(fallback));
    const { source } = await getSiteWithSource();
    expect(source).toBe("cms");
    const [url, init] = fetchMock.mock.calls[0]!;
    expect(url).toBe("https://crm.test/api/public/v1/site");
    expect(init.headers["x-api-key"]).toBe("read-key");
    expect(init.next).toEqual({ tags: ["site"], revalidate: 3600 });
    expect(init.signal).toBeInstanceOf(AbortSignal);
  });

  it("falls back when fetch fails", async () => {
    fetchMock.mockRejectedValue(new TypeError("fetch failed"));
    expect(await getSiteWithSource()).toEqual({ site: FALLBACK_SITE, source: "fallback" });
  });

  it("falls back on an HTTP error", async () => {
    fetchMock.mockResolvedValue(json({ error: { code: "SERVER_ERROR" } }, 500));
    expect((await getSiteWithSource()).source).toBe("fallback");
  });

  it("falls back when the CRM answers with something that is not a /site payload", async () => {
    fetchMock.mockResolvedValue(json({ settings: { siteName: "x" } }));
    expect((await getSiteWithSource()).source).toBe("fallback");
  });

  it("falls back without calling anything when the CRM is not configured", async () => {
    delete process.env.CRM_API_URL;
    expect((await getSiteWithSource()).source).toBe("fallback");
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe("getProgramme", () => {
  it("returns the programme with programme tags", async () => {
    fetchMock.mockResolvedValue(json(programme));
    const r = await getProgramme("TOURS", "imperial-cities");
    expect(r.kind).toBe("ok");
    const [url, init] = fetchMock.mock.calls[0]!;
    expect(url).toBe("https://crm.test/api/public/v1/programmes/tours/imperial-cities");
    expect(init.next.tags).toEqual(["programmes", "programme:imperial-cities"]);
  });

  it("uses the preview key, ?preview=true and no cache for drafts", async () => {
    fetchMock.mockResolvedValue(json(programme));
    await getProgramme("TOURS", "imperial-cities", { preview: true });
    const [url, init] = fetchMock.mock.calls[0]!;
    expect(url).toBe("https://crm.test/api/public/v1/programmes/tours/imperial-cities?preview=true");
    expect(init.headers["x-api-key"]).toBe("preview-key");
    expect(init.cache).toBe("no-store");
    expect(init.next).toBeUndefined();
  });

  it("maps 404 to not_found, { redirect } to redirect and outages to unavailable", async () => {
    fetchMock.mockResolvedValueOnce(json({ error: { code: "NOT_FOUND" } }, 404));
    expect(await getProgramme("TOURS", "gone")).toEqual({ kind: "not_found" });
    fetchMock.mockResolvedValueOnce(json({ redirect: "/tours/private-tours/new-slug" }));
    expect(await getProgramme("TOURS", "old-slug")).toEqual({ kind: "redirect", to: "/tours/private-tours/new-slug" });
    fetchMock.mockRejectedValueOnce(new Error("timeout"));
    expect(await getProgramme("TOURS", "x")).toEqual({ kind: "unavailable" });
  });

  it("never follows a redirect off the site", async () => {
    fetchMock.mockResolvedValueOnce(json({ redirect: "https://evil.example/tours/a/b" }));
    expect((await getProgramme("TOURS", "x")).kind).toBe("unavailable");
  });

  it("rejects slugs that are not slugs without calling the CRM", async () => {
    expect(await getProgramme("TOURS", "../site")).toEqual({ kind: "not_found" });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe("lists", () => {
  it("return null (not an empty list) when the CRM is down", async () => {
    fetchMock.mockRejectedValue(new Error("down"));
    expect(await getCategories("TOURS")).toBeNull();
    expect(await getSitemap()).toBeNull();
  });
});
