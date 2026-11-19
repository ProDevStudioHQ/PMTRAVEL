import { COMPANY, SITE_URL } from "@/lib/company";
import type { Crumb } from "@/components/Breadcrumbs";

/**
 * JSON-LD builders. Every object is developer-authored data or validated CRM
 * data, never visitor input. Never Review or AggregateRating: we have no data
 * to back them. Offer appears only in programmeTripSchema(), for a price the
 * business chose to publish in the CRM (docs/decisions.md D10).
 */

export const ORG_ID = `${SITE_URL}/#organization`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["TravelAgency", "LocalBusiness"],
    "@id": ORG_ID,
    name: COMPANY.name,
    alternateName: COMPANY.legalLine,
    description: COMPANY.shortDescription,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    image: `${SITE_URL}/opengraph-image`,
    email: COMPANY.email.b2b,
    telephone: COMPANY.phone.mobile.tel,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${COMPANY.address.line1}, ${COMPANY.address.street}`,
      addressLocality: COMPANY.address.city,
      postalCode: COMPANY.address.postalCode,
      addressCountry: COMPANY.address.countryCode,
    },
    ...(COMPANY.geo
      ? { geo: { "@type": "GeoCoordinates", latitude: COMPANY.geo.latitude, longitude: COMPANY.geo.longitude } }
      : {}),
    hasMap: COMPANY.mapsUrl,
    openingHoursSpecification: COMPANY.hours
      .filter((h) => h.opens)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.schemaDays,
        opens: h.opens,
        closes: h.closes,
      })),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        name: "B2B / Travel trade",
        email: COMPANY.email.b2b,
        telephone: COMPANY.phone.mobile.tel,
        availableLanguage: [...COMPANY.languages],
      },
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: COMPANY.email.general,
        telephone: COMPANY.phone.landline.tel,
      },
    ],
    areaServed: { "@type": "Country", name: "Morocco" },
    availableLanguage: [...COMPANY.languages],
    sameAs: [COMPANY.social.instagram, COMPANY.social.linkedin],
    parentOrganization: { "@type": "Organization", name: COMPANY.parent },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: COMPANY.name,
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbSchema(trail: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: `${SITE_URL}${crumb.href === "/" ? "" : crumb.href}`,
    })),
  };
}

export function articleSchema(a: { title: string; description: string; path: string; image: string; published: string; section: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    image: `${SITE_URL}${a.image}`,
    datePublished: a.published,
    dateModified: a.published,
    articleSection: a.section,
    inLanguage: "en",
    mainEntityOfPage: `${SITE_URL}${a.path}`,
    author: { "@type": "Organization", name: COMPANY.name, url: SITE_URL },
    publisher: { "@id": ORG_ID },
  };
}

export function touristTripSchema(t: {
  name: string;
  description: string;
  path: string;
  itinerary: { name: string; description: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: t.name,
    description: t.description,
    url: `${SITE_URL}${t.path}`,
    touristType: ["Travel agencies", "Tour operators", "Travel advisors"],
    provider: { "@id": ORG_ID },
    itinerary: {
      "@type": "ItemList",
      itemListElement: t.itinerary.map((stop, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: { "@type": "TouristAttraction", name: stop.name, description: stop.description },
      })),
    },
  };
}

export function serviceSchema(s: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.description,
    url: `${SITE_URL}${s.path}`,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Morocco" },
    audience: { "@type": "BusinessAudience", audienceType: "Travel trade" },
  };
}

/**
 * TouristTrip for a CRM programme. The Offer is added only when the CRM sends
 * a price (the business ticked "show price"), so the schema never states a
 * price the page does not show.
 */
export function programmeTripSchema(p: {
  name: string;
  description: string;
  path: string;
  image?: string;
  days: { name: string; description: string }[];
  price: { from: number; currency: string } | null;
}) {
  return {
    ...touristTripSchema({ name: p.name, description: p.description, path: p.path, itinerary: p.days }),
    ...(p.image ? { image: p.image } : {}),
    ...(p.price
      ? {
          offers: {
            "@type": "Offer",
            price: p.price.from.toFixed(2),
            priceCurrency: p.price.currency,
            url: `${SITE_URL}${p.path}`,
            availability: "https://schema.org/InStock",
            offeredBy: { "@id": ORG_ID },
          },
        }
      : {}),
  };
}
