import Link from "next/link";
import { ArrowRight, Clock, Handshake, Languages, MapPin, Quote } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { Evidence } from "@/components/Evidence";
import { FaqSection } from "@/components/FaqSection";
import { CtaBanner, IconCards, PILL, ProseCard, SectionHeading, type IconItem } from "@/components/Modern";
import { Section } from "@/components/Section";
import { TextLink } from "@/components/TextLink";
import { DestinationHero } from "@/features/destinations/DestinationPage";
import { ImageCredits } from "@/features/images/ImageCredits";
import { COMPANY, RFQ_HREF } from "@/lib/nav";

export const metadata = pageMetadata({
  title: "About Our Morocco Operation",
  description:
    "A Morocco ground-operations company in Gueliz, Marrakech, working for tour operators, agencies and destination specialists.",
  path: "/about",
});

const FACTS: IconItem[] = [
  {
    icon: MapPin,
    title: "Where we are",
    body: "Gueliz, Marrakech. Operations are run from that office, not remotely and not through a third party.",
  },
  {
    icon: Handshake,
    title: "Who we work for",
    body: "Tour operators, international agencies, Morocco specialists needing overflow capacity, group operators and FIT specialists.",
  },
  {
    icon: Languages,
    title: "Languages we operate in",
    body: `${COMPANY.languages.join(", ")}. We do not currently operate in German, and we say so rather than take the booking.`,
  },
];

/**
 * What is deliberately absent, stated rather than left as a gap. None of these
 * renders a placeholder value (decisions.md D4).
 */
const NOT_YET = [
  "Registered entity name, tourism licence and tax identifiers are being confirmed with our accountant and will be published here in full, not selectively.",
  "Photographs of the office, the vehicles and live operations are being taken. No stock photography and no generated imagery will be used on this site, and no generated person will ever be presented as a member of staff.",
  "Named team members appear here only once a real person has agreed to be named.",
];

const FAQS = [
  {
    question: "What kind of company is PM Travel Agency?",
    answer:
      "PM Travel Agency is a Morocco ground-operations company working business to business. We do not sell to travellers. Our clients are the tour operators, agencies and destination specialists who do, and who need someone in Morocco to run what they have sold.",
  },
  {
    question: "Where is PM Travel Agency based?",
    answer:
      "Our office is in Gueliz, Marrakech. Marrakech is the practical base for the routes most international programmes use, and being there is what makes it possible to inspect a venue or re-drive a route when a figure needs checking.",
  },
  {
    question: "Can PM Travel operate under our brand?",
    answer:
      "Yes. We operate white-label, and our drivers and guides are briefed accordingly. The client relationship stays with you, including at the points where ground operators are most often tempted to introduce themselves.",
  },
  {
    question: "Why does this site show so few numbers?",
    answer:
      "Because we only publish figures we have measured ourselves. Drive times, capacities and response times all appear here with a date and a method or they do not appear at all. The blank spaces are the honest state of a company that started measuring recently, and they will fill in as the fieldwork is done.",
  },
];

export default function AboutPage() {
  return (
    <>
      <DestinationHero
        title="A Morocco ground operator, built for the trade"
        standfirst="PM Travel Agency runs ground programmes in Morocco on behalf of the companies that sell them. We are based in Gueliz, Marrakech, and we operate from there."
        imageKey="b2-marrakech-medersa"
        kicker={COMPANY.brandLine}
        trail={[{ href: "/about", label: "About" }]}
        stats={[
          { value: "B2B", label: "Trade only" },
          { value: COMPANY.address.district, label: `${COMPANY.address.city} office` },
          { value: String(COMPANY.languages.length), label: "Working languages" },
        ]}
      >
        <Link href={RFQ_HREF} className={PILL.onDarkSolid}>
          Request a B2B quote
          <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
        </Link>
        <Link href="/how-we-work" className={PILL.onDarkOutline}>
          How we work
        </Link>
      </DestinationHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-16">
          <div className="flex flex-col gap-8 self-start lg:sticky lg:top-24">
            <SectionHeading eyebrow="Why we exist" title="Most of what goes wrong, goes wrong on the ground" />
            <figure className="surface-deep rounded-3xl bg-red-900 p-7 text-paper">
              <Quote aria-hidden="true" size={28} strokeWidth={1.75} className="text-paper/60" />
              <blockquote className="mt-4 font-display text-xl leading-snug font-semibold text-paper">
                We would rather be the company that publishes its drive times,
                states how they were measured, and tells you what the backup plan
                is when the first plan fails.
              </blockquote>
            </figure>
          </div>

          <ProseCard>
            <p>
              Most of what goes wrong on a Morocco programme goes wrong on the
              ground, and it goes wrong in ways the selling agency cannot see from
              another country. A transfer leaves late and the rest of the day
              compresses. A drive time taken from a mapping service turns out not
              to include the pass, the roadworks or the stop the group actually
              needs. A venue turns out to hold fewer people in the layout the
              client asked for than in the layout the supplier advertised. None of
              those are exotic failures. They are the ordinary ones, and they are
              what a ground partner is for.
            </p>
            <p>
              PM Travel Agency exists to absorb that. We handle the vehicles, the
              drivers, the arrivals, the hotels, the guides and the decisions that
              have to be made at eleven at night when something has changed. The
              company operates as <span className="font-medium">{COMPANY.brandLine}</span>.
            </p>
            <p>
              What we are trying to be different at is narrow and deliberate.
              Every Morocco operator will tell you they are authentic, tailor-made
              and available around the clock, and those claims are now worth
              nothing because everyone makes them. We would rather be the company
              that publishes its drive times, states how they were measured, and
              tells you what the backup plan is when the first plan fails. That is
              a slower way to build a website. It is a much faster way to be
              trusted with someone else&rsquo;s clients.
            </p>
            <p>
              The practical form of that commitment is the{" "}
              <TextLink href="/how-we-work">verification standard</TextLink> we hold
              ourselves to. An operational figure is published only with a source, a
              method, a date and a named verifier. A supplier&rsquo;s own website is
              never treated as proof. If a camp&rsquo;s site says it has fifty-two
              tents, that is a claim we record as unconfirmed until someone from PM
              Travel has been there and counted. The same applies to every distance
              and drive time on our{" "}
              <TextLink href="/routes">route intelligence</TextLink> page: a route
              publishes figures only after one of our drivers has driven it and
              logged it.
            </p>
            <p>
              We are a young operation and the site reflects that honestly. There
              are no statistics here, because we have not measured any yet. There
              are no testimonials, because we will not publish a client&rsquo;s
              words without written permission. There is no list of awards. What
              there is, and what will keep growing, is verified operational
              detail, because that is the only thing in this industry that a
              competitor cannot copy off a page in an afternoon.
            </p>
          </ProseCard>
        </div>
      </Section>

      <Section tone="paper-2">
        <SectionHeading eyebrow="The essentials" title="Who we are, in three facts" />
        <div className="mt-12">
          <IconCards items={FACTS} columns={3} />
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-16">
          <SectionHeading eyebrow="Stated, not hidden" title="What is not on this page yet">
            <p>
              Listing these is deliberate. A buyer checking us out will look for
              them, and we would rather say where they are than leave a gap.
            </p>
          </SectionHeading>
          <ul className="flex flex-col gap-3">
            {NOT_YET.map((note) => (
              <li key={note} className="flex gap-4 rounded-2xl border border-rule bg-paper-2 p-5">
                <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-paper text-ink-500">
                  <Clock size={18} strokeWidth={1.75} />
                </span>
                <Evidence note={note} />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <ImageCredits tone="paper-2" />

      <FaqSection heading="Questions we get asked first" faqs={FAQS} />

      <Section tone="paper-2">
        <CtaBanner
          title="Send us something to operate"
          imageKey="b2-marrakech-medersa"
          primary={{ href: RFQ_HREF, label: "Request a B2B quote" }}
          secondary={{ href: "/contact", label: "Contact the office" }}
        >
          <p>
            The fastest way to find out whether we are useful to you is to send a
            real requirement and see what comes back.
          </p>
        </CtaBanner>
      </Section>
    </>
  );
}
