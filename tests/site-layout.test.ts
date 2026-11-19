import { describe, expect, it } from "vitest";
import fallback from "@/content/fallback-site.json";
import { safeHref, splitHours, telHref, toNavButtons, toNavEntries, waHref } from "@/lib/site-layout";
import type { NavItem, SitePayload } from "@/types/cms";

const site = fallback as unknown as SitePayload;
const item = (over: Partial<NavItem>): NavItem => ({
  id: "x",
  label: "X",
  url: "/x",
  type: "LINK",
  description: null,
  icon: null,
  isHighlighted: false,
  openInNewTab: false,
  buttonStyle: null,
  children: [],
  ...over,
});

describe("safeHref", () => {
  it("allows site paths, http(s), mailto and tel only", () => {
    expect(safeHref("/tours")).toBe("/tours");
    expect(safeHref("https://wa.me/1")).toBe("https://wa.me/1");
    expect(safeHref("mailto:a@b.c")).toBe("mailto:a@b.c");
    expect(safeHref("javascript:alert(1)")).toBeNull();
    expect(safeHref(" JaVaScRiPt:alert(1)")).toBeNull();
    expect(safeHref("data:text/html,x")).toBeNull();
    expect(safeHref("//evil.example")).toBeNull();
    expect(safeHref(null)).toBeNull();
  });
});

describe("contact helpers", () => {
  it("builds tel and WhatsApp links from formatted numbers", () => {
    expect(telHref("+212 7 62 45 54 72")).toBe("tel:+212762455472");
    expect(waHref("+212 762-455-472", "")).toBe("https://wa.me/212762455472");
    expect(splitHours("Mon–Fri 9:00–18:00 · Sat 9:00–13:00 · Closed Sunday")).toEqual(["Mon–Fri 9:00–18:00", "Sat 9:00–13:00", "Closed Sunday"]);
  });
});

describe("toNavEntries", () => {
  it("turns the fallback nav into header entries", () => {
    const nav = toNavEntries(site.nav.items);
    expect(nav.map((n) => n.label)).toEqual(["Home", "Experiences", "Tours", "B2B & DMC", "Company"]);
    expect(nav.find((n) => n.label === "B2B & DMC")).toMatchObject({ emphasis: true, menu: { kind: "mega" } });
    expect(nav.find((n) => n.label === "Experiences")?.menu?.allLabel).toBe("All experiences");
    // Company's own page is one of its children, so no "All company" link.
    expect(nav.find((n) => n.label === "Company")?.menu?.allLabel).toBeUndefined();
  });

  it("drops unsafe links and parents left with nothing", () => {
    const nav = toNavEntries([
      item({ id: "a", url: "javascript:alert(1)" }),
      item({ id: "b", type: "DROPDOWN", url: null, children: [item({ id: "c", url: "javascript:x" })] }),
      item({ id: "d", url: "https://partner.example", openInNewTab: true }),
    ]);
    expect(nav).toEqual([{ id: "d", label: "X", href: "https://partner.example", newTab: true }]);
  });

  it("maps buttons with their style", () => {
    expect(toNavButtons(site.nav.buttons).map((b) => [b.label, b.style])).toEqual([
      ["Partner Login", "OUTLINE"],
      ["Request a Quote", "PRIMARY"],
    ]);
  });
});
