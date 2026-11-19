import { describe, expect, it } from "vitest";
import { themeCss, PALETTE } from "@/lib/theme";

describe("CRM colours", () => {
  it("writes nothing without colours", () => {
    expect(themeCss(undefined)).toBe("");
    expect(themeCss({ palette: {}, areas: {} })).toBe("");
  });

  it("sets a brand colour and its aliases", () => {
    const css = themeCss({ palette: { primary: "#AA0000" } });
    for (const v of PALETTE.find((p) => p.key === "primary")!.vars) expect(css).toContain(`--color-${v}:#aa0000`);
  });

  it("sets area colours", () => {
    const css = themeCss({ areas: { footerBg: "#000000", topbarText: "#ffffff", headerText: "#ff0000" } });
    expect(css).toContain(".site-footer{--color-midnight:#000000;background-color:#000000}");
    expect(css).toContain(".site-topbar{--color-sand:#ffffff");
    expect(css).toContain(".site-header-bar .shadow-overlay{--color-sand:#f4ebdd");
  });

  it("ignores anything that is not a known key with a #rrggbb value (no CSS injection)", () => {
    const css = themeCss({ palette: { primary: "red;}body{display:none", nope: "#000000" }, areas: { footerBg: "url(x)", evil: "#000000" } });
    expect(css).toBe("");
  });
});
