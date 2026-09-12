import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageIntro } from "@/components/PageIntro";
import { ButtonLink } from "@/components/Button";
import { Card } from "@/components/Card";
import { Evidence } from "@/components/Evidence";
import { FaqSection } from "@/components/FaqSection";
import { ImageCredits } from "@/features/images/ImageCredits";
import { COMPANY, RFQ_HREF } from "@/lib/nav";

export const metadata: Metadata = {
  title: "About Our Morocco Operation",
  description:
    "A Morocco ground-operations company in Gueliz, Marrakech, working for tour operators, agencies and destination specialists.",
  alternates: { canonical: "/about" },
};

const FACTS = [
  {
    title: "Where we are",
    body: "Gueliz, Marrakech. Operations are run from that office, not remotely and not through a third party.",
  },
  {
    title: "Who we work for",
    body: "Tour operators, international agencies, Morocco specialists needing overflow capacity, group operators and FIT specialists.",
  },
  {
    title: "Languages we operate in",
    body: `${COMPANY.languages.join(", ")}. We do not currently operate in German, and we say so rather than take the booking.`,
  },
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
      <PageIntro
        eyebrow="About"
        title="A Morocco ground operator, built for the trade"
        standfirst="PM Travel Agency runs ground programmes in Morocco on behalf of the companies that sell them. We are based in Gueliz, Marrakech, and we operate from there."
      />

      <Container as="section" className="py-16 lg:py-24">
        <div className="measure flex flex-col gap-6 text-base text-meta">
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
            company operates as{" "}
            <span className="text-ink">{COMPANY.brandLine}</span>.
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
            <Link href="/how-we-work" className="text-petrol underline">
              verification standard
            </Link>{" "}
            we hold ourselves to. An operational figure is published only with a
            source, a method, a date and a named verifier. A supplier&rsquo;s own
            website is never treated as proof. If a camp&rsquo;s site says it has
            fifty-two tents, that is a claim we record as unconfirmed until
            someone from PM Travel has been there and counted. The same applies
            to every distance and drive time on our{" "}
            <Link href="/routes" className="text-petrol underline">
              route intelligence
            </Link>{" "}
            page: a route publishes figures only after one of our drivers has
            driven it and logged it.
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
        </div>
      </Container>

      <Container as="section" className="border-t border-line-soft py-16 lg:py-24">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          The essentials
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FACTS.map((fact) => (
            <Card key={fact.title} title={fact.title}>
              {fact.body}
            </Card>
          ))}
        </div>
      </Container>

      <Container as="section" className="border-t border-line-soft py-16 lg:py-24">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          What is not on this page yet
        </h2>
        <p className="measure mt-4 text-sm text-meta">
          Listing these is deliberate. A buyer checking us out will look for
          them, and we would rather say where they are than leave a gap.
        </p>
        <div className="measure mt-8 flex flex-col gap-4 rounded-[var(--radius-data)] border border-line-soft p-6">
          <Evidence note="Registered entity name, tourism licence and tax identifiers are being confirmed with our accountant and will be published here in full, not selectively." />
          <Evidence note="Photographs of the office, the vehicles and live operations are being taken. No stock photography and no generated imagery will be used on this site, and no generated person will ever be presented as a member of staff." />
          <Evidence note="Named team members appear here only once a real person has agreed to be named." />
        </div>
      </Container>

      <ImageCredits />

      <FaqSection heading="Questions we get asked first" faqs={FAQS} />

      <Container as="section" className="py-16 lg:py-24">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          Send us something to operate
        </h2>
        <p className="measure mt-4 text-base text-meta">
          The fastest way to find out whether we are useful to you is to send a
          real requirement and see what comes back.
        </p>
        <div className="mt-8">
          <ButtonLink href={RFQ_HREF} variant="accent">
            Request a B2B quote
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
