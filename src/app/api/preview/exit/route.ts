/** GET /api/preview/exit[?to=/tours] - turns Draft Mode off and returns to a page on this site. */
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const sitePath = (value: string | null) => (value && value.startsWith("/") && !value.startsWith("//") && !value.startsWith("/api/") ? value : null);

export async function GET(req: Request) {
  (await draftMode()).disable();
  const url = new URL(req.url);
  let back = sitePath(url.searchParams.get("to"));
  if (!back) {
    // Return to the page the banner was clicked on, if it was on this site.
    const referer = req.headers.get("referer");
    if (referer) {
      try {
        const ref = new URL(referer);
        if (ref.host === url.host) back = sitePath(ref.pathname + ref.search);
      } catch {
        // ignore a malformed referer
      }
    }
  }
  redirect(back ?? "/");
}
