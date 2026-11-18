"use client";

/**
 * Client Component: one accessible form engine for quote, partner, contact
 * and newsletter forms. useActionState keeps it working without JavaScript
 * (plain POST to the server action) and adds inline errors with it.
 * Entries survive a failed submission: the action echoes values back and the
 * form remounts with them as defaults.
 */
import { useActionState } from "react";
import { usePathname } from "next/navigation";
import { CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { submitEnquiry } from "@/features/enquiry/actions";
import { initialEnquiryState, type EnquiryKind, type EnquiryState } from "@/features/enquiry/options";
import { buttonClasses } from "@/components/Button";
import { WhatsappIcon } from "@/components/Icon";
import { whatsappLink } from "@/lib/company";
import { FieldControl, type FieldConfig } from "@/components/forms/fields";
import Link from "next/link";

type Props = {
  kind: EnquiryKind;
  fields: FieldConfig[];
  submitLabel: string;
  successTitle: string;
  successBody: string;
  defaults?: Record<string, string | string[]>;
  idPrefix?: string;
  compact?: boolean;
  onDark?: boolean;
  action?: (state: EnquiryState, data: FormData) => Promise<EnquiryState>;
  footnote?: boolean;
};

export function EnquiryForm({
  kind,
  fields,
  submitLabel,
  successTitle,
  successBody,
  defaults = {},
  idPrefix = kind,
  compact = false,
  onDark = false,
  action = submitEnquiry,
  footnote = true,
}: Props) {
  const [state, formAction, pending] = useActionState(action, initialEnquiryState);
  const pathname = usePathname();

  if (state.status === "success") {
    return (
      <div role="status" className={`rounded-card border p-8 ${onDark ? "border-sand/20 bg-midnight-2 text-sand" : "border-line bg-ivory"}`}>
        <CheckCircle2 aria-hidden="true" className="text-terracotta" size={32} strokeWidth={1.5} />
        <h3 className="t-h3 mt-4">{successTitle}</h3>
        <p className={`mt-3 ${onDark ? "text-sand/80" : "text-muted"}`}>{successBody}</p>
        <p className="mt-4 text-sm">
          Your reference: <strong className="tabular">{state.reference}</strong>
        </p>
        {kind !== "newsletter" ? (
          <a href={whatsappLink(`Hello, following up on request ${state.reference}.`)} target="_blank" rel="noopener noreferrer" className={buttonClasses("secondary", onDark ? "dark" : "light", "mt-6")}>
            <WhatsappIcon size={18} />
            <span>Follow up on WhatsApp</span>
          </a>
        ) : null}
      </div>
    );
  }

  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const values = state.status === "error" && state.values ? state.values : defaults;
  const key = "attempt" in state ? state.attempt : 0;

  return (
    <form key={key} action={formAction} noValidate className="relative" aria-describedby={state.status === "error" ? `${idPrefix}-summary` : undefined}>
      <input type="hidden" name="kind" value={kind} />
      <input type="hidden" name="path" value={pathname} />
      {Object.entries(defaults)
        .filter(([name, value]) => typeof value === "string" && !fields.some((f) => f.name === name))
        .map(([name, value]) => (
          <input key={name} type="hidden" name={name} value={value as string} />
        ))}
      {/* Honeypot: hidden from people and assistive tech; bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${idPrefix}-website_url`}>Leave this field empty</label>
        <input id={`${idPrefix}-website_url`} name="website_url" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" ? (
        <div id={`${idPrefix}-summary`} role="alert" className="mb-6 flex gap-3 rounded-2xl border border-terracotta-700/30 bg-red-050 p-4 text-sm text-ink">
          <AlertCircle aria-hidden="true" size={20} className="shrink-0 text-terracotta-700" />
          <p>{state.message}</p>
        </div>
      ) : null}

      <div className={`grid gap-x-5 ${compact ? "gap-y-4" : "gap-y-6"} sm:grid-cols-2`}>
        {fields.map((field) => (
          <FieldControl key={field.name} field={field} idPrefix={idPrefix} error={errors[field.name]} value={values[field.name]} onDark={onDark} />
        ))}
      </div>

      <div className={`mt-8 flex flex-col gap-4 sm:flex-row sm:items-center ${compact ? "mt-5" : ""}`}>
        <button type="submit" disabled={pending} aria-disabled={pending} className={buttonClasses("primary", onDark ? "dark" : "light", "sm:min-w-56")}>
          <span>{pending ? "Sending…" : submitLabel}</span>
        </button>
        {kind === "quote" ? (
          <p className={`inline-flex items-center gap-2 text-sm font-medium ${onDark ? "text-sand" : "text-zellige"}`}>
            <Clock aria-hidden="true" size={16} strokeWidth={1.75} />
            We reply within 24 hours
          </p>
        ) : null}
        {footnote ? (
          <p className={`text-[0.8125rem] ${onDark ? "text-sand/70" : "text-muted"}`}>
            By sending, you agree to our{" "}
            <Link href="/privacy" className="underline underline-offset-2">
              privacy policy
            </Link>
            .
          </p>
        ) : null}
      </div>
    </form>
  );
}
