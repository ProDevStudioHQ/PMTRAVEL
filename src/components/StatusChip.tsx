export type Status = "verified" | "unverified" | "pending" | "future";

type StatusChipProps = {
  status: Status;
  /** Override the default wording, e.g. "Verification in progress". */
  label?: string;
  /**
   * Chips on the dark petrol surfaces use a restricted palette: oxide on
   * petrol-deep measures 2.89:1 and is never permitted.
   */
  onDark?: boolean;
};

/**
 * Status is never carried by colour alone. Every chip pairs a colour with a
 * distinct glyph and an explicit word.
 */
const CONFIG: Record<Status, { glyph: string; label: string; light: string; dark: string }> = {
  verified: {
    glyph: "\u2713",
    label: "Verified",
    light: "border-petrol/40 text-petrol",
    dark: "border-chalk/50 text-chalk",
  },
  unverified: {
    glyph: "\u2014",
    label: "Unverified",
    light: "border-line text-meta",
    dark: "border-hamada/40 text-hamada",
  },
  pending: {
    glyph: "\u25CB",
    label: "Verification in progress",
    light: "border-oxide/50 text-oxide",
    dark: "border-hamada/50 text-hamada",
  },
  future: {
    glyph: "\u2192",
    label: "Planned",
    light: "border-line-soft text-meta",
    dark: "border-hamada/30 text-hamada",
  },
};

export function StatusChip({ status, label, onDark = false }: StatusChipProps) {
  const config = CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[var(--radius-data)] border px-2 py-1 text-2xs font-medium ${
        onDark ? config.dark : config.light
      }`}
    >
      <span aria-hidden="true">{config.glyph}</span>
      {label ?? config.label}
    </span>
  );
}
