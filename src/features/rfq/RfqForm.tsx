"use client";

// Client Component because the form is a stepper: three steps whose values
// are kept as the buyer moves between them, server errors mapped back to the
// step and field they belong to, and focus moved to each step as it opens.
// Nothing is trusted here - the server action validates everything again.

import {
  startTransition,
  useActionState,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { submitRfq } from "@/features/rfq/actions";
import { RFQ_NEXT_STEPS } from "@/features/rfq/next-steps";
import {
  DESTINATIONS,
  PROGRAMME_TYPES,
  type RfqFormState,
} from "@/features/rfq/validation";
import { Button } from "@/components/Button";
import { Evidence } from "@/components/Evidence";
import { controlClass } from "@/components/Field";

const initialState: RfqFormState = { status: "idle" };

type StepNumber = 1 | 2 | 3;

const STEPS: { number: StepNumber; title: string; optional: boolean }[] = [
  { number: 1, title: "What we need to start", optional: false },
  { number: 2, title: "Detail, if you have it", optional: true },
  { number: 3, title: "Anything else we should know", optional: true },
];

/** Which step each field lives on, so a server error can reopen that step. */
const STEP_FIELDS: Record<StepNumber, string[]> = {
  1: [
    "company",
    "country",
    "contactName",
    "role",
    "email",
    "travellers",
    "destinations",
    "dateFrom",
    "dateTo",
    "programmeType",
    "brief",
    "attachments",
  ],
  2: [
    "rooms",
    "nights",
    "hotelCategory",
    "transport",
    "guideLanguage",
    "meals",
    "budgetRange",
    "quoteDeadline",
    "activities",
  ],
  3: ["accessibilityNeeds", "specialRequirements", "previousMorocco", "foundUs"],
};

/**
 * Plain-language errors (SOP 3.6). The schema's own wording ("Too small:
 * expected string to have >=2 characters") tells a buyer nothing about what
 * to fix, so each field says it plainly. Messages the schema already writes
 * for people - dates, destinations, upload problems - are passed through.
 */
const PLAIN_ERRORS: Record<string, string> = {
  company: "Enter your company name.",
  country: "Enter the country you sell from.",
  contactName: "Enter your name.",
  role: "Enter your role, for example product manager or group coordinator.",
  email: "Enter an email address we can reply to, such as name@company.com.",
  travellers: "Enter the number of travellers as a whole number, 1 or more.",
  programmeType: "Choose the programme type closest to this requirement.",
  brief: "Write a sentence or two about what the programme has to achieve (at least 20 characters).",
  rooms: "Enter rooms as a whole number, or leave it empty.",
  nights: "Enter nights as a whole number, or leave it empty.",
  quoteDeadline: "Enter the date you need the quote by, or leave it empty.",
};

const SCHEMA_WORDING = /^(Invalid|Too (small|big)|Expected|Required)/i;

function plainError(name: string, errors?: string[]): string | undefined {
  if (!errors?.length) return undefined;
  const readable = errors.filter((message) => !SCHEMA_WORDING.test(message));
  if (readable.length > 0) return readable.join(" ");
  return PLAIN_ERRORS[name] ?? "Check this field and try again.";
}

type ControlProps = {
  id: string;
  name: string;
  required: boolean;
  "aria-describedby": string | undefined;
  "aria-invalid": true | undefined;
  className: string;
};

type FormFieldProps = {
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
  children?: (props: ControlProps) => ReactNode;
};

/** Label above the control, "(required)" in the label text, error below it. */
function FormField({
  name,
  label,
  errors,
  required = false,
  type = "text",
  hint,
  textarea = false,
  rows = 5,
  children,
}: FormFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const error = plainError(name, errors);
  const describedBy =
    [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined;

  const shared: ControlProps = {
    id,
    name,
    required,
    "aria-describedby": describedBy,
    "aria-invalid": error ? true : undefined,
    className: `mt-2 ${controlClass(Boolean(error))}`,
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-sm font-medium text-ink-900">
        {label}
        <span className="font-normal text-ink-500">{required ? " (required)" : " (optional)"}</span>
      </label>
      {hint ? (
        <span id={hintId} className="mt-1 text-sm text-ink-500">
          {hint}
        </span>
      ) : null}
      {children ? (
        children(shared)
      ) : textarea ? (
        <textarea {...shared} rows={rows} />
      ) : (
        <input {...shared} type={type} />
      )}
      {error ? (
        // red-600 on paper: 5.84:1
        <span id={errorId} className="mt-2 text-sm text-red-600">
          {error}
        </span>
      ) : null}
    </div>
  );
}

export function RfqForm() {
  const [state, formAction, pending] = useActionState(submitRfq, initialState);
  const [step, setStep] = useState<StepNumber>(1);
  const [flexible, setFlexible] = useState(false);
  const [seenState, setSeenState] = useState(state);
  const headingRefs = useRef<Record<number, HTMLHeadingElement | null>>({});
  const moveFocus = useRef(false);
  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};

  // When a submission comes back with field errors, reopen the earliest step
  // that has one, so the buyer is never sent an error they cannot see.
  // Adjusted during render, like the header, rather than in an effect.
  if (seenState !== state) {
    setSeenState(state);
    if (state.status === "error" && state.fieldErrors) {
      const failed = Object.keys(state.fieldErrors);
      const target = STEPS.find((item) =>
        STEP_FIELDS[item.number].some((field) => failed.includes(field))
      );
      if (target) setStep(target.number);
    }
  }

  // Moving between steps by the buttons puts focus on the new step's heading,
  // so keyboard and screen reader users land where the content changed.
  useEffect(() => {
    if (!moveFocus.current) return;
    moveFocus.current = false;
    headingRefs.current[step]?.focus();
  }, [step]);

  const goToStep = (target: StepNumber) => {
    moveFocus.current = true;
    setStep(target);
  };

  // Dispatched by hand rather than left to <form action>: React resets an
  // action form after every submission, which wiped a buyer's entries when
  // validation failed. `action` stays on the form so it still submits
  // without JavaScript.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    startTransition(() => formAction(data));
  };

  if (state.status === "success") {
    return (
      <div role="status">
        <h2 className="text-2xl font-bold tracking-tight text-ink-900">We have your requirement</h2>
        <p className="measure mt-4 text-base text-ink-500">
          Your reference is{" "}
          <span className="tabular font-medium text-ink-900">{state.reference}</span>. An
          acknowledgement is on its way to the address you gave, setting out what
          happens next. Quote the reference on anything you send us about this
          request.
        </p>
        <h3 className="mt-8 text-lg font-semibold text-ink-900">What happens next</h3>
        <ol className="mt-4 border-t border-rule">
          {RFQ_NEXT_STEPS.map((item, index) => (
            <li key={item} className="flex gap-4 border-b border-rule py-3 text-base text-ink-900">
              <span className="tabular font-display font-bold">{index + 1}</span>
              {item}
            </li>
          ))}
        </ol>
        <div className="measure mt-6">
          <Evidence note="We have not published a response-time figure because we have not measured our own yet. This request is timestamped, and that measurement starts with it." />
        </div>
      </div>
    );
  }

  const stepHasError = (number: StepNumber) =>
    STEP_FIELDS[number].some((field) => errors[field]?.length);

  const heading = (number: StepNumber) => {
    const item = STEPS[number - 1]!;
    return (
      <>
        <legend className="sr-only">
          Step {item.number} of 3: {item.title}
        </legend>
        <h2
          ref={(element) => {
            headingRefs.current[number] = element;
          }}
          tabIndex={-1}
          className="text-2xl font-bold tracking-tight text-ink-900"
        >
          {item.title}
        </h2>
      </>
    );
  };

  return (
    <form action={formAction} onSubmit={onSubmit} noValidate className="flex flex-col gap-8">
      {/* Step indicator. Every step stays reachable; steps 2 and 3 are optional. */}
      <nav aria-label="Form steps">
        <ol className="grid gap-2 sm:grid-cols-3">
          {STEPS.map((item) => {
            const current = item.number === step;
            const hasError = stepHasError(item.number);
            return (
              <li key={item.number}>
                <button
                  type="button"
                  onClick={() => goToStep(item.number)}
                  aria-current={current ? "step" : undefined}
                  className={`flex min-h-12 w-full items-center gap-3 rounded-control border px-3 py-2 text-left transition-colors duration-200 ${
                    current ? "border-red-600 bg-red-050" : "border-rule bg-paper hover:border-ink-500"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`tabular flex size-7 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold ${
                      current ? "bg-red-600 text-paper" : "bg-paper-2 text-ink-900"
                    }`}
                  >
                    {item.number}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm font-medium text-ink-900">
                      <span className="sr-only">Step {item.number}: </span>
                      {item.title}
                    </span>
                    <span className={`text-xs ${hasError ? "text-red-600" : "text-ink-500"}`}>
                      {hasError ? "Needs attention" : item.optional ? "Optional" : "Required"}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      {state.status === "error" ? (
        // red-900 on red-050: 10.58:1
        <div role="alert" className="rounded-control border border-red-600 bg-red-050 px-4 py-3 text-base text-red-900">
          {state.message}
        </div>
      ) : null}

      {/* Honeypot. Hidden from people, left empty by real browsers. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="companyWebsite">Company website</label>
        <input id="companyWebsite" name="companyWebsite" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/*
        All three steps stay mounted and only the current one is shown, so what
        a buyer typed on another step is kept - and submitted - when they move.
      */}
      <fieldset hidden={step !== 1} className="flex flex-col gap-6 border-0 p-0">
        {heading(1)}
        <p className="measure text-base text-ink-500">
          This is the whole required form. Everything after it is optional and
          can follow later.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          <FormField name="company" label="Company" required errors={errors.company} />
          <FormField name="country" label="Country you sell from" required errors={errors.country} />
          <FormField name="contactName" label="Your name" required errors={errors.contactName} />
          <FormField name="role" label="Your role" required errors={errors.role} />
          <FormField name="email" label="Email" type="email" required errors={errors.email} />
          <FormField
            name="travellers"
            label="Number of travellers"
            type="number"
            required
            errors={errors.travellers}
          />
        </div>

        <fieldset
          className="border-0 p-0"
          aria-describedby={errors.destinations?.length ? "destinations-error" : undefined}
        >
          <legend className="text-sm font-medium text-ink-900">
            Destinations<span className="font-normal text-ink-500"> (required)</span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {DESTINATIONS.map((destination) => (
              <label
                key={destination}
                className="flex min-h-11 cursor-pointer items-center gap-2 rounded-control border border-rule bg-paper px-3 text-base text-ink-900 transition-colors duration-200 has-checked:border-red-600 has-checked:bg-red-050"
              >
                <input type="checkbox" name="destinations" value={destination} className="size-4 accent-red-600" />
                {destination}
              </label>
            ))}
          </div>
          {errors.destinations?.length ? (
            <p id="destinations-error" className="mt-2 text-sm text-red-600">
              {plainError("destinations", errors.destinations)}
            </p>
          ) : null}
        </fieldset>

        <div>
          <label className="flex min-h-11 cursor-pointer items-center gap-2 text-base text-ink-900">
            <input
              type="checkbox"
              name="datesFlexible"
              checked={flexible}
              onChange={(event) => setFlexible(event.target.checked)}
              className="size-4 accent-red-600"
            />
            Dates are flexible
          </label>
          {/*
            Required whenever they are shown: the server rejects a request with
            no dates unless "Dates are flexible" is ticked, which hides them.
          */}
          {!flexible ? (
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              <FormField name="dateFrom" label="From" type="date" required errors={errors.dateFrom} />
              <FormField name="dateTo" label="To" type="date" required errors={errors.dateTo} />
            </div>
          ) : null}
        </div>

        <FormField name="programmeType" label="Programme type" required errors={errors.programmeType}>
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
        </FormField>

        <FormField
          name="brief"
          label="The brief"
          required
          textarea
          errors={errors.brief}
          hint="What the programme has to achieve, and anything that would make it fail."
        />

        <FormField
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
              className="mt-2 block w-full text-base text-ink-900 file:mr-4 file:min-h-11 file:rounded-control file:border file:border-ink-900 file:bg-paper file:px-4 file:text-sm file:font-medium file:text-ink-900"
            />
          )}
        </FormField>
      </fieldset>

      <fieldset hidden={step !== 2} className="flex flex-col gap-6 border-0 p-0">
        {heading(2)}
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField name="rooms" label="Rooms" type="number" errors={errors.rooms} />
          <FormField name="nights" label="Nights" type="number" errors={errors.nights} />
          <FormField name="hotelCategory" label="Hotel category" errors={errors.hotelCategory} />
          <FormField name="transport" label="Transport" errors={errors.transport} />
          <FormField name="guideLanguage" label="Guide language" errors={errors.guideLanguage} />
          <FormField name="meals" label="Meals" errors={errors.meals} />
          <FormField name="budgetRange" label="Budget range" errors={errors.budgetRange} />
          <FormField
            name="quoteDeadline"
            label="You need the quote by"
            type="date"
            errors={errors.quoteDeadline}
          />
        </div>
        <FormField name="activities" label="Activities" textarea rows={3} errors={errors.activities} />
      </fieldset>

      <fieldset hidden={step !== 3} className="flex flex-col gap-6 border-0 p-0">
        {heading(3)}
        <FormField
          name="accessibilityNeeds"
          label="Accessibility needs"
          textarea
          rows={3}
          errors={errors.accessibilityNeeds}
        />
        <FormField
          name="specialRequirements"
          label="Special requirements"
          textarea
          rows={3}
          errors={errors.specialRequirements}
        />
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            name="previousMorocco"
            label="Previous Morocco experience"
            errors={errors.previousMorocco}
          />
          <FormField name="foundUs" label="How you found us" errors={errors.foundUs} />
        </div>
      </fieldset>

      {/* Step 1 alone is a complete request, so sending is available on every step. */}
      <div className="flex flex-col gap-6 border-t border-rule pt-8">
        <div className="flex flex-wrap items-center gap-4">
          <Button type="submit" disabled={pending}>
            {pending ? "Sending…" : "Send this requirement"}
          </Button>
          {step < 3 ? (
            <Button type="button" variant="secondary" onClick={() => goToStep((step + 1) as StepNumber)}>
              {step === 1 ? "Add rooms, transport, meals and budget" : "Add accessibility and special requirements"}
            </Button>
          ) : null}
          {step > 1 ? (
            <Button type="button" variant="ghost" onClick={() => goToStep((step - 1) as StepNumber)}>
              Back to step {step - 1}
            </Button>
          ) : null}
        </div>
        <Evidence note="What you send here is commercially sensitive. It is stored encrypted, access to it is logged, and it is never used as public content without your written permission." />
      </div>
    </form>
  );
}
