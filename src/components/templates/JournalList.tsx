import Link from "next/link";
import { SiteImage } from "@/components/SiteImage";
import { Reveal } from "@/components/motion/Reveal";
import { JOURNAL_CATEGORIES, categoryBySlug, type Article } from "@/content/journal";

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/** Category filter (links to static category pages). */
export function CategoryNav({ active }: { active?: string }) {
  const items = [{ slug: "", name: "All articles" }, ...JOURNAL_CATEGORIES];
  return (
    <nav aria-label="Journal categories">
      <ul className="flex flex-wrap gap-2">
        {items.map((c) => {
          const href = c.slug ? `/journal/category/${c.slug}` : "/journal";
          const current = (active ?? "") === c.slug;
          return (
            <li key={c.slug || "all"}>
              <Link
                href={href}
                aria-current={current ? "page" : undefined}
                className={`inline-flex min-h-11 items-center rounded-full border px-5 text-sm transition-colors ${
                  current ? "border-midnight bg-midnight text-sand" : "border-ink/15 bg-white hover:border-ink"
                }`}
              >
                {c.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function ArticleGrid({ articles }: { articles: Article[] }) {
  return (
    <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((a, i) => (
        <Reveal as="li" key={a.slug} delay={(i % 3) * 0.08}>
          <article className="card-lift group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white">
            <div className="relative aspect-[16/10] overflow-hidden">
              <SiteImage imageKey={a.image} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="card-img object-cover" />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="eyebrow">{categoryBySlug(a.category)?.name}</p>
              <h2 className="mt-3 font-display text-[1.375rem] leading-snug">
                <Link href={`/journal/${a.slug}`} className="after:absolute after:inset-0">
                  {a.title}
                </Link>
              </h2>
              <p className="mt-3 flex-1 text-[0.9375rem] text-muted">{a.excerpt}</p>
              <p className="mt-5 text-xs text-muted">
                <time dateTime={a.published}>{formatDate(a.published)}</time> · {a.readMinutes} min read
              </p>
            </div>
          </article>
        </Reveal>
      ))}
    </ul>
  );
}
