"use client";

// Client Component because the form is a stepper: four steps whose values
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
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  Briefcase,
  Building2,
  Bus,
  CalendarClock,
  CircleCheck,
  Globe,
  Hotel,
  Languages,
  Mail,
  Map,
  MapPin,
  Moon,
  Search,
  Send,
  Sparkles,
  Tag,
  User,
  Users,
  Utensils,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { submitRfq } from "@/features/rfq/actions";
import { RFQ_NEXT_STEPS } from "@/features/rfq/next-steps";
// Types only from ./validation, so zod never reaches the browser bundle.
import type { RfqFormState } from "@/features/rfq/validation";
import { PROGRAMME_TYPES } from "@/features/rfq/options";
import { Evidence } from "@/components/Evidence";
import { COMPANY } from "@/lib/nav";

const initialState: RfqFormState = { status: "idle" };

type StepNumber = 1 | 2 | 3 | 4;

const STEPS: {
  number: StepNumber;
  label: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  optional: boolean;
}[] = [
  {
    number: 1,
    label: "Company",
    title: "Company Information",
    subtitle: "Tell us about your travel agency",
    icon: Building2,
    optional: false,
  },
  {
    number: 2,
    label: "Contact",
    title: "Your contact details",
    subtitle: "Who we reply to, and the size of the programme",
    icon: User,
    optional: false,
  },
  {
    number: 3,
    label: "Logistics",
    title: "Detail, if you have it",
    subtitle: "Rooms, transport, meals and budget sharpen the quote",
    icon: Hotel,
    optional: true,
  },
  {
    number: 4,
    label: "Notes",
    title: "Anything else we should know",
    subtitle: "Accessibility, special requirements and how you found us",
    icon: Sparkles,
    optional: true,
  },
];

const LAST_STEP = STEPS.length as StepNumber;
/** The first step from which everything required has been seen. */
const FIRST_SENDABLE_STEP: StepNumber = 3;

/** Which step each field lives on, so a server error can reopen that step. */
const STEP_FIELDS: Record<StepNumber, string[]> = {
  1: ["company", "country", "city", "website"],
  2: ["contactName", "role", "email", "travellers", "programmeType"],
  3: [
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
  4: ["accessibilityNeeds", "specialRequirements", "previousMorocco", "foundUs"],
};

/**
 * Plain-language errors (SOP 3.6). The schema's own wording ("Too small:
 * expected string to have >=2 characters") tells a buyer nothing about what
 * to fix, so each field says it plainly.
 */
const PLAIN_ERRORS: Record<string, string> = {
  company: "Enter your company name.",
  country: "Enter the country you sell from.",
  contactName: "Enter your name.",
  role: "Enter your role, for example product manager or group coordinator.",
  email: "Enter an email address we can reply to, such as name@company.com.",
  travellers: "Enter the number of travellers as a whole number, 1 or more.",
  programmeType: "Choose the programme type closest to this requirement.",
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

/** Soft filled control with room for a leading icon. Focus keeps the 2px red ring. */
const inputClass = (invalid: boolean, withIcon: boolean) =>
  `w-full rounded-xl border bg-paper-2/60 py-3 pr-4 text-base text-ink-900 placeholder:text-ink-500/80 transition-colors duration-200 hover:border-ink-500/70 focus:border-red-600 focus:bg-paper focus:outline-2 focus:outline-offset-2 focus:outline-red-600 ${
    withIcon ? "pl-11" : "pl-4"
  } ${invalid ? "border-red-600" : "border-ink-500/35"}`;

const pillBase =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50";
const pillPrimary = `${pillBase} bg-red-600 text-paper shadow-raised hover:bg-red-900`;
const pillSecondary = `${pillBase} border border-ink-900/20 bg-paper text-ink-900 hover:border-ink-900`;

type ControlProps = {
  id: string;
  name: string;
  autoComplete: string | undefined;
  required: boolean;
  "aria-describedby": string | undefined;
  "aria-invalid": true | undefined;
  className: string;
};

type FormFieldProps = {
  name: string;
  label: string;
  /** An HTML autocomplete token, so browsers can fill the field (WCAG 1.3.5). */
  autoComplete?: string;
  errors?: string[];
  required?: boolean;
  type?: string;
  hint?: string;
  placeholder?: string;
  icon?: LucideIcon;
  textarea?: boolean;
  rows?: number;
  /**
   * Render prop rather than plain children, so a custom control is handed the
   * generated id and aria wiring. Passing an element directly would leave the
   * <label for> pointing at an id nothing carries.
   */
  children?: (props: ControlProps) => ReactNode;
};

/** Label above the control, a red asterisk (spoken as "required"), error below it. */
function FormField({
  name,
  label,
  autoComplete,
  errors,
  required = false,
  type = "text",
  hint,
  placeholder,
  icon: Icon,
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
  const withIcon = Boolean(Icon) && !textarea;

  const shared: ControlProps = {
    id,
    name,
    autoComplete,
    required,
    "aria-describedby": describedBy,
    "aria-invalid": error ? true : undefined,
    className: inputClass(Boolean(error), withIcon),
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-sm font-semibold text-ink-900">
        {label}
        {required ? (
          <>
            <span aria-hidden="true" className="text-red-600"> *</span>
            <span className="sr-only"> (required)</span>
          </>
        ) : null}
      </label>
      {hint ? (
        <span id={hintId} className="mt-1 text-sm text-ink-500">
          {hint}
        </span>
      ) : null}
      <div className="relative mt-2">
        {withIcon && Icon ? (
          <Icon
            aria-hidden="true"
            size={18}
            strokeWidth={1.75}
            className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-ink-500"
          />
        ) : null}
        {children ? (
          children(shared)
        ) : textarea ? (
          <textarea {...shared} rows={rows} placeholder={placeholder} />
        ) : (
          <input {...shared} type={type} placeholder={placeholder} />
        )}
      </div>
      {error ? (
        // red-600 on paper: 5.84:1
        <span id={errorId} className="mt-2 text-sm text-red-600">
          {error}
        </span>
      ) : null}
    </div>
  );
}

/** The card every state of the form sits in: header band, body, footer strip. */
function FormCard({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-rule bg-paper shadow-raised">
      {children}
      <p className="border-t border-rule bg-paper-2/70 px-6 py-4 text-center text-sm text-ink-500">
        Rather email?{" "}
        <a
          href={`mailto:${COMPANY.email.b2b}`}
          className="wrap-anywhere font-semibold text-red-600 underline-offset-4 hover:underline"
        >
          {COMPANY.email.b2b}
        </a>
      </p>
    </div>
  );
}

export function RfqForm() {
  const [state, formAction, pending] = useActionState(submitRfq, initialState);
  const [step, setStep] = useState<StepNumber>(1);
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
      <FormCard>
        <div role="status" className="p-6 sm:p-10">
          <span
            aria-hidden="true"
            className="flex size-14 items-center justify-center rounded-2xl bg-red-050 text-red-600"
          >
            <CircleCheck size={28} strokeWidth={1.75} />
          </span>
          <h2 className="mt-6 text-2xl font-bold tracking-tight text-ink-900">We have your request</h2>
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
        </div>
      </FormCard>
    );
  }

  const stepHasError = (number: StepNumber) =>
    STEP_FIELDS[number].some((field) => errors[field]?.length);

  const heading = (number: StepNumber) => {
    const item = STEPS[number - 1]!;
    return (
      <>
        <legend className="sr-only">
          Step {item.number} of {LAST_STEP}: {item.title}
        </legend>
        <div>
          <h2
            ref={(element) => {
              headingRefs.current[number] = element;
            }}
            tabIndex={-1}
            className="text-2xl font-bold tracking-tight text-ink-900"
          >
            {item.title}
          </h2>
          <p className="mt-2 text-base text-ink-500">{item.subtitle}</p>
        </div>
      </>
    );
  };

  return (
    <FormCard>
      <form action={formAction} onSubmit={onSubmit} noValidate>
        {/* Step indicator. Every step stays reachable; the last two are optional. */}
        <nav aria-label="Form steps" className="border-b border-rule bg-paper-2/50 px-3 py-6 sm:px-8">
          <ol className="flex items-start">
            {STEPS.map((item, index) => {
              const current = item.number === step;
              const passed = item.number < step;
              const hasError = stepHasError(item.number);
              const Icon = item.icon;
              const last = index === STEPS.length - 1;
              return (
                <li key={item.number} className={`flex items-start ${last ? "" : "flex-1"}`}>
                  <button
                    type="button"
                    onClick={() => goToStep(item.number)}
                    aria-current={current ? "step" : undefined}
                    className="group flex w-16 flex-col items-center gap-2 rounded-xl text-center sm:w-24"
                  >
                    <span
                      aria-hidden="true"
                      className={`flex size-12 items-center justify-center rounded-xl border transition-all duration-200 ${
                        current
                          ? "border-red-600 bg-red-600 text-paper shadow-raised ring-4 ring-red-600/15"
                          : hasError
                            ? "border-red-600 bg-red-050 text-red-600"
                            : passed
                              ? "border-red-600/40 bg-red-050 text-red-600"
                              : "border-rule bg-paper text-ink-500 group-hover:border-ink-500 group-hover:text-ink-900"
                      }`}
                    >
                      <Icon size={20} strokeWidth={1.75} />
                    </span>
                    <span
                      className={`text-[0.6875rem] font-semibold uppercase tracking-wide sm:text-xs ${
                        hasError ? "text-red-600" : current ? "text-ink-900" : "text-ink-500"
                      }`}
                    >
                      <span className="sr-only">Step {item.number}: </span>
                      {item.label}
                      <span className="sr-only">
                        {hasError ? ", needs attention" : item.optional ? ", optional" : ", required"}
                      </span>
                    </span>
                  </button>
                  {!last ? (
                    <span
                      aria-hidden="true"
                      className={`mx-1 mt-6 h-0.5 flex-1 rounded-full transition-colors duration-200 ${
                        passed ? "bg-red-600" : "bg-ink-500/20"
                      }`}
                    />
                  ) : null}
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="flex flex-col gap-8 p-6 sm:p-8">
          {state.status === "error" ? (
            // red-900 on red-050: 10.58:1
            <div role="alert" className="rounded-xl border border-red-600 bg-red-050 px-4 py-3 text-base text-red-900">
              {state.message}
            </div>
          ) : null}

          {/* Honeypot. Hidden from people, left empty by real browsers. */}
          <div aria-hidden="true" className="hidden">
            <label htmlFor="companyWebsite">Company website</label>
            <input id="companyWebsite" name="companyWebsite" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          {/*
            All steps stay mounted and only the current one is shown, so what a
            buyer typed on another step is kept - and submitted - when they move.
          */}
          <fieldset hidden={step !== 1} className="flex flex-col gap-6 border-0 p-0">
            {heading(1)}
            <FormField name="company" label="Company name" icon={Building2} placeholder="Your Travel Agency Ltd" autoComplete="organization" required errors={errors.company} />
            <div className="grid gap-6 sm:grid-cols-2">
              <FormField name="country" label="Country" icon={MapPin} placeholder="France" autoComplete="country-name" required errors={errors.country} />
              <FormField name="city" label="City" icon={MapPin} placeholder="Paris" autoComplete="address-level2" errors={errors.city} />
            </div>
            <FormField name="website" label="Website" icon={Globe} type="url" placeholder="https://www.youragency.com" autoComplete="url" errors={errors.website} />
          </fieldset>

          <fieldset hidden={step !== 2} className="flex flex-col gap-6 border-0 p-0">
            {heading(2)}
            <div className="grid gap-6 sm:grid-cols-2">
              <FormField name="contactName" label="Your name" icon={User} placeholder="Jane Smith" autoComplete="name" required errors={errors.contactName} />
              <FormField name="role" label="Your role" icon={Briefcase} placeholder="Product manager" autoComplete="organization-title" required errors={errors.role} />
              <FormField name="email" label="Email" icon={Mail} placeholder="name@company.com" type="email" autoComplete="email" required errors={errors.email} />
              <FormField name="travellers" label="Number of travellers" icon={Users} placeholder="24" type="number" required errors={errors.travellers} />
            </div>
            <FormField name="programmeType" label="Programme type" icon={Tag} required errors={errors.programmeType}>
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
          </fieldset>

          <fieldset hidden={step !== 3} className="flex flex-col gap-6 border-0 p-0">
            {heading(3)}
            <div className="grid gap-6 sm:grid-cols-2">
              <FormField name="rooms" label="Rooms" icon={BedDouble} type="number" placeholder="12" errors={errors.rooms} />
              <FormField name="nights" label="Nights" icon={Moon} type="number" placeholder="7" errors={errors.nights} />
              <FormField name="hotelCategory" label="Hotel category" icon={Hotel} placeholder="5-star or riad" errors={errors.hotelCategory} />
              <FormField name="transport" label="Transport" icon={Bus} placeholder="Private coach" errors={errors.transport} />
              <FormField name="guideLanguage" label="Guide language" icon={Languages} placeholder="French" errors={errors.guideLanguage} />
              <FormField name="meals" label="Meals" icon={Utensils} placeholder="Half board" errors={errors.meals} />
              <FormField name="budgetRange" label="Budget range" icon={Wallet} placeholder="Per person, in EUR" errors={errors.budgetRange} />
              <FormField name="quoteDeadline" label="You need the quote by" icon={CalendarClock} type="date" errors={errors.quoteDeadline} />
            </div>
            <FormField name="activities" label="Activities" textarea rows={3} errors={errors.activities} />
          </fieldset>

          <fieldset hidden={step !== 4} className="flex flex-col gap-6 border-0 p-0">
            {heading(4)}
            <FormField name="accessibilityNeeds" label="Accessibility needs" textarea rows={3} errors={errors.accessibilityNeeds} />
            <FormField name="specialRequirements" label="Special requirements" textarea rows={3} errors={errors.specialRequirements} />
            <div className="grid gap-6 sm:grid-cols-2">
              <FormField name="previousMorocco" label="Previous Morocco experience" icon={Map} errors={errors.previousMorocco} />
              <FormField name="foundUs" label="How you found us" icon={Search} errors={errors.foundUs} />
            </div>
          </fieldset>

          <div className="flex flex-col gap-6 border-t border-rule pt-6">
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => goToStep((step - 1) as StepNumber)}
                    className="inline-flex min-h-11 items-center gap-2 px-1 text-sm font-semibold text-ink-500 transition-colors duration-200 hover:text-ink-900"
                  >
                    <ArrowLeft aria-hidden="true" size={16} strokeWidth={2} />
                    Back
                  </button>
                ) : null}
              </div>
              <div className="flex flex-col-reverse gap-3 sm:flex-row">
                {step < LAST_STEP ? (
                  <>
                    {/* Once the required steps are behind the buyer, the rest is optional. */}
                    {step >= FIRST_SENDABLE_STEP ? (
                      <button type="submit" disabled={pending} className={pillSecondary}>
                        {pending ? "Sending…" : "Send now"}
                      </button>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => goToStep((step + 1) as StepNumber)}
                      className={pillPrimary}
                    >
                      Continue
                      <ArrowRight aria-hidden="true" size={18} strokeWidth={2} />
                    </button>
                  </>
                ) : (
                  <button type="submit" disabled={pending} className={pillPrimary}>
                    {pending ? "Sending…" : "Send request"}
                    <Send aria-hidden="true" size={16} strokeWidth={2} />
                  </button>
                )}
              </div>
            </div>
            <Evidence note="What you send here is commercially sensitive. It is stored encrypted, access to it is logged, and it is never used as public content without your written permission." />
          </div>
        </div>
      </form>
    </FormCard>
  );
}
