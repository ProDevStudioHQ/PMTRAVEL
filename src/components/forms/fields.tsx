/**
 * Form field configs (plain, serialisable data) and the control renderer.
 * Labels always visible above fields; "(required)" in the label text;
 * errors linked with aria-describedby and aria-invalid.
 */

export type FieldConfig = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "url" | "date" | "number" | "password" | "select" | "textarea" | "checkboxes";
  required?: boolean;
  hint?: string;
  options?: readonly string[];
  autoComplete?: string;
  placeholder?: string;
  /** Span both columns on wide screens. */
  wide?: boolean;
  min?: number;
  rows?: number;
};

const control = (invalid: boolean, onDark: boolean) =>
  `block w-full min-h-12 rounded-control border px-4 py-3 text-[0.9375rem] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-0 ${
    onDark
      ? "border-sand/25 bg-midnight-2 text-sand placeholder:text-sand/50 focus-visible:border-gold focus-visible:ring-gold/40"
      : "border-ink/15 bg-ivory text-ink placeholder:text-muted/80 focus-visible:border-terracotta-600 focus-visible:ring-terracotta/30"
  } ${invalid ? (onDark ? "border-terracotta-300" : "border-terracotta-700") : ""}`;

type Props = {
  field: FieldConfig;
  idPrefix: string;
  error?: string;
  value?: string | string[];
  onDark?: boolean;
};

export function FieldControl({ field, idPrefix, error, value, onDark = false }: Props) {
  const id = `${idPrefix}-${field.name}`;
  const hintId = field.hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const invalid = Boolean(error);
  const text = typeof value === "string" ? value : undefined;
  const wide = field.wide || field.type === "textarea" || field.type === "checkboxes";

  const label = (
    <>
      {field.label}
      {field.required ? <span className={onDark ? "text-sand/60" : "text-muted"}> (required)</span> : null}
    </>
  );

  const helper = (
    <>
      {field.hint ? (
        <p id={hintId} className={`mt-1.5 text-[0.8125rem] ${onDark ? "text-sand/65" : "text-muted"}`}>
          {field.hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className={`mt-1.5 text-[0.8125rem] font-medium ${onDark ? "text-terracotta-300" : "text-terracotta-700"}`}>
          {error}
        </p>
      ) : null}
    </>
  );

  if (field.type === "checkboxes") {
    const selected = Array.isArray(value) ? value : [];
    return (
      <fieldset className={wide ? "sm:col-span-2" : ""} aria-describedby={describedBy}>
        <legend className={`mb-2 text-sm font-medium ${onDark ? "text-sand" : "text-ink"}`}>{label}</legend>
        <div className="flex flex-wrap gap-2">
          {field.options?.map((option) => {
            const optionId = `${id}-${option.replace(/\W+/g, "-").toLowerCase()}`;
            return (
              <label
                key={option}
                htmlFor={optionId}
                className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm transition-colors has-checked:border-terracotta-600 has-checked:bg-terracotta-600 has-checked:text-white has-focus-visible:ring-2 has-focus-visible:ring-terracotta/40 ${
                  onDark ? "border-sand/25 text-sand" : "border-ink/15 bg-ivory text-ink"
                }`}
              >
                <input id={optionId} type="checkbox" name={field.name} value={option} defaultChecked={selected.includes(option)} className="sr-only" />
                {option}
              </label>
            );
          })}
        </div>
        {helper}
      </fieldset>
    );
  }

  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className={`mb-2 block text-sm font-medium ${onDark ? "text-sand" : "text-ink"}`}>
        {label}
      </label>
      {field.type === "select" ? (
        <select
          id={id}
          name={field.name}
          defaultValue={text ?? ""}
          required={field.required}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className={control(invalid, onDark)}
        >
          <option value="">Choose…</option>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : field.type === "textarea" ? (
        <textarea
          id={id}
          name={field.name}
          rows={field.rows ?? 5}
          defaultValue={text}
          required={field.required}
          placeholder={field.placeholder}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className={control(invalid, onDark)}
        />
      ) : (
        <input
          id={id}
          name={field.name}
          type={field.type}
          defaultValue={text}
          required={field.required}
          autoComplete={field.autoComplete}
          placeholder={field.placeholder}
          min={field.min}
          inputMode={field.type === "number" ? "numeric" : undefined}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className={control(invalid, onDark)}
        />
      )}
      {helper}
    </div>
  );
}
