import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageIntro } from "@/components/PageIntro";
import { ButtonLink } from "@/components/Button";
import { Evidence } from "@/components/Evidence";
import { FaqSection } from "@/components/FaqSection";
import { COMPANY, RFQ_HREF } from "@/lib/nav";

export const metadata = pageMetadata({
  title: "Contact the Operations Desk",
  description:
    "Reach PM Travel Agency's operations desk in Gueliz, Marrakech, by email. Trade enquiries go straight into the quote workflow.",
  path: "/contact",
});

const BRIEF_CHECKLIST = [
  "Your company and the country you sell from",
  "Travel dates, or the word flexible",
  "Destinations, or the outline itinerary if you have one",
  "Number of travellers, and whether it is a group or FIT",
  "Programme type: leisure, group, incentive, event, educational",
  "What the programme has to achieve, in your own words",
];

const FAQS = [
  {
    question: "How do I send PM Travel a requirement?",
    answer:
      "Email the trade address, or use the request form once it is live. Either route enters the same workflow and is logged the same way, so nothing is lost by writing a plain email.",
  },
  {
    question: "What information do you need to quote?",
    answer:
      "Company, dates, destinations, traveller numbers and what the programme has to achieve are enough to start. Rooming detail, hotel category, guide language, meals and budget help, but waiting until you have all of them costs you more time than sending the outline now.",
  },
  {
    question: "Do you have a telephone number?",
    answer:
      "Not a published one yet. Two different numbers were supplied to us internally and one of them has the wrong number of digits for a Moroccan mobile, so we are not putting either on the website until it is confirmed. Publishing a number that does not connect would be worse than publishing none.",
  },
  {
    question: "How quickly will you respond?",
    answer:
      "We are not going to quote you a figure we have not measured. Response times are being recorded from the first request onwards, and once there is enough real data we will publish the median with the period it covers. Until then, treat any operator's stated response time, including one we might have invented, as marketing.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Reach the operations desk"
        standfirst="Email reaches the operations desk in Marrakech directly. Trade enquiries go to the B2B address so they enter the quote workflow rather than a general inbox."
      />

      <Container as="section" className="py-16 lg:py-24">
        <dl className="grid gap-10 sm:grid-cols-2">
          <div>
            <dt className="text-2xs font-medium uppercase tracking-[0.12em] text-meta">
              Travel trade
            </dt>
            <dd className="mt-3 text-lg">
              <a
                className="text-petrol underline"
                href={`mailto:${COMPANY.email.b2b}`}
              >
                {COMPANY.email.b2b}
              </a>
            </dd>
            <p className="mt-2 text-xs text-meta">
              Quotes, requirements, itineraries and operational questions.
            </p>
          </div>

          <div>
            <dt className="text-2xs font-medium uppercase tracking-[0.12em] text-meta">
              General enquiries
            </dt>
            <dd className="mt-3 text-lg">
              <a
                className="text-petrol underline"
                href={`mailto:${COMPANY.email.general}`}
              >
                {COMPANY.email.general}
              </a>
            </dd>
            <p className="mt-2 text-xs text-meta">
              Everything that is not a trade requirement.
            </p>
          </div>

          <div>
            <dt className="text-2xs font-medium uppercase tracking-[0.12em] text-meta">
              Office
            </dt>
            <dd className="mt-3 text-sm text-ink">
              <address className="not-italic leading-relaxed">
                {COMPANY.address.line1}
                <br />
                {COMPANY.address.district}
                <br />
                {COMPANY.address.city} {COMPANY.address.postalCode}
                <br />
                {COMPANY.address.country}
              </address>
            </dd>
          </div>

          <div>
            <dt className="text-2xs font-medium uppercase tracking-[0.12em] text-meta">
              Working languages
            </dt>
            <dd className="mt-3 text-sm text-ink">
              {COMPANY.languages.join(" · ")}
            </dd>
            <p className="mt-2 text-xs text-meta">
              German is not among them. We would rather tell you that here than
              at the airport.
            </p>
          </div>
        </dl>
      </Container>

      <Container as="section" className="border-t border-line-soft py-16 lg:py-24">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          What to put in the first email
        </h2>
        <p className="measure mt-4 text-base text-meta">
          Six lines are enough to get a useful answer back. Nothing below is
          mandatory, but each one you include removes a round trip.
        </p>
        <ul className="measure mt-8 flex flex-col gap-3">
          {BRIEF_CHECKLIST.map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-[var(--radius-data)] border border-line-soft px-4 py-3 text-sm text-ink"
            >
              <span aria-hidden="true" className="text-meta">
                &mdash;
              </span>
              {item}
            </li>
          ))}
        </ul>
        <p className="measure mt-6 text-sm text-meta">
          Attaching an existing itinerary, even a rough one, is usually faster
          than describing it. If you would rather work through a form, the{" "}
          <Link href={RFQ_HREF} className="text-petrol underline">
            quote request
          </Link>{" "}
          asks the same questions in order.
        </p>
      </Container>

      <Container as="section" className="border-t border-line-soft py-16 lg:py-24">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          What we will not tell you here
        </h2>
        <div className="measure mt-8 flex flex-col gap-4 rounded-[var(--radius-data)] border border-line-soft p-6">
          <Evidence note="No telephone number is published because ours has not been confirmed internally. It will appear here, and nowhere before here, once it has." />
          <Evidence note="No response-time promise is published because we have not yet measured our own. The measurement is running; the number will follow." />
        </div>
      </Container>

      <FaqSection heading="Before you write" faqs={FAQS} />

      <Container as="section" className="py-16 lg:py-24">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          Or send the requirement straight through
        </h2>
        <div className="mt-8 flex flex-wrap gap-4">
          <ButtonLink href={`mailto:${COMPANY.email.b2b}`} variant="accent">
            {COMPANY.email.b2b}
          </ButtonLink>
          <ButtonLink href={RFQ_HREF} variant="secondary">
            Request a B2B quote
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
