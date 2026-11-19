import { NextResponse } from "next/server";
import { checkCmsLive } from "@/lib/cms";

export const dynamic = "force-dynamic";

/*
 * The CRM check is remembered for 30 seconds, so a container health poller
 * (Dokploy) and the CRM's dashboard light cannot hammer the CRM, and a slow
 * CRM can never make this endpoint slow enough to fail a container check.
 */
let last: { at: number; cms: "ok" | "fallback" } | null = null;
const TTL_MS = 30_000;

/**
 * Container health check (Dokploy polls it) and the CRM Website Dashboard's
 * connection light (docs/api-contract.md 7.3). The site itself is "ok" even
 * when the CRM is not: it is then serving cached pages and the fallback layout.
 */
export async function GET() {
  if (!last || Date.now() - last.at > TTL_MS) last = { at: Date.now(), cms: (await checkCmsLive(3_000)) === "cms" ? "ok" : "fallback" };
  return NextResponse.json(
    { status: "ok", cms: last.cms, timestamp: new Date().toISOString() },
    { headers: { "Cache-Control": "no-store" } }
  );
}
