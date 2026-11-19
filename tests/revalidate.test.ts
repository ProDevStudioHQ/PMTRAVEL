import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const revalidateTag = vi.fn();
const revalidatePath = vi.fn();
vi.mock("next/cache", () => ({ revalidateTag: (...args: unknown[]) => revalidateTag(...args), revalidatePath: (...args: unknown[]) => revalidatePath(...args) }));

import { isAllowedTag, parseRevalidateBody, secretsMatch } from "@/lib/revalidate";
import { POST } from "@/app/api/revalidate/route";

const SECRET = "a".repeat(64);
const call = (body: unknown, secret?: string) =>
  POST(
    new Request("http://localhost/api/revalidate", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(secret !== undefined ? { "x-revalidate-secret": secret } : {}) },
      body: typeof body === "string" ? body : JSON.stringify(body),
    })
  );

describe("revalidate validation", () => {
  it("accepts only the contract's tags", () => {
    for (const tag of ["site", "categories", "programmes", "sitemap", "programme:imperial-cities"]) expect(isAllowedTag(tag)).toBe(true);
    for (const tag of ["", "Site", "programme:", "programme:Bad_Slug", "programme:a--b", "users", "site ", 42, null]) expect(isAllowedTag(tag)).toBe(false);
  });

  it("rejects empty, oversized and malformed bodies", () => {
    expect(parseRevalidateBody(null).ok).toBe(false);
    expect(parseRevalidateBody({ tags: [] }).ok).toBe(false);
    expect(parseRevalidateBody({ tags: "site" }).ok).toBe(false);
    expect(parseRevalidateBody({ tags: Array(21).fill("site") }).ok).toBe(false);
    expect(parseRevalidateBody({ tags: ["site", "drop table"] }).ok).toBe(false);
    expect(parseRevalidateBody({ tags: ["site", "site", "sitemap"] })).toEqual({ ok: true, tags: ["site", "sitemap"] });
  });

  it("compares secrets in constant time and never matches empty values", () => {
    expect(secretsMatch(SECRET, SECRET)).toBe(true);
    expect(secretsMatch("short", SECRET)).toBe(false);
    expect(secretsMatch("", "")).toBe(false);
    expect(secretsMatch(null, SECRET)).toBe(false);
    expect(secretsMatch(SECRET, undefined)).toBe(false);
  });
});

describe("POST /api/revalidate", () => {
  beforeEach(() => {
    process.env.REVALIDATE_SECRET = SECRET;
    revalidateTag.mockClear();
  });
  afterEach(() => {
    delete process.env.REVALIDATE_SECRET;
  });

  it("returns 401 for a wrong or missing secret and revalidates nothing", async () => {
    expect((await call({ tags: ["site"] }, "wrong")).status).toBe(401);
    expect((await call({ tags: ["site"] })).status).toBe(401);
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it("returns 422 for bad tags", async () => {
    expect((await call({ tags: ["site", "everything"] }, SECRET)).status).toBe(422);
    expect((await call("not json", SECRET)).status).toBe(422);
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it("revalidates each tag with the max profile", async () => {
    const res = await call({ tags: ["programmes", "programme:imperial-cities"] }, SECRET);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toMatchObject({ revalidated: true, tags: ["programmes", "programme:imperial-cities"] });
    expect(typeof body.now).toBe("number");
    expect(revalidateTag).toHaveBeenCalledWith("programmes", "max");
    expect(revalidateTag).toHaveBeenCalledWith("programme:imperial-cities", "max");
    expect(revalidatePath).toHaveBeenCalledWith("/", "layout");
  });

  it("refuses everything when the secret is not configured", async () => {
    delete process.env.REVALIDATE_SECRET;
    expect((await call({ tags: ["site"] }, "")).status).toBe(500);
  });
});
