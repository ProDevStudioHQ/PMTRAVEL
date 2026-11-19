import { describe, expect, it } from "vitest";
import { mergeSection } from "@/lib/section-merge";
import { HOME_SECTIONS } from "@/content/home-sections";
import { SitePayloadSchema } from "@/lib/cms-schemas";
import fallback from "@/content/fallback-site.json";

const safe = (u: string | null | undefined) => (u && /^(\/|https:\/\/)/.test(u) ? u : null);
const who = HOME_SECTIONS.find((s) => s.id === "who")!.defaults;

describe("page sections", () => {
  it("keeps the site's content when the CRM has nothing", () => {
    const r = mergeSection(who, null, safe);
    expect(r.title).toBe("Built for the travel trade");
    expect(r.cards).toHaveLength(6);
    expect(r.customCards).toBe(false);
    expect(r.hidden).toBe(false);
  });

  it("applies CRM texts, hides an empty text, never hides the title, replaces cards", () => {
    const r = mergeSection(
      who,
      { hidden: false, eyebrow: "", title: "", intro: "New intro", cards: [{ title: "Agencies", body: "x", icon: "users", imageKey: null, image: null, href: "javascript:alert(1)" }, { title: " ", body: "", icon: null, imageKey: null, image: null, href: null }] },
      safe,
    );
    expect(r.eyebrow).toBeNull();
    expect(r.title).toBe("Built for the travel trade");
    expect(r.intro).toBe("New intro");
    expect(r.cards).toEqual([{ title: "Agencies", body: "x", icon: "users", imageKey: null, image: null, href: null }]);
    expect(r.customCards).toBe(true);
  });

  it("parses sections from the CRM and drops malformed ones", () => {
    const ok = SitePayloadSchema.parse({ ...fallback, sections: { "/#who": { hidden: true } } });
    expect(ok.sections?.["/#who"]).toMatchObject({ hidden: true, eyebrow: null, cards: null });
    const bad = SitePayloadSchema.parse({ ...fallback, sections: { "/#who": { hidden: "yes" } } });
    expect(bad.sections).toBeUndefined();
  });

  it("every home section has unique ids and a heading", () => {
    expect(new Set(HOME_SECTIONS.map((s) => s.id)).size).toBe(HOME_SECTIONS.length);
    for (const s of HOME_SECTIONS) if (s.texts.includes("title")) expect(s.defaults.title).toBeTruthy();
  });
});
