import Link from "next/link";
import {
  ArrowRight,
  Bike,
  CircleCheck,
  CircleX,
  ChefHat,
  Coffee,
  Footprints,
  Mountain,
  PlaneLanding,
  PlaneTakeoff,
  Presentation,
  ShoppingBasket,
  Sparkles,
  Tent,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/Container";
import { Evidence } from "@/components/Evidence";
import { FaqSection } from "@/components/FaqSection";
import { SiteImage } from "@/components/SiteImage";
import { StatusChip } from "@/components/StatusChip";
import { DestinationHero } from "@/features/destinations/DestinationPage";
import { imageByKey } from "@/features/images/registry";
import { COMPANY, RFQ_HREF } from "@/lib/nav";

const PATH = "/programmes/taste-of-marrakech";

export const metadata = pageMetadata({
  title: "Taste of Marrakech Culinary Programme",
  description:
    "A 7-night B2B culinary programme around Marrakech, Imlil, Ourika and Agafay: hands-on cooking, souks, mountains and curated dining.",
  path: PATH,
});

const pill =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold transition-colors duration-200";

/* -------------------------------------------------------------------------- */
/* Programme content                                                          */
/* -------------------------------------------------------------------------- */

const STATS = [
  { value: "7N / 8D", label: "Duration" },
  { value: "4", label: "Regions" },
  { value: "2", label: "Hands-on classes" },
  { value: "3", label: "Versions" },
];

const PROMISE = ["Cook with locals", "Explore the souks", "Walk the Atlas", "Ride the Ourika valley", "Dine under the Agafay sky"];

type Day = {
  day: number;
  title: string;
  place: string;
  icon: LucideIcon;
  gastronomy: string[];
  activity: string;
  overnight: string;
  handsOn?: boolean;
  imageKey?: string;
};

/*
  The day order is deliberate. Only two days are hands-on cooking, so the
  table never repeats itself. Every day stays within reach of Marrakech, the
  lighter Ourika day comes before a slow Agafay morning, and the desert dinner
  is followed by a night in camp rather than a late drive and an early start.
*/
const DAYS: Day[] = [
  {
    day: 1,
    title: "Arrival in Marrakech",
    place: "Marrakech",
    icon: PlaneLanding,
    gastronomy: ["Welcome Moroccan tea", "Traditional Moroccan dinner"],
    activity: "Private airport transfer and a relaxed first evening.",
    overnight: "Marrakech",
  },
  {
    day: 2,
    title: "From Souk to Table",
    place: "Marrakech medina",
    icon: ShoppingBasket,
    gastronomy: [
      "Market walk with a local food specialist: spices, olives, preserved lemons, herbs and bread",
      "Hands-on cooking class: tajine, Moroccan salads, bread and mint tea",
      "Lunch of the dishes the guests prepared",
    ],
    activity: "Medina walking, paced to the group.",
    overnight: "Marrakech",
    handsOn: true,
    imageKey: "b2-marrakech-medersa",
  },
  {
    day: 3,
    title: "Marrakech Food & Culture",
    place: "Marrakech",
    icon: Coffee,
    gastronomy: [
      "Moroccan breakfast experience",
      "Evening tasting trail: fresh orange juice, mint tea, olives, pastries, grills and local bread",
      "Dinner at a curated Marrakech restaurant",
    ],
    activity: "Bahia Palace and the souks in the morning, a free afternoon, the tasting trail at dusk.",
    overnight: "Marrakech",
  },
  {
    day: 4,
    title: "Imlil: Cook, Hike & Meet the Mountains",
    place: "Atlas Mountains · Imlil",
    icon: Mountain,
    gastronomy: [
      "Welcome tea in a mountain village",
      "Cooking workshop with a local Amazigh family: bread, tajine, seasonal salads",
      "Lunch of the food the guests prepared",
    ],
    activity: "Afternoon by version: village walk and viewpoints, a guided trek, or an e-bike ride.",
    overnight: "Marrakech",
    handsOn: true,
    imageKey: "b4-atlas-imlil",
  },
  {
    day: 5,
    title: "Ourika: The Valley Table",
    place: "Ourika valley",
    icon: Bike,
    gastronomy: [
      "Herb and saffron garden visit in the valley",
      "Lunch chez l'habitant with a local family",
      "Fresh bread and mint tea by the river",
    ],
    activity: "An e-bike ride or a gentle walk along the Ourika river and through its villages, then back to Marrakech.",
    overnight: "Marrakech",
    imageKey: "c11b-ourika-road",
  },
  {
    day: 6,
    title: "Agafay: From Mountain to Desert Table",
    place: "Agafay",
    icon: Tent,
    gastronomy: [
      "Outdoor Moroccan lunch with a cooking demonstration",
      "Private desert dinner with Moroccan tea, live music and stars",
    ],
    activity: "A slow morning, then e-bike, camel or quad by version, and sunset over the hills.",
    overnight: "Agafay camp",
    imageKey: "b3b-agafay-camp",
  },
  {
    day: 7,
    title: "The Marrakech Chef's Table",
    place: "Marrakech",
    icon: ChefHat,
    gastronomy: [
      "Evening chef's table by version: a chef-led tasting on modern Moroccan cuisine, a private riad dinner, or fine dining",
    ],
    activity: "An unhurried return from Agafay, free time and shopping.",
    overnight: "Marrakech",
    imageKey: "b1-marrakech-hero",
  },
  {
    day: 8,
    title: "Departure",
    place: "Marrakech",
    icon: PlaneTakeoff,
    gastronomy: ["Moroccan breakfast"],
    activity: "Private airport transfer, timed to the flight.",
    overnight: "—",
  },
];

const LEVELS = [
  { name: "Soft", detail: "Village walk and panoramic viewpoints", suits: "Couples, luxury travellers, 50+", icon: Footprints },
  { name: "Active", detail: "Guided trekking in the Imlil valleys", suits: "General adventure travellers", icon: Mountain },
  { name: "Adventure", detail: "E-bike and mountain cycling", suits: "Younger, incentive and corporate groups", icon: Bike },
];

const VERSIONS = [
  {
    tier: "€€",
    name: "Marrakech Culinary Escape",
    audience: "General leisure market",
    includes: [
      "4★ hotels or selected riads",
      "Both hands-on cooking classes",
      "Soft activity level in Imlil and Agafay",
      "Shared or private transfers",
      "Curated traditional restaurants",
    ],
  },
  {
    tier: "€€€",
    name: "Marrakech Culinary & Active",
    audience: "Active travellers and small groups",
    includes: [
      "4★ to 5★ hotels and riads",
      "Both hands-on cooking classes",
      "Imlil trek or e-bike, Agafay e-bike or camel",
      "Private transfers throughout",
      "Agafay camp night and desert dinner",
    ],
    featured: true,
  },
  {
    tier: "€€€€",
    name: "Luxury Moroccan Gastronomy",
    audience: "Luxury advisors and private clients",
    includes: [
      "Luxury hotels and palace riads",
      "Private cooking classes and private chef",
      "Private mountain experience",
      "Fine dining and a premium Agafay dinner",
      "Private transfers and dedicated guide",
    ],
  },
];

type Spec = { requirement: string; answer: string; pending?: boolean };

const SPECS: Spec[] = [
  { requirement: "Programme", answer: "Ready 7-night / 8-day itinerary, adaptable" },
  { requirement: "FIT", answer: "Yes" },
  { requirement: "Small and private groups", answer: "Yes" },
  { requirement: "MICE", answer: "Incentive version on request" },
  { requirement: "Culinary", answer: "Core of the programme" },
  { requirement: "Active component", answer: "Optional, three levels" },
  { requirement: "Hotel categories", answer: "4★, 5★ and luxury" },
  { requirement: "Dietary needs", answer: "Vegetarian, halal and allergies handled with each supplier, stated in the proposal" },
  { requirement: "Families", answer: "Child-friendly version on request" },
  { requirement: "Transport", answer: "Vehicle class matched to group size and road" },
  { requirement: "Guides", answer: `Working languages: ${COMPANY.languages.join(", ")}` },
  { requirement: "Backup", answer: "A named fallback for every critical service" },
  { requirement: "Commercial terms", answer: "B2B net rates; commission and terms by market" },
  { requirement: "Cancellation", answer: "Stated clearly in every proposal" },
  { requirement: "Branding", answer: "White-label under your brand, subject to contract" },
  { requirement: "Restaurants", answer: "Curated shortlist", pending: true },
  { requirement: "Cooking-class suppliers", answer: "Supplier shortlist and capacities", pending: true },
];

const SUPPLIER_CRITERIA = [
  "Group capacity in the layout the group needs",
  "Private dining and exclusive-use options",
  "Dietary handling: vegetarian, halal, allergies",
  "Kitchen standards for hands-on classes",
  "B2B net rate or commission, in writing",
  "Inspected by PM Travel, with a date",
];

const NOT_THIS = ["Hotel + excursions + restaurants", "The same food experience every day", "A single cooking class sold as a trip"];
const BUT_THIS = [
  "A culinary journey with a story from souk to chef's table",
  "Two hands-on classes, varied tastings and curated dining",
  "Nature and activity between the meals, at the client's level",
];

const FAQS = [
  {
    question: "Can the programme be sold under our own brand?",
    answer:
      "Yes, that is how it is designed: a ground programme you contract and sell under your brand, with PM Travel operating it in Morocco. White-label terms are set out in the contract for each partner.",
  },
  {
    question: "Which restaurants and cooking-class suppliers are included?",
    answer:
      "They are confirmed per departure from a curated shortlist, matched to budget, group size, availability and dietary needs. We do not name suppliers publicly until they are contracted and inspected; the proposal names them.",
  },
  {
    question: "Can the itinerary be shortened or adapted?",
    answer:
      "Yes. The programme is modular: the Imlil, Ourika and Agafay days can be shortened, swapped or upgraded, and the activity level changes independently of the culinary content.",
  },
  {
    question: "Is there a version for incentive groups?",
    answer:
      "Yes. A shorter incentive format, Taste of Morocco over four nights, combines a welcome dinner, a Marrakech culinary challenge, Atlas cooking with a team activity, and an Agafay sunset and gala dinner.",
  },
];

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

function Eyebrow({ children, onDark = false }: { children: string; onDark?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-sm font-semibold ${onDark ? "text-paper/80" : "text-red-600"}`}>
      <span aria-hidden="true" className={`h-0.5 w-8 rounded-full ${onDark ? "bg-paper/60" : "bg-red-600"}`} />
      {children}
    </p>
  );
}

const h2 = "mt-4 max-w-[24ch] text-2xl font-bold tracking-tight lg:text-[2.5rem] lg:leading-[1.1]";

export default function TasteOfMarrakechPage() {
  return (
    <>
      <DestinationHero
        title="Morocco Through the Table"
        standfirst="Taste of Marrakech: a 7-night culinary journey through Marrakech, Imlil in the Atlas Mountains, the Ourika valley and Agafay, ready to contract as a white-label B2B programme."
        imageKey="b1-marrakech-hero"
        kicker="Signature programme"
        trail={[
          { href: "/morocco-dmc", label: "Morocco DMC" },
          { href: PATH, label: "Taste of Marrakech" },
        ]}
        stats={STATS}
      >
        <Link href={RFQ_HREF} className={`${pill} bg-paper text-red-900 hover:bg-red-050`}>
          Request the product sheet
          <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
        </Link>
        <a href="#itinerary" className={`${pill} border border-paper/60 text-paper hover:bg-paper hover:text-ink-900`}>
          See the itinerary
        </a>
      </DestinationHero>

      {/* Positioning */}
      <section className="bg-paper">
        <Container className="py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <Eyebrow>The product</Eyebrow>
              <h2 className={`${h2} text-ink-900`}>Taste Morocco. Cook it. Walk it. Live it.</h2>
              <p className="measure mt-6 text-lg text-ink-500">
                A culinary journey through Marrakech and its landscapes,
                combining hands-on cooking, local markets, mountain experiences,
                cycling, Moroccan dining and carefully selected restaurants.
                Built for tour operators and travel advisors who want a
                signature Morocco product, not another activity.
              </p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {PROMISE.map((item) => (
                  <li key={item} className="rounded-full border border-rule bg-paper-2 px-4 py-2 text-sm font-medium text-ink-900">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="rounded-2xl border border-rule bg-paper-2 p-6">
                <p className="text-sm font-semibold text-ink-500">Not this</p>
                <ul className="mt-4 flex flex-col gap-3">
                  {NOT_THIS.map((item) => (
                    <li key={item} className="flex gap-3 text-base text-ink-500">
                      <CircleX aria-hidden="true" size={20} strokeWidth={1.75} className="mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="surface-deep rounded-2xl bg-red-900 p-6 text-paper">
                <p className="text-sm font-semibold text-paper/80">But this</p>
                <ul className="mt-4 flex flex-col gap-3">
                  {BUT_THIS.map((item) => (
                    <li key={item} className="flex gap-3 text-base text-paper">
                      <CircleCheck aria-hidden="true" size={20} strokeWidth={1.75} className="mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Itinerary */}
      <section id="itinerary" className="scroll-mt-16 bg-paper-2">
        <Container className="py-20 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Day by day</Eyebrow>
              <h2 className={`${h2} text-ink-900`}>Eight days, from the souk to the chef&rsquo;s table</h2>
            </div>
            <p className="flex items-center gap-2 text-sm text-ink-500">
              <span className="rounded-full bg-red-600 px-2.5 py-0.5 text-xs font-semibold text-paper">Hands-on</span>
              marks the two cooking classes
            </p>
          </div>

          <ol className="relative mt-14 flex flex-col gap-5 before:absolute before:top-4 before:bottom-4 before:left-7 before:hidden before:w-0.5 before:bg-red-600/20 before:content-[''] sm:before:block">
            {DAYS.map((day) => {
              const Icon = day.icon;
              const hasImage = day.imageKey ? Boolean(imageByKey(day.imageKey)) : false;
              return (
                <li key={day.day} className="relative sm:pl-20">
                  <span
                    aria-hidden="true"
                    className="absolute top-6 left-0 hidden size-14 items-center justify-center rounded-2xl bg-red-600 text-paper shadow-raised ring-8 ring-paper-2 sm:flex"
                  >
                    <Icon size={24} strokeWidth={1.75} />
                  </span>
                  <article
                    className={`grid overflow-hidden rounded-2xl border border-rule bg-paper ${
                      hasImage ? "md:grid-cols-[minmax(0,1fr)_16rem] lg:grid-cols-[minmax(0,1fr)_20rem]" : ""
                    }`}
                  >
                    <div className="p-6 lg:p-8">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="tabular rounded-full bg-ink-900 px-3 py-1 font-display text-xs font-bold text-paper">
                          Day {day.day}
                        </span>
                        <span className="text-sm text-ink-500">{day.place}</span>
                        {day.handsOn ? (
                          <span className="rounded-full bg-red-600 px-2.5 py-0.5 text-xs font-semibold text-paper">Hands-on</span>
                        ) : null}
                      </div>
                      <h3 className="mt-4 font-display text-xl font-semibold text-ink-900 lg:text-2xl">{day.title}</h3>

                      <div className="mt-5 grid gap-5 lg:grid-cols-2">
                        <div>
                          <p className="flex items-center gap-2 text-sm font-semibold text-ink-900">
                            <UtensilsCrossed aria-hidden="true" size={16} className="text-red-600" />
                            Gastronomy
                          </p>
                          <ul className="mt-2 flex flex-col gap-1.5">
                            {day.gastronomy.map((item) => (
                              <li key={item} className="flex gap-2 text-sm text-ink-500">
                                <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-red-600" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="flex items-center gap-2 text-sm font-semibold text-ink-900">
                            <Footprints aria-hidden="true" size={16} className="text-red-600" />
                            Activity
                          </p>
                          <p className="mt-2 text-sm text-ink-500">{day.activity}</p>
                          <p className="mt-4 text-sm text-ink-900">
                            <span className="font-semibold">Overnight:</span> {day.overnight}
                          </p>
                        </div>
                      </div>
                    </div>
                    {hasImage && day.imageKey ? (
                      <div className="relative min-h-48 bg-paper-2">
                        <SiteImage imageKey={day.imageKey} fill sizes="(min-width: 1024px) 20rem, (min-width: 768px) 16rem, 100vw" className="object-cover" />
                      </div>
                    ) : null}
                  </article>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      {/* Activity levels */}
      <section className="bg-paper">
        <Container className="py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
            <div>
              <Eyebrow>One product, three levels</Eyebrow>
              <h2 className={`${h2} text-ink-900`}>The activity changes. The table stays the same.</h2>
              <p className="mt-5 text-lg text-ink-500">
                The Imlil afternoon and the Agafay activity are set by the
                client&rsquo;s profile, independently of the culinary content.
              </p>
            </div>
            <ul className="grid gap-4 sm:grid-cols-3">
              {LEVELS.map(({ name, detail, suits, icon: Icon }) => (
                <li key={name} className="flex flex-col rounded-2xl border border-rule bg-paper p-6">
                  <span aria-hidden="true" className="flex size-12 items-center justify-center rounded-xl bg-red-050 text-red-600">
                    <Icon size={22} strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink-900">{name}</h3>
                  <p className="mt-2 text-sm text-ink-500">{detail}</p>
                  <p className="mt-auto pt-5 text-sm text-ink-900">
                    <span className="font-semibold">For:</span> {suits}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Versions */}
      <section className="surface-deep bg-ink-900 text-paper">
        <Container className="py-20 lg:py-28">
          <Eyebrow onDark>Three versions</Eyebrow>
          <h2 className={`${h2} text-paper`}>Sell it at the level your market buys</h2>
          <p className="measure mt-5 text-lg text-paper/80">
            The same 7-night structure in three commercial versions. Price
            tiers are relative; every proposal is costed for the actual dates
            and group.
          </p>

          <ul className="mt-12 grid gap-5 lg:grid-cols-3">
            {VERSIONS.map((version) => (
              <li
                key={version.name}
                className={`flex flex-col rounded-3xl border p-7 ${
                  version.featured ? "border-red-600 bg-red-900" : "border-paper/12 bg-paper/[0.05]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="tabular font-display text-2xl font-bold text-paper">{version.tier}</span>
                  {version.featured ? (
                    <span className="rounded-full bg-paper px-3 py-1 text-xs font-semibold text-red-900">Core version</span>
                  ) : null}
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-paper">{version.name}</h3>
                <p className="mt-1 text-sm text-paper/75">{version.audience}</p>
                <ul className="mt-6 flex flex-col gap-3 border-t border-paper/12 pt-6">
                  {version.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-paper/90">
                      <CircleCheck aria-hidden="true" size={18} strokeWidth={1.75} className="mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* B2B specifications */}
      <section className="bg-paper-2">
        <Container className="py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] lg:gap-16">
            <div className="self-start lg:sticky lg:top-24">
              <Eyebrow>For product managers</Eyebrow>
              <h2 className={`${h2} text-ink-900`}>What you need to contract it</h2>
              <p className="mt-5 text-lg text-ink-500">
                The questions a product manager asks before adding a programme to
                a portfolio, answered plainly. Anything still being verified says
                so.
              </p>
              <Link href={RFQ_HREF} className={`${pill} mt-8 bg-red-600 text-paper hover:bg-red-900`}>
                Request the product sheet
                <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
              </Link>
            </div>

            <div className="overflow-hidden rounded-2xl border border-rule bg-paper">
              <dl>
                {SPECS.map((spec) => (
                  <div
                    key={spec.requirement}
                    className="grid gap-1 border-b border-rule px-5 py-4 last:border-b-0 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-6 sm:px-6"
                  >
                    <dt className="text-sm font-semibold text-ink-900">{spec.requirement}</dt>
                    <dd className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-500">
                      {spec.answer}
                      {spec.pending ? <StatusChip status="pending" /> : null}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      {/* Supplier standard */}
      <section className="bg-paper">
        <Container className="py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
            <div>
              <Eyebrow>Supplier standard</Eyebrow>
              <h2 className={`${h2} text-ink-900`}>Restaurants chosen on evidence, not on Instagram</h2>
              <p className="mt-5 text-lg text-ink-500">
                Every restaurant and cooking-class supplier in the programme is
                assessed against the same criteria before it reaches a proposal.
              </p>
              <div className="mt-6">
                <Evidence note="Restaurant and cooking-class partners are not named on this page. They are named in each proposal once contracted and inspected, and the supplier assessment is still in progress." />
              </div>
            </div>
            <ol className="grid gap-4 sm:grid-cols-2">
              {SUPPLIER_CRITERIA.map((item, index) => (
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
        </Container>
      </section>

      {/* MICE spin-off */}
      <section className="bg-paper-2">
        <Container className="py-16 lg:py-20">
          <div className="grid gap-8 rounded-3xl border border-rule bg-paper p-6 sm:p-10 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center">
            <span aria-hidden="true" className="flex size-16 items-center justify-center rounded-2xl bg-red-600 text-paper">
              <Presentation size={28} strokeWidth={1.75} />
            </span>
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold text-red-600">
                <Sparkles aria-hidden="true" size={16} />
                Incentive format
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink-900">
                Taste of Morocco: 4 Nights Incentive
              </h2>
              <p className="mt-2 text-base text-ink-500">
                Welcome dinner, a Marrakech culinary challenge, Atlas cooking with
                a team activity, and an Agafay sunset with a gala dinner.
              </p>
            </div>
            <Link href="/mice" className={`${pill} border border-ink-900/20 text-ink-900 hover:border-ink-900`}>
              MICE &amp; Events
              <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
            </Link>
          </div>
        </Container>
      </section>

      <FaqSection heading="What product managers ask" faqs={FAQS} />

      {/* Final CTA */}
      <section className="bg-paper-2">
        <Container className="py-20 lg:py-28">
          <div className="surface-deep relative isolate overflow-hidden rounded-[2rem] bg-red-900 px-6 py-14 text-paper sm:px-12 lg:px-16 lg:py-20">
            {imageByKey("b3b-agafay-camp") ? (
              <>
                <SiteImage imageKey="b3b-agafay-camp" fill sizes="(min-width: 1280px) 1056px, 100vw" className="-z-10 object-cover" />
                {/* red-900 at 90%: paper text stays above 9:1. */}
                <div aria-hidden="true" className="absolute inset-0 -z-10 bg-red-900/90" />
              </>
            ) : null}
            <h2 className="max-w-[20ch] text-3xl font-bold tracking-tight text-paper lg:text-[3rem] lg:leading-[1.05]">
              Add a signature Morocco product to your portfolio
            </h2>
            <p className="measure mt-5 text-lg text-paper/90">
              Tell us your market, the version you are interested in and the
              season. We will send the product sheet and cost the programme for
              your dates.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href={RFQ_HREF} className={`${pill} bg-paper text-red-900 hover:bg-red-050`}>
                Request the product sheet
                <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
              </Link>
              <a href={`mailto:${COMPANY.email.b2b}`} className={`${pill} border border-paper/50 text-paper hover:bg-paper hover:text-red-900`}>
                Email the operations desk
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
