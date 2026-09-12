import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/Container";
import { Button, ButtonLink } from "@/components/Button";
import { Card } from "@/components/Card";
import { Evidence } from "@/components/Evidence";
import { Field, Input, Select, Textarea, fieldIds } from "@/components/Field";
import { StatusChip } from "@/components/StatusChip";

/**
 * Internal review surface for the design system (SOP Phase 1). Not linked
 * from the site, not in the sitemap (ALL_ROUTES does not list it), and
 * noindex so it never appears in results.
 */
export const metadata = pageMetadata({
  title: "Style guide",
  description: "Internal review page for the PM Travel design tokens and components.",
  path: "/styleguide",
  noindex: true,
});

const COLOURS = [
  { token: "red-900", swatch: "bg-red-900", use: "Footer, dark sections, nav on scroll", pair: "paper on it 12.06:1" },
  { token: "red-600", swatch: "bg-red-600", use: "Things you can click", pair: "paper on it 5.84:1" },
  { token: "red-050", swatch: "bg-red-050", use: "Table headers, quiet backgrounds", pair: "ink-900 on it 15.80:1" },
  { token: "ink-900", swatch: "bg-ink-900", use: "Body text and headings", pair: "on paper 18.01:1" },
  { token: "ink-500", swatch: "bg-ink-500", use: "Secondary text, captions", pair: "on paper 5.69:1" },
  { token: "paper", swatch: "bg-paper", use: "Default surface", pair: "base" },
  { token: "paper-2", swatch: "bg-paper-2", use: "Alternating section surface", pair: "ink-500 on it 5.10:1" },
  { token: "status-verified", swatch: "bg-status-verified", use: "Verified status mark", pair: "on paper 6.02:1" },
  { token: "status-progress", swatch: "bg-status-progress", use: "In-progress status mark", pair: "on paper 5.43:1" },
];

const TYPE = [
  { token: "4xl", size: "4.5rem", className: "text-4xl font-display font-bold tracking-tight" },
  { token: "3xl", size: "3.25rem", className: "text-3xl font-display font-bold tracking-tight" },
  { token: "2xl", size: "2.25rem", className: "text-2xl font-display font-semibold" },
  { token: "xl", size: "1.625rem", className: "text-xl font-display font-semibold" },
  { token: "lg", size: "1.25rem", className: "text-lg" },
  { token: "base", size: "1rem", className: "text-base" },
  { token: "sm", size: "0.9375rem", className: "text-sm" },
  { token: "xs", size: "0.8125rem", className: "text-xs" },
];

function Section({ title, children, deep = false }: { title: string; children: React.ReactNode; deep?: boolean }) {
  return (
    <section className={deep ? "surface-deep bg-red-900 text-paper" : "border-t border-rule"}>
      <Container className="py-16">
        <h2 className={`text-xl font-semibold ${deep ? "text-paper" : "text-ink-900"}`}>{title}</h2>
        <div className="mt-8">{children}</div>
      </Container>
    </section>
  );
}

export default function StyleguidePage() {
  const errorIds = fieldIds("sg-error", {
    hint: "The name your clients know you by.",
    error: "Enter your company name so we can match the request to your account.",
  });

  return (
    <>
      <Container as="section" className="py-16">
        <h1 className="text-3xl font-bold tracking-tight text-ink-900">Style guide</h1>
        <p className="measure mt-6 text-lg text-ink-500">
          Every token and component in one place, for review before pages are
          built on them. Internal only: noindex and not in the sitemap.
        </p>
      </Container>

      <Section title="Colour">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COLOURS.map((colour) => (
            <li key={colour.token} className="overflow-hidden rounded-card border border-rule">
              <div className={`h-16 ${colour.swatch}`} />
              <div className="p-4">
                <p className="text-sm font-medium text-ink-900">{colour.token}</p>
                <p className="text-xs text-ink-500">{colour.use}</p>
                <p className="tabular mt-1 text-xs text-ink-500">{colour.pair}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Type">
        <ul className="flex flex-col gap-6">
          {TYPE.map((step) => (
            <li key={step.token} className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-8">
              <span className="tabular w-32 shrink-0 text-xs text-ink-500">
                {step.token}, {step.size}
              </span>
              <span className={`text-ink-900 ${step.className}`}>Ground operations</span>
            </li>
          ))}
        </ul>
        <p className="measure mt-10 text-base text-ink-900">
          Body copy is IBM Plex Sans at 1rem with a 1.6 line height, held under
          72 characters. Headings are Archivo. Operational figures use tabular,
          lining numerals: <span className="tabular">0123456789</span>. No sample
          distance or drive time appears here, because none may be invented,
          even in a mockup.
        </p>
        <div className="mt-6">
          <Evidence note="Evidence notes keep the Newsreader italic, the one signal that a statement is sourced and verified." />
        </div>
      </Section>

      <Section title="Buttons">
        <div className="flex flex-wrap items-center gap-4">
          <ButtonLink href="/request-a-quote">Request a quote</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact the operations desk
          </ButtonLink>
          <ButtonLink href="/how-we-work" variant="ghost">
            How we work
          </ButtonLink>
          <Button disabled>Disabled</Button>
        </div>
      </Section>

      <Section title="Buttons on a dark section" deep>
        <div className="flex flex-wrap items-center gap-4">
          <ButtonLink href="/request-a-quote" tone="dark">
            Request a quote
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary" tone="dark">
            Contact the operations desk
          </ButtonLink>
          <ButtonLink href="/how-we-work" variant="ghost" tone="dark">
            How we work
          </ButtonLink>
        </div>
      </Section>

      <Section title="Cards">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card variant="service" title="Airport operations" href="/morocco-dmc">
            Service variant. Hover changes the border to red-600 and nothing else.
          </Card>
          <Card variant="destination" eyebrow="High Atlas" title="Atlas" href="/destinations/atlas">
            Destination variant, with a plain-text region label.
          </Card>
          <Card variant="capability" title="German-language operation" aside={<StatusChip status="unverified" />}>
            Capability variant, with its status on the right.
          </Card>
        </div>
      </Section>

      <Section title="Status">
        <div className="flex flex-wrap gap-8">
          <StatusChip status="verified" />
          <StatusChip status="pending" />
          <StatusChip status="unverified" />
          <StatusChip status="future" />
        </div>
      </Section>

      <Section title="Status on a dark section" deep>
        <div className="flex flex-wrap gap-8">
          <StatusChip status="verified" onDark />
          <StatusChip status="pending" onDark />
          <StatusChip status="unverified" onDark />
          <StatusChip status="future" onDark />
        </div>
      </Section>

      <Section title="Form fields">
        <div className="grid max-w-3xl gap-8 sm:grid-cols-2">
          <Field id="sg-default" label="Company" required>
            <Input id="sg-default" name="sg-default" autoComplete="organization" />
          </Field>
          <Field
            id="sg-error"
            label="Company"
            required
            hint="The name your clients know you by."
            error="Enter your company name so we can match the request to your account."
          >
            <Input id="sg-error" name="sg-error" invalid describedBy={errorIds.describedBy} />
          </Field>
          <Field id="sg-select" label="Traveller type">
            <Select id="sg-select" name="sg-select" defaultValue="group">
              <option value="group">Group</option>
              <option value="fit">FIT</option>
            </Select>
          </Field>
          <Field id="sg-disabled" label="Reference">
            <Input id="sg-disabled" name="sg-disabled" disabled defaultValue="Assigned after submission" />
          </Field>
          <div className="sm:col-span-2">
            <Field id="sg-brief" label="Brief">
              <Textarea id="sg-brief" name="sg-brief" />
            </Field>
          </div>
        </div>
      </Section>

      <Section title="Radius and elevation">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-control border border-rule p-6 text-sm text-ink-500">
            Control radius, 4px: buttons and inputs.
          </div>
          <div className="rounded-card border border-rule p-6 text-sm text-ink-500">
            Card radius, 8px, static: hairline border, no shadow.
          </div>
          <div className="rounded-card bg-paper p-6 text-sm text-ink-500 shadow-overlay">
            Overlay shadow: dropdown panels and the sticky bar only.
          </div>
        </div>
      </Section>
    </>
  );
}
