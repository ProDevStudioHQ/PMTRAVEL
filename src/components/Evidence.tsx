import type { Confidence } from "@/lib/evidence";
export type { Confidence };

type EvidenceProps = {
  /** What the source is, e.g. "PM Travel field measurement". */
  source?: string;
  /** ISO date the claim was verified, e.g. "2026-03-14". */
  verifiedOn?: string;
  method?: string;
  verifiedBy?: string;
  confidence?: Confidence;
  /** Shown when nothing has been verified yet. */
  note?: string;
  onDark?: boolean;
};

/**
 * The provenance note. This is the ONLY component that uses the serif.
 *
 * Newsreader marks verified information. Using it for decoration anywhere
 * else destroys the signal, which is the point of the whole site.
 */
export function Evidence({
  source,
  verifiedOn,
  method,
  verifiedBy,
  confidence,
  note,
  onDark = false,
}: EvidenceProps) {
  const parts = [
    source ? `Source: ${source}` : null,
    method ? `Method: ${method}` : null,
    verifiedBy ? `Verified by: ${verifiedBy}` : null,
    verifiedOn ? `Verified: ${verifiedOn}` : null,
    confidence ? `Confidence: ${confidence}` : null,
  ].filter(Boolean);

  const body = parts.length > 0 ? parts.join(" \u00B7 ") : note;
  if (!body) return null;

  return (
    <p
      className={`font-evidence text-xs italic ${onDark ? "text-hamada" : "text-meta"}`}
    >
      {body}
    </p>
  );
}
