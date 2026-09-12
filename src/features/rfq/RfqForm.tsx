"use client";

// Client Component because the form is progressive: step 1 is submittable on
// its own, steps 2 and 3 open on request, and validation errors have to be
// linked back to their fields without a full page reload. Nothing else on the
// site needs client JavaScript.

import { useActionState, useId, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitRfq } from "@/features/rfq/actions";
import {
  DESTINATIONS,
  PROGRAMME_TYPES,
  type RfqFormState,
} from "@/features/rfq/validation";
import { Button } from "@/components/Button";
import { Evidence } from "@/components/Evidence";

const initialState: RfqFormState = { status: "idle" };

type FieldProps = {
  name: string;
  label: string;
  errors?: string[];
  required?: boolean;
  type?: string;
  hint?: string;
  textarea?: boolean;
  rows?: number;
  /**
   * Render prop rather than plain children, so a custom control is handed the
   * generated id and aria wiring. Passing an element directly would leave the
   * <label for> pointing at an id nothing carries.
   */
  children?: (props: {
    id: string;
    name: string;
    required: boolean;
    "aria-describedby": string | undefined;
    "aria-invalid": true | undefined;
    className: string;
  }) => React.ReactNode;
};

function Field({
  name,
  label,
  errors,
  required = false,
  type = "text",
  hint,
  textarea = false,
  rows = 5,
  children,
}: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy =
    [hint ? hintId : null, errors?.length ? errorId : null]
      .filter(Boolean)
      .join(" ") || undefined;

  const shared = {
    id,
    name,
    required,
    "aria-describedby": describedBy,
    "aria-invalid": errors?.length ? (true as const) : undefined,
    className:
      "mt-2 block w-full min-h-[44px] rounded-[var(--radius-data)] border border-line bg-white/60 px-3 py-2 text-sm text-ink",
  };

  return (
    <p className="flex flex-col">
      <label htmlFor={id} className="text-xs font-medium text-ink">
        {label}
        {required ? (
          <span className="text-oxide"> *</span>
        ) : (
          <span className="text-meta"> (optional)</span>
        )}
      </label>
      {hint ? (
        <span id={hintId} className="mt-1 text-2xs text-meta">
          {hint}
        </span>
      ) : null}
      {children
        ? children(shared)
        : textarea
          ? <textarea {...shared} rows={rows} />
          : <input {...shared} type={type} />}
      {errors?.length ? (
        <span id={errorId} className="mt-2 text-2xs text-oxide">
          {errors.join(". ")}
        </span>
      ) : null}
    </p>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="accent" disabled={pending}>
      {pending ? "Sending…" : "Send this requirement"}
    </Button>
  );
}

export function RfqForm() {
  const [state, formAction] = useActionState(submitRfq, initialState);
  const [showStep2, setShowStep2] = useState(false);
  const [showStep3, setShowStep3] = useState(false);
  const [flexible, setFlexible] = useState(false);
  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};

  if (state.status === "success") {
    return (
      <div className="rounded-[var(--radius-data)] border border-line-soft p-8">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          We have your requirement
        </h2>
        <p className="measure mt-4 text-base text-meta">
          Your reference is{" "}
          <span className="tabular font-medium text-ink">{state.reference}</span>.
          An acknowledgement is on its way to the address you gave, setting out
          what happens next. Quote the reference on anything you send us about
          this request.
        </p>
        <div className="mt-6">
          <Evidence note="We have not published a response-time figure because we have not measured our own yet. This request is timestamped, and that measurement starts with it." />
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="flex flex-col gap-10">
      {state.status === "error" ? (
        <div
          role="alert"
          className="rounded-[var(--radius-data)] border border-oxide/50 px-4 py-3 text-sm text-oxide"
        >
          {state.message}
        </div>
      ) : null}

      {/* Honeypot. Hidden from people, left empty by real browsers. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="companyWebsite">Company website</label>
        <input
          id="companyWebsite"
          name="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <fieldset className="flex flex-col gap-6 border-0 p-0">
        <legend className="text-lg font-medium text-ink">
          1. What we need to start
        </legend>
        <p className="measure text-sm text-meta">
          This is the whole required form. Everything after it is optional and
          can follow later.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field name="company" label="Company" required errors={errors.company} />
          <Field name="country" label="Country you sell from" required errors={errors.country} />
          <Field name="contactName" label="Your name" required errors={errors.contactName} />
          <Field name="role" label="Your role" required errors={errors.role} />
          <Field name="email" label="Email" type="email" required errors={errors.email} />
          <Field
            name="travellers"
            label="Number of travellers"
            type="number"
            required
            errors={errors.travellers}
          />
        </div>

        <fieldset className="border-0 p-0">
          <legend className="text-xs font-medium text-ink">
            Destinations <span className="text-oxide">*</span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {DESTINATIONS.map((destination) => (
              <label
                key={destination}
                className="flex min-h-[44px] cursor-pointer items-center gap-2 rounded-[var(--radius-data)] border border-line-soft px-3 text-sm text-ink"
              >
                <input type="checkbox" name="destinations" value={destination} />
                {destination}
              </label>
            ))}
          </div>
          {errors.destinations?.length ? (
            <p className="mt-2 text-2xs text-oxide">{errors.destinations.join(". ")}</p>
          ) : null}
        </fieldset>

        <div>
          <label className="flex min-h-[44px] cursor-pointer items-center gap-2 text-sm text-ink">
            <input
              type="checkbox"
              name="datesFlexible"
              checked={flexible}
              onChange={(event) => setFlexible(event.target.checked)}
            />
            Dates are flexible
          </label>
          {!flexible ? (
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              <Field name="dateFrom" label="From" type="date" errors={errors.dateFrom} />
              <Field name="dateTo" label="To" type="date" errors={errors.dateTo} />
            </div>
          ) : null}
        </div>

        <Field name="programmeType" label="Programme type" required errors={errors.programmeType}>
          {(control) => (
            <select {...control} defaultValue="">
              <option value="" disabled>
                Choose one
              </option>
              {PROGRAMME_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          )}
        </Field>

        <Field
          name="brief"
          label="The brief"
          required
          textarea
          errors={errors.brief}
          hint="What the programme has to achieve, and anything that would make it fail."
        />

        <Field
          name="attachments"
          label="Attach an itinerary or brief"
          errors={errors.attachments}
          hint="PDF, DOC, DOCX, XLS, XLSX, JPG or PNG. Up to 5 files, 10MB each."
        >
          {(control) => (
            <input
              {...control}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
              className="mt-2 block w-full text-sm text-ink"
            />
          )}
        </Field>
      </fieldset>

      <div className="border-t border-line-soft pt-8">
        {showStep2 ? (
          <fieldset className="flex flex-col gap-6 border-0 p-0">
            <legend className="text-lg font-medium text-ink">
              2. Detail, if you have it
            </legend>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field name="rooms" label="Rooms" type="number" errors={errors.rooms} />
              <Field name="nights" label="Nights" type="number" errors={errors.nights} />
              <Field name="hotelCategory" label="Hotel category" errors={errors.hotelCategory} />
              <Field name="transport" label="Transport" errors={errors.transport} />
              <Field name="guideLanguage" label="Guide language" errors={errors.guideLanguage} />
              <Field name="meals" label="Meals" errors={errors.meals} />
              <Field name="budgetRange" label="Budget range" errors={errors.budgetRange} />
              <Field
                name="quoteDeadline"
                label="You need the quote by"
                type="date"
                errors={errors.quoteDeadline}
              />
            </div>
            <Field name="activities" label="Activities" textarea rows={3} errors={errors.activities} />
          </fieldset>
        ) : (
          <button
            type="button"
            onClick={() => setShowStep2(true)}
            className="min-h-[44px] text-sm text-petrol underline"
          >
            Add rooms, transport, meals and budget (optional)
          </button>
        )}
      </div>

      <div className="border-t border-line-soft pt-8">
        {showStep3 ? (
          <fieldset className="flex flex-col gap-6 border-0 p-0">
            <legend className="text-lg font-medium text-ink">
              3. Anything else we should know
            </legend>
            <Field
              name="accessibilityNeeds"
              label="Accessibility needs"
              textarea
              rows={3}
              errors={errors.accessibilityNeeds}
            />
            <Field
              name="specialRequirements"
              label="Special requirements"
              textarea
              rows={3}
              errors={errors.specialRequirements}
            />
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                name="previousMorocco"
                label="Previous Morocco experience"
                errors={errors.previousMorocco}
              />
              <Field name="foundUs" label="How you found us" errors={errors.foundUs} />
            </div>
          </fieldset>
        ) : (
          <button
            type="button"
            onClick={() => setShowStep3(true)}
            className="min-h-[44px] text-sm text-petrol underline"
          >
            Add accessibility and special requirements (optional)
          </button>
        )}
      </div>

      <div className="flex flex-col gap-4 border-t border-line-soft pt-8">
        <SubmitButton />
        <Evidence note="What you send here is commercially sensitive. It is stored encrypted, access to it is logged, and it is never used as public content without your written permission." />
      </div>
    </form>
  );
}
