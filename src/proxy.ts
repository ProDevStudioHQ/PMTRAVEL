/**
 * Next.js Proxy (formerly middleware). One job: remember where a visitor
 * came from. On a landing URL with utm_* parameters it stores them in a
 * first-party cookie for 30 days, so a lead sent later carries its source to
 * the CRM. First touch wins: an existing cookie is not overwritten.
 */
import { NextResponse, type NextRequest } from "next/server";

const COOKIE = "pm_utm"; // read by src/features/enquiry/crm.ts
const MAX_AGE = 60 * 60 * 24 * 30;

export function proxy(req: NextRequest) {
  const res = NextResponse.next();
  const q = req.nextUrl.searchParams;
  const source = q.get("utm_source");
  if (!source || req.cookies.has(COOKIE)) return res;
  const value = JSON.stringify({
    source: source.slice(0, 100),
    medium: q.get("utm_medium")?.slice(0, 100) || undefined,
    campaign: q.get("utm_campaign")?.slice(0, 150) || undefined,
  });
  res.cookies.set(COOKIE, value, { maxAge: MAX_AGE, sameSite: "lax", path: "/", httpOnly: true, secure: process.env.NODE_ENV === "production" });
  return res;
}

// Pages only: not API routes, Next internals, images or files with an extension.
export const config = { matcher: ["/((?!api/|_next/|.*\\..*).*)"] };
