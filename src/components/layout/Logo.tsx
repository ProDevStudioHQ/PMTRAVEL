import Link from "next/link";

/** Wordmark: "PM TRAVEL AGENCY" with the "by Prestige Majestic" subline. */
export function Logo({ className = "", onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className={`notranslate group inline-flex min-h-11 items-center gap-3 ${className}`} translate="no" aria-label="PM Travel Agency, home">
      <span
        aria-hidden="true"
        className="grid size-10 shrink-0 place-items-center rounded-full border border-gold/70 font-display text-[0.95rem] font-semibold tracking-tight text-gold transition-colors group-hover:bg-gold group-hover:text-midnight"
      >
        PM
      </span>
      <span className="flex flex-col whitespace-nowrap leading-none">
        <span className="font-display text-[1.05rem] font-semibold tracking-[0.08em] text-current">PM TRAVEL AGENCY</span>
        <span className="mt-1 text-[0.6875rem] tracking-[0.14em] uppercase opacity-75">by Prestige Majestic</span>
      </span>
    </Link>
  );
}
