import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/** Container health check. Dokploy is configured to poll this path. */
export function GET() {
  return NextResponse.json(
    { status: "ok", timestamp: new Date().toISOString() },
    { headers: { "Cache-Control": "no-store" } }
  );
}
