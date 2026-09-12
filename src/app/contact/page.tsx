import { pageMetadata } from "@/lib/metadata";
import type { ReactNode } from "react";
import { ExternalLink, Globe, Mail, MapPin, type LucideIcon } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { ButtonLink } from "@/components/Button";
import { Evidence } from "@/components/Evidence";
import { FaqSection } from "@/components/FaqSection";
import { Section, SectionIntro } from "@/components/Section";
import { TextLink } from "@/components/TextLink";
import { COMPANY, RFQ_HREF, addressOneLine } from "@/lib/nav";

export const metadata = pageMetadata({
  title: "Contact the Operations Desk",
  description:
    "Reach PM Travel Agency's operations desk in Gueliz, Marrakech, by email. Trade enquiries go straight into the quote workflow.",
  path: "/contact",
});

/**
 * A link out, not an embedded map: an embed would open frame-src in the CSP and
 * add a third-party request to a page that makes none (decisions.md D4).
 */
const MAPS_HREF = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressOneLine)}`;

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

const EMAIL_LINK =
  "wrap-anywhere text-red-600 underline underline-offset-4 transition-colors duration-200 hover:text-red-900";

/** One contact channel: an icon beside its own label, so the icon is decorative. */
function Channel({ icon: Icon, label, children }: { icon: LucideIcon; label: string; children: ReactNode }) {
  return (
    <li className="flex gap-4 border-b border-rule py-8">
      <Icon aria-hidden="true" size={20} strokeWidth={1.5} className="mt-1 shrink-0 text-ink-500" />
      <div className="min-w-0">
        <h2 className="text-sm font-medium text-ink-500">{label}</h2>
        {children}
      </div>
    </li>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageIntro
        title="Reach the operations desk"
        standfirst="Email reaches the operations desk in Marrakech directly. Trade enquiries go to the B2B address so they enter the quote workflow rather than a general inbox."
      />

      {/*
        SOP Phase 7 also asks for a short contact form. Omitted: the only
        storage path for enquiries is the RFQ record, and a general message form
        would either rely on email alone - lost whenever SMTP is unconfigured -
        or need a new table and server action. See decisions.md D6.
      */}
      <Section tone="paper-2">
        <ul className="grid border-t border-rule sm:grid-cols-2 sm:gap-x-12">
          <Channel icon={Mail} label="Travel trade">
            <p className="mt-2 font-display text-xl font-semibold">
              <a className={EMAIL_LINK} href={`mailto:${COMPANY.email.b2b}`}>
                {COMPANY.email.b2b}
              </a>
            </p>
            <p className="mt-2 text-base text-ink-500">
              Quotes, requirements, itineraries and operational questions.
            </p>
          </Channel>

          <Channel icon={Mail} label="General enquiries">
            <p className="mt-2 font-display text-xl font-semibold">
              <a className={EMAIL_LINK} href={`mailto:${COMPANY.email.general}`}>
                {COMPANY.email.general}
              </a>
            </p>
            <p className="mt-2 text-base text-ink-500">Everything that is not a trade requirement.</p>
          </Channel>

          <Channel icon={MapPin} label="Office">
            <address className="mt-2 text-base not-italic text-ink-900">
              {COMPANY.address.line1}
              <br />
              {COMPANY.address.district}, {COMPANY.address.city} {COMPANY.address.postalCode}
              <br />
              {COMPANY.address.country}
            </address>
            <p className="mt-2 text-base text-ink-500">
              Local time is Morocco time: GMT+1, and GMT+0 during Ramadan.
            </p>
            {/* CONTENT NEEDED: operating hours (lucide Clock). Not confirmed; nothing renders. */}
            <a
              href={MAPS_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-11 items-center gap-2 text-base text-red-600 underline underline-offset-4 transition-colors duration-200 hover:text-red-900"
            >
              Open the address in maps
              <ExternalLink aria-hidden="true" size={16} strokeWidth={1.5} />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </Channel>

          <Channel icon={Globe} label="Working languages">
            <p className="mt-2 text-base text-ink-900">{COMPANY.languages.join(", ")}</p>
            <p className="mt-2 text-base text-ink-500">
              German is not among them. We would rather tell you that here than at
              the airport.
            </p>
          </Channel>
          {/* CONTENT NEEDED: telephone (lucide Phone) and WhatsApp (lucide MessageCircle).
              Two conflicting numbers were supplied; nothing renders until one is
              confirmed. See docs/START.md "Blockers" and decisions.md D4. */}
        </ul>
      </Section>

      <Section>
        <SectionIntro title="What to put in the first email">
          <p>
            Six lines are enough to get a useful answer back. Nothing below is
            mandatory, but each one you include removes a round trip.
          </p>
        </SectionIntro>
        <ul className="measure mt-8 border-t border-rule">
          {BRIEF_CHECKLIST.map((item) => (
            <li key={item} className="flex gap-4 border-b border-rule py-4 text-base text-ink-900">
              <span aria-hidden="true" className="text-ink-500">
                &mdash;
              </span>
              {item}
            </li>
          ))}
        </ul>
        <p className="measure mt-6 text-base text-ink-500">
          Attaching an existing itinerary, even a rough one, is usually faster
          than describing it. If you would rather work through a form, the{" "}
          <TextLink href={RFQ_HREF}>quote request</TextLink> asks the same questions
          in order.
        </p>
      </Section>

      {/* The page's one deep section: what is deliberately not published. */}
      <Section tone="deep">
        <SectionIntro title="What we will not tell you here" onDark />
        <ul className="measure mt-8 border-t border-paper/15">
          <li className="border-b border-paper/15 py-5">
            <Evidence
              onDark
              note="No telephone number is published because ours has not been confirmed internally. It will appear here, and nowhere before here, once it has."
            />
          </li>
          <li className="border-b border-paper/15 py-5">
            <Evidence
              onDark
              note="No response-time promise is published because we have not yet measured our own. The measurement is running; the number will follow."
            />
          </li>
        </ul>
      </Section>

      <FaqSection heading="Before you write" faqs={FAQS} tone="paper-2" />

      <Section>
        <SectionIntro title="Or send the requirement straight through" />
        <div className="mt-8 flex flex-wrap gap-4">
          <ButtonLink href={`mailto:${COMPANY.email.b2b}`} className="wrap-anywhere">
            {COMPANY.email.b2b}
          </ButtonLink>
          <ButtonLink href={RFQ_HREF} variant="secondary">
            Request a B2B quote
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
