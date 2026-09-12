import type { ComponentProps, ReactNode } from "react";

/**
 * Form primitives (SOP 3.6).
 *
 * Labels sit above fields and are always visible - no placeholder-as-label.
 * "Required" is written into the label text, not a bare asterisk. Hint and
 * error text are wired to the control through aria-describedby, and the error
 * explains what to fix in plain language.
 *
 * Plain components, no hooks, so they render on the server and inside Client
 * Components alike.
 */

/** Ids for a field's hint and error, so label, control and messages agree. */
export function fieldIds(id: string, { hint, error }: { hint?: string; error?: string }) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  return { hintId, errorId, describedBy };
}

type FieldProps = {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
};

export function Field({ id, label, required = false, hint, error, children }: FieldProps) {
  const { hintId, errorId } = fieldIds(id, { hint, error });
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-ink-900">
        {label}
        {required ? <span className="font-normal text-ink-500"> (required)</span> : null}
      </label>
      {hint ? (
        <p id={hintId} className="text-xs text-ink-500">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        // red-600 on paper: 5.84:1
        <p id={errorId} className="text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

// Border ink-500 holds 5.69:1 against paper, above the 3:1 non-text minimum.
const control =
  "w-full rounded-control border bg-paper px-3 py-3 text-base text-ink-900 transition-colors duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-red-600 disabled:cursor-not-allowed disabled:bg-paper-2 disabled:text-ink-500";

/** The shared control styling, also used by forms that render their own inputs (RfqForm). */
export const controlClass = (invalid = false) =>
  `${control} ${invalid ? "border-red-600" : "border-ink-500"}`;

type ControlExtras = {
  /** Marks the control invalid for both styling and assistive technology. */
  invalid?: boolean;
  describedBy?: string;
};

export function Input({
  invalid = false,
  describedBy,
  className = "",
  ...props
}: ComponentProps<"input"> & ControlExtras) {
  return (
    <input
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      className={`${controlClass(invalid)} ${className}`}
      {...props}
    />
  );
}

export function Textarea({
  invalid = false,
  describedBy,
  className = "",
  ...props
}: ComponentProps<"textarea"> & ControlExtras) {
  return (
    <textarea
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      className={`${controlClass(invalid)} min-h-32 ${className}`}
      {...props}
    />
  );
}

export function Select({
  invalid = false,
  describedBy,
  className = "",
  children,
  ...props
}: ComponentProps<"select"> & ControlExtras) {
  return (
    <select
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      className={`${controlClass(invalid)} ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}
