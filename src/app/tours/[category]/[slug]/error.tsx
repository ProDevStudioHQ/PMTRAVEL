"use client";

/**
 * Client Component (Next.js requires error boundaries to be). Shown when the
 * CRM cannot be reached and this programme has never been cached. Errors are
 * not cached, so the next visit tries the CRM again.
 */
import { WhatsappIcon } from "@/components/Icon";
import { buttonClasses } from "@/components/Button";
import { whatsappLink } from "@/lib/company";

export default function ProgrammeError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="bg-sand pt-36 pb-24">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        <div role="status" className="max-w-3xl rounded-card border border-line bg-ivory p-8">
          <h1 className="t-h3">This programme is temporarily unavailable</h1>
          <p className="mt-3 text-muted">Please try again in a moment, or message our operations desk and we will send you the full programme straight away.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={reset} className={buttonClasses("secondary", "light")}>
              <span>Try again</span>
            </button>
            <a href={whatsappLink("Hello PM Travel Agency, I'd like the details of one of your programmes.")} target="_blank" rel="noopener noreferrer" className={buttonClasses("primary", "light")}>
              <WhatsappIcon size={18} />
              <span>Ask us on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
