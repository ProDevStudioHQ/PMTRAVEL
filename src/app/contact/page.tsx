import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ExternalLink, Globe, Mail, MapPin, type LucideIcon } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { Evidence } from "@/components/Evidence";
import { FaqSection } from "@/components/FaqSection";
import { CtaBanner, PILL, SectionHeading } from "@/components/Modern";
import { Section } from "@/components/Section";
import { TextLink } from "@/components/TextLink";
import { DestinationHero } from "@/features/destinations/DestinationPage";
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

/** A standalone link, so it gets the full 44px tap target rather than its line height. */
const EMAIL_LINK =
  "inline-flex min-h-11 items-center wrap-anywhere text-red-600 underline-offset-4 transition-colors duration-200 hover:text-red-900 hover:underline";

/** One contact channel card: an icon beside its own label, so the icon is decorative. */
function Channel({
  icon: Icon,
  label,
  featured = false,
  children,
}: {
  icon: LucideIcon;
  label: string;
  featured?: boolean;
  children: ReactNode;
}) {
  return (
    <li
      className={`flex flex-col rounded-3xl border p-7 ${
        featured ? "border-red-600 bg-paper shadow-raised" : "border-rule bg-paper"
      }`}
    >
      <span
        aria-hidden="true"
        className={`flex size-12 items-center justify-center rounded-xl ${
          featured ? "bg-red-600 text-paper" : "bg-red-050 text-red-600"
        }`}
      >
        <Icon size={22} strokeWidth={1.75} />
      </span>
      <h2 className="mt-5 text-sm font-semibold text-ink-500">{label}</h2>
      {children}
    </li>
  );
}

export default function ContactPage() {
  return (
    <>
      <DestinationHero
        title="Reach the operations desk"
        standfirst="Email reaches the operations desk in Marrakech directly. Trade enquiries go to the B2B address so they enter the quote workflow rather than a general inbox."
        imageKey="b2-marrakech-medersa"
        kicker={`${COMPANY.address.district}, ${COMPANY.address.city}`}
        trail={[{ href: "/contact", label: "Contact" }]}
      >
        <a href={`mailto:${COMPANY.email.b2b}`} className={PILL.onDarkSolid}>
          <Mail aria-hidden="true" size={16} strokeWidth={2} />
          Email the trade desk
        </a>
        <Link href={RFQ_HREF} className={PILL.onDarkOutline}>
          Request a B2B quote
        </Link>
      </DestinationHero>

      {/*
        SOP Phase 7 also asks for a short contact form. Omitted: the only
        storage path for enquiries is the RFQ record, and a general message form
        would either rely on email alone - lost whenever SMTP is unconfigured -
        or need a new table and server action. See decisions.md D6.
      */}
      <Section tone="paper-2">
        <ul className="grid gap-4 md:grid-cols-2">
          <Channel icon={Mail} label="Travel trade" featured>
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
              className="mt-3 inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-ink-900/20 px-5 text-sm font-semibold text-ink-900 transition-colors duration-200 hover:border-ink-900"
            >
              Open the address in maps
              <ExternalLink aria-hidden="true" size={16} strokeWidth={1.75} />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </Channel>

          <Channel icon={Globe} label="Working languages">
            <ul className="mt-3 flex flex-wrap gap-2">
              {COMPANY.languages.map((language) => (
                <li key={language} className="rounded-full bg-paper-2 px-3 py-1 text-sm font-medium text-ink-900">
                  {language}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-base text-ink-500">
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
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-16">
          <div className="self-start lg:sticky lg:top-24">
            <SectionHeading eyebrow="Your first email" title="What to put in the first email">
              <p>
                Six lines are enough to get a useful answer back. Nothing below is
                mandatory, but each one you include removes a round trip.
              </p>
            </SectionHeading>
            <p className="measure mt-6 text-base text-ink-500">
              Attaching an existing itinerary, even a rough one, is usually faster
              than describing it. If you would rather work through a form, the{" "}
              <TextLink href={RFQ_HREF}>quote request</TextLink> asks the same questions
              in order.
            </p>
          </div>
          <ol className="grid gap-3 sm:grid-cols-2">
            {BRIEF_CHECKLIST.map((item, index) => (
              <li key={item} className="flex gap-4 rounded-2xl border border-rule bg-paper-2 p-5 text-base text-ink-900">
                <span
                  aria-hidden="true"
                  className="tabular flex size-9 shrink-0 items-center justify-center rounded-full bg-red-600 font-display text-sm font-bold text-paper"
                >
                  {index + 1}
                </span>
                {item}
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* The page's one deep section: what is deliberately not published. */}
      <Section tone="deep">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-16">
          <SectionHeading eyebrow="Stated, not hidden" title="What we will not tell you here" onDark />
          <ul className="grid gap-3">
            <li className="rounded-2xl border border-paper/15 bg-paper/[0.06] p-6">
              <Evidence
                onDark
                note="No telephone number is published because ours has not been confirmed internally. It will appear here, and nowhere before here, once it has."
              />
            </li>
            <li className="rounded-2xl border border-paper/15 bg-paper/[0.06] p-6">
              <Evidence
                onDark
                note="No response-time promise is published because we have not yet measured our own. The measurement is running; the number will follow."
              />
            </li>
          </ul>
        </div>
      </Section>

      <FaqSection heading="Before you write" faqs={FAQS} tone="paper-2" />

      <Section>
        <CtaBanner
          title="Or send the requirement straight through"
          imageKey="b1-marrakech-hero"
          primary={{ href: RFQ_HREF, label: "Request a B2B quote" }}
          secondary={{ href: `mailto:${COMPANY.email.b2b}`, label: COMPANY.email.b2b }}
        >
          <p>
            Browse ready-to-sell <TextLink href="/programmes" onDark>B2B programmes</TextLink> and{" "}
            <TextLink href="/excursions" onDark>excursions</TextLink>, or send your own brief.
          </p>
        </CtaBanner>
        <p className="mt-6 flex items-center gap-2 text-sm text-ink-500">
          <ArrowRight aria-hidden="true" size={14} />
          Both routes enter the same workflow and are logged the same way.
        </p>
      </Section>
    </>
  );
}
