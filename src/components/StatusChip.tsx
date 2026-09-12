export type Status = "verified" | "unverified" | "pending" | "future";

type StatusChipProps = {
  status: Status;
  /** Override the default wording, e.g. "Not available". */
  label?: string;
  /** For red-900 surfaces: the marks switch to paper, keeping their shapes. */
  onDark?: boolean;
  /** "lg" when the status is itself a row heading. */
  size?: "sm" | "lg";
};

/**
 * Status mark (SOP 3.5): a small dot plus a word. Status is never carried by
 * colour alone - each state also has its own shape (filled dot, ring, dashed
 * ring) and an explicit label.
 *
 * On dark surfaces the green and amber would fall below 3:1 against red-900,
 * so the marks turn paper and the shape and word carry the meaning.
 */
const CONFIG: Record<
  Status,
  { label: string; shape: string; light: string; dark: string; text: string }
> = {
  verified: {
    label: "Verified",
    shape: "rounded-full",
    light: "bg-status-verified",
    dark: "bg-paper",
    text: "text-status-verified",
  },
  pending: {
    label: "Verification in progress",
    shape: "rounded-full border-2 bg-transparent",
    light: "border-status-progress",
    dark: "border-paper",
    text: "text-status-progress",
  },
  unverified: {
    label: "Not available",
    shape: "rounded-full",
    light: "bg-ink-500",
    dark: "bg-paper/60",
    text: "text-ink-500",
  },
  future: {
    label: "Planned",
    shape: "rounded-full border border-dashed bg-transparent",
    light: "border-ink-500",
    dark: "border-paper/70",
    text: "text-ink-500",
  },
};

export function StatusChip({ status, label, onDark = false, size = "sm" }: StatusChipProps) {
  const config = CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-2 font-medium ${
        size === "lg" ? "text-lg" : "text-sm"
      } ${onDark ? "text-paper" : config.text}`}
    >
      <span
        aria-hidden="true"
        className={`inline-block shrink-0 ${size === "lg" ? "size-3" : "size-2.5"} ${config.shape} ${
          onDark ? config.dark : config.light
        }`}
      />
      {label ?? config.label}
    </span>
  );
}
