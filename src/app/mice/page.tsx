import Link from "next/link";
import {
  ArrowRight,
  Bus,
  ChefHat,
  Eye,
  Headset,
  Lock,
  MapPinned,
  Send,
  ShieldCheck,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { Evidence } from "@/components/Evidence";
import { FaqSection } from "@/components/FaqSection";
import { CtaBanner, IconCards, PILL, ProseCard, SectionHeading, type IconItem } from "@/components/Modern";
import { Section } from "@/components/Section";
import { TextLink } from "@/components/TextLink";
import { DestinationHero } from "@/features/destinations/DestinationPage";
import { VenueDisclosure } from "@/features/venues/VenueDisclosure";
import { VENUES } from "@/features/venues/data";
import { toPublicVenue } from "@/features/venues/disclosure";
import { RFQ_HREF } from "@/lib/nav";

export const metadata = pageMetadata({
  title: "Morocco MICE and Events Operations",
  description:
    "Meetings, incentives and events in Morocco, planned on venue data PM Travel has measured on site rather than copied from suppliers.",
  path: "/mice",
});

const HANDLED: IconItem[] = [
  {
    icon: MapPinned,
    title: "Venue sourcing",
    body: "Matched against what we have inspected, with the gaps named rather than filled in.",
  },
  {
    icon: Bus,
    title: "Arrival and transfer logistics",
    body: "Manifests, coach movements and timings built against measured drive data where we have it.",
  },
  {
    icon: UtensilsCrossed,
    title: "Gala and dining",
    body: "Timing, dietary handling and service flow against the rest of the programme.",
  },
  {
    icon: Users,
    title: "Group movement",
    body: "Coach access, turning space, parking and marshalling.",
  },
  {
    icon: Headset,
    title: "On-site coordination",
    body: "Our people on the ground for the duration, not a phone number.",
  },
  {
    icon: ShieldCheck,
    title: "Backup planning",
    body: "A stated fallback for the venue, the weather and the vehicles.",
  },
];

/** Three levels in increasing order of access: a genuine sequence, so it is numbered. */
const DISCLOSURE = [
  {
    icon: Eye,
    title: "Published here",
    body: "Venue type, destination, access, coach considerations, parking, indoor or outdoor, weather risk, the wet-weather plan, transfer logistics, seasonality, and capacity as a band with the inspection date.",
  },
  {
    icon: Send,
    title: "Shared with you directly",
    body: "The named venue, exact capacity by layout, floor plans, AV detail, breakout rooms, operational notes and the backup venue. Sent when you have a live brief.",
  },
  {
    icon: Lock,
    title: "Kept internal",
    body: "Rates, terms, release periods, allotments, supplier performance, incident history and negotiation notes. These are ours, and publishing them would fund our competitors' content.",
  },
];

const FAQS = [
  {
    question: "What should MICE planners verify before booking a Morocco venue?",
    answer:
      "Capacity in the specific layout you need, coach access and turning space, the wet-weather plan, curfew and noise limits, and what the backup venue is. Capacity in one layout tells you almost nothing about another, and an outdoor Moroccan venue without a stated wet-weather plan is an unpriced risk you are carrying rather than the supplier.",
  },
  {
    question: "Why does this page not name venues?",
    answer:
      "Because named venues with capacities and floor plans are the commercial asset, and publishing them means a competitor has them within the week at no cost. The public level here describes the destination honestly enough for you to decide whether a conversation is worth having. The rest comes to you directly once you have a brief.",
  },
  {
    question: "Where do your capacity figures come from?",
    answer:
      "From our own inspections. Someone from PM Travel stands in the room, measures it, records what limits the capacity — floor area, exits, sightlines or service access — and signs the record. A supplier's stated capacity is recorded as unconfirmed until that happens, because supplier capacities are routinely the theatre-style maximum with no service access.",
  },
  {
    question: "Is Agafay suitable for corporate groups?",
    answer:
      "We are not answering that until we have inspected the sites and can tell you which ones, at what group size, in which months, and with what wet-weather plan. A yes with no numbers behind it is worth nothing to you, and it is what you will get almost everywhere else.",
  },
];

export default function MicePage() {
  // The only path from the venue record to the page. Never spread a
  // VenueRecord into a component.
  const publicVenues = VENUES.map(toPublicVenue).filter((venue) => venue !== null);

  return (
    <>
      <DestinationHero
        title="Events planned on venue data we measured"
        standfirst="Researching venue specifications is the hardest single stage of sourcing an event. We are building a venue record from our own inspections instead of repeating what supplier websites claim."
        imageKey="b3b-agafay-camp"
        kicker="MICE & Events"
        trail={[{ href: "/mice", label: "MICE & Events" }]}
      >
        <Link href={RFQ_HREF} className={PILL.onDarkSolid}>
          Request a B2B quote
          <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
        </Link>
        <a href="#venues" className={PILL.onDarkOutline}>
          Inspected venues
        </a>
      </DestinationHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
          <SectionHeading
            eyebrow="The problem"
            title="Capacity is the number nobody measured"
            className="self-start lg:sticky lg:top-24"
          >
            <p>So we are doing the slow version, layout by layout.</p>
          </SectionHeading>
          <ProseCard>
            <p>
              Ask three Morocco suppliers for a capacity and you will get three
              numbers, all of them theatre-style, none of them accounting for the
              service access the caterer needs or the sightline the stage blocks.
              That is not usually dishonesty. It is that nobody measured, and the
              number has been repeated until it became a fact.
            </p>
            <p>
              The consequence lands on you. A venue that holds 300 in a brochure
              and 190 in the layout your client actually asked for is a problem
              discovered late, in a country where your options that week are
              limited and your client is watching.
            </p>
            <p>
              So we are doing the slow version: inspecting venues ourselves,
              measuring capacity layout by layout, recording what limits it, and
              signing the record. It means this page fills up more slowly than a
              competitor&rsquo;s. It also means that when we tell you a number, we
              can tell you who measured it and when.
            </p>
          </ProseCard>
        </div>
      </Section>

      <Section tone="paper-2">
        <SectionHeading eyebrow="What we handle" title="Everything around the event, not only the venue" />
        <div className="mt-12">
          <IconCards items={HANDLED} columns={3} />
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Disclosure levels" title="What we publish, and what we do not">
          <p>
            Being explicit about this is fairer than letting you assume. Three
            levels, and we will tell you which one any answer comes from.
          </p>
        </SectionHeading>
        <ol className="mt-12 grid gap-4 lg:grid-cols-3">
          {DISCLOSURE.map(({ icon: Icon, title, body }, index) => {
            const internal = index === DISCLOSURE.length - 1;
            return (
              <li
                key={title}
                className={`flex flex-col rounded-3xl border p-7 ${
                  internal ? "surface-deep border-ink-900 bg-ink-900 text-paper" : "border-rule bg-paper-2"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    aria-hidden="true"
                    className={`flex size-12 items-center justify-center rounded-xl ${
                      internal ? "bg-paper text-ink-900" : "bg-red-600 text-paper"
                    }`}
                  >
                    <Icon size={22} strokeWidth={1.75} />
                  </span>
                  <span className={`tabular font-display text-sm font-bold ${internal ? "text-paper/60" : "text-ink-500"}`}>
                    Level {index + 1}
                  </span>
                </div>
                <h3 className={`mt-5 font-display text-xl font-semibold ${internal ? "text-paper" : "text-ink-900"}`}>{title}</h3>
                <p className={`mt-3 text-base ${internal ? "text-paper/85" : "text-ink-500"}`}>{body}</p>
              </li>
            );
          })}
        </ol>
      </Section>

      <Section tone="paper-2" id="venues">
        <SectionHeading eyebrow="Venue record" title="Inspected venues">
          <p>
            The public level, as described above: enough to judge whether a venue
            type suits your brief, without handing our supplier research to the
            next operator who visits this page.
          </p>
        </SectionHeading>
        <div className="mt-12">
          <VenueDisclosure venues={publicVenues} />
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 rounded-3xl border border-rule bg-paper-2 p-6 sm:p-10 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center">
          <span aria-hidden="true" className="flex size-16 items-center justify-center rounded-2xl bg-red-600 text-paper">
            <ChefHat size={28} strokeWidth={1.75} />
          </span>
          <div>
            <p className="text-sm font-semibold text-red-600">Signature programme</p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink-900">Taste of Marrakech</h2>
            <p className="mt-2 text-base text-ink-500">
              A culinary programme with an incentive format: a Marrakech culinary
              challenge, Atlas cooking with a team activity and an Agafay gala
              dinner.
            </p>
          </div>
          <Link href="/programmes/taste-of-marrakech" className={PILL.outline}>
            See the programme
            <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
          </Link>
        </div>
      </Section>

      <FaqSection heading="What planners ask us" faqs={FAQS} tone="paper-2" />

      <Section>
        <CtaBanner
          title="Send us the brief"
          imageKey="b3b-agafay-camp"
          primary={{ href: RFQ_HREF, label: "Request a B2B quote" }}
          secondary={{ href: "/how-we-work", label: "How we work" }}
        >
          <p>
            Tell us the group size, the layout you need and the month. We will
            tell you what we have inspected, what we have not, and what we would
            need to go and check. More on the method in{" "}
            <TextLink href="/how-we-work" onDark>
              how we work
            </TextLink>
            .
          </p>
        </CtaBanner>
        <div className="measure mt-8">
          <Evidence note="No venue capacity, floor plan or availability appears anywhere on this site that PM Travel has not measured on site. Where we have not inspected, we say so." />
        </div>
      </Section>
    </>
  );
}
