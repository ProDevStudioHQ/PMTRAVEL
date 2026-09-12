import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { PRIMARY_NAV } from "@/lib/nav";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container as="section" className="py-24 lg:py-32">
      <p className="text-2xs font-medium uppercase tracking-[0.16em] text-meta">
        404
      </p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-ink lg:text-3xl">
        That page does not exist
      </h1>
      <p className="measure mt-6 text-base text-meta">
        The address may have changed, or the page may never have been published.
      </p>
      <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
        {PRIMARY_NAV.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-sm text-petrol underline">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <ButtonLink href="/">Back to the home page</ButtonLink>
      </div>
    </Container>
  );
}
