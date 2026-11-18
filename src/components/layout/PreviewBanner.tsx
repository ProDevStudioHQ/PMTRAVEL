import { Eye } from "lucide-react";

/**
 * Shown on every page while Next.js Draft Mode is on (opened from the CRM's
 * Preview button through /api/preview). Draft content is never cached.
 */
export function PreviewBanner() {
  return (
    <div role="status" className="fixed inset-x-0 bottom-0 z-[70] flex items-center justify-center gap-3 bg-majorelle px-4 py-2.5 text-sm text-white shadow-overlay">
      <Eye aria-hidden="true" size={16} />
      <span>Preview mode: you are seeing unpublished CRM content.</span>
      {/* A plain link: the exit route must run on the server to clear the cookie. */}
      <a href="/api/preview/exit" className="font-medium underline underline-offset-4">
        Exit preview
      </a>
    </div>
  );
}
