import Link from "next/link";
import { ArrowRight, CircleCheck, Layers } from "lucide-react";
import { Container } from "@/components/Container";
import { SiteImage } from "@/components/SiteImage";
import { imageByKey } from "@/features/images/registry";
import { IMAGE_SLOTS } from "@/features/images/keys";
import { COMPANY, RFQ_HREF } from "@/lib/nav";

const pill =
  "inline-flex min-h-13 items-center justify-center gap-2 rounded-full px-8 text-base font-semibold transition-colors duration-200";

/** What every ground file carries. Describes how we work, not live data. */
const FILE_INCLUDES = [
  "Suppliers and venues we have checked",
  "A service status on every line",
  "A named backup for every movement",
  "Drivers and guides briefed to your itinerary",
  "One coordinator from brief to departure",
];

/**
 * The home hero. Full-bleed Erg Chebbi under an ink gradient that is darkest
 * behind the text, the positioning line set large, and a quiet panel on the
 * right that says what a buyer actually gets.
 *
 * Without a photograph record the same layout renders on plain ink-900.
 */
export function HomeHero() {
  const hero = imageByKey(IMAGE_SLOTS.homeHero);

  return (
    <section className="surface-deep relative isolate overflow-hidden bg-ink-900 text-paper">
      {hero ? (
        <>
          <SiteImage
            imageKey={IMAGE_SLOTS.homeHero}
            fill
            priority
            sizes="100vw"
            className="-z-10 object-cover"
          />
          {/* ink-900 at 90% behind the headline keeps paper text well above 7:1. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-linear-to-r from-ink-900/90 via-ink-900/65 to-ink-900/25"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-linear-to-t from-ink-900/80 to-transparent"
          />
        </>
      ) : null}

      {/* pt-32 clears the 64px header that overlays this section. */}
      <Container className="grid min-h-svh items-center gap-12 pt-32 pb-32 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16 lg:pb-40">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-paper/25 bg-paper/10 px-4 py-1.5 text-sm font-medium text-paper backdrop-blur-sm">
            <span aria-hidden="true" className="size-2 rounded-full bg-red-600" />
            Morocco DMC for travel professionals
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-paper sm:text-[3.75rem] sm:leading-[1.02] lg:text-[5.25rem]">
            Your Morocco
            <br />
            Ground Partner
          </h1>

          <p className="mt-6 max-w-xl text-xl text-paper/90 lg:text-2xl">{COMPANY.proofLine}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href={RFQ_HREF} className={`${pill} bg-red-600 text-paper shadow-overlay hover:bg-paper hover:text-red-900`}>
              Request a B2B Quote
              <ArrowRight aria-hidden="true" size={18} strokeWidth={2} />
            </Link>
            <Link href="/how-we-work" className={`${pill} border border-paper/50 text-paper hover:bg-paper hover:text-ink-900`}>
              How we work
            </Link>
          </div>

          <p className="mt-8 text-sm text-paper/75">
            Based in {COMPANY.address.district}, {COMPANY.address.city}. Working in{" "}
            {COMPANY.languages.slice(0, -1).join(", ")} and {COMPANY.languages.at(-1)}.
          </p>
        </div>

        <aside className="hidden rounded-3xl border border-paper/15 bg-ink-900/55 p-7 backdrop-blur-md lg:block">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex size-11 items-center justify-center rounded-xl bg-red-600 text-paper"
            >
              <Layers size={20} strokeWidth={1.75} />
            </span>
            <p className="font-display text-lg font-semibold text-paper">Every ground file includes</p>
          </div>
          <ul className="mt-6 flex flex-col gap-3.5">
            {FILE_INCLUDES.map((item) => (
              <li key={item} className="flex items-start gap-3 text-base text-paper/90">
                <CircleCheck aria-hidden="true" size={20} strokeWidth={1.75} className="mt-0.5 shrink-0 text-paper" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-7 border-t border-paper/15 pt-5">
            <p className="text-sm text-paper/70">Service status on every proposal</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {["Requested", "On option", "Confirmed"].map((status, index) => (
                <li
                  key={status}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    index === 2 ? "bg-paper text-ink-900" : "border border-paper/30 text-paper"
                  }`}
                >
                  {status}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </Container>
    </section>
  );
}
