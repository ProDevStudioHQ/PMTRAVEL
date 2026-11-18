/**
 * Turns the CRM's /site payload into what the layout components render.
 *
 * Plain functions with no server-only imports: the header and mobile menu are
 * Client Components and receive the results as props. Every URL that comes
 * from the CRM passes through safeHref() first, so a link typed into the CRM
 * can only ever be a site path, http(s), mailto: or tel:.
 */
import type { NavItem, SitePayload } from "@/types/cms";
import { WHATSAPP_DEFAULT_MESSAGE } from "@/lib/company";

export type NavLink = { href: string; label: string; blurb?: string; newTab?: boolean };

export type NavEntry = {
  id: string;
  label: string;
  href: string;
  newTab?: boolean;
  /** "list": small dropdown. "mega": wide panel with descriptions and a quote card. */
  menu?: { kind: "list" | "mega"; items: NavLink[]; allLabel?: string };
  emphasis?: boolean;
};

export type NavButton = { id: string; label: string; href: string; style: "PRIMARY" | "OUTLINE"; newTab: boolean };

/** Contact details the layout needs, from the CRM settings. */
export type SiteContact = {
  mobileDisplay: string;
  mobileHref: string;
  landlineDisplay: string;
  landlineHref: string;
  whatsappHref: string;
  emailB2b: string;
  emailContact: string;
};

const SAFE_SCHEME = /^(https?:|mailto:|tel:)/i;

/** A CRM-supplied URL, or null if it is empty or uses a scheme we do not render. */
export function safeHref(url: string | null | undefined): string | null {
  const value = (url ?? "").trim();
  if (!value) return null;
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  if (value.startsWith("#")) return value;
  return SAFE_SCHEME.test(value) ? value : null;
}

export const isExternal = (href: string) => /^https?:\/\//i.test(href);

/** "+212 7 62 45 54 72" -> "tel:+212762455472" */
export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/** WhatsApp deep link from a number in any format, with an optional prefilled message. */
export function waHref(number: string, message: string = WHATSAPP_DEFAULT_MESSAGE) {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

export function siteContact(site: SitePayload): SiteContact {
  const { phones, emails } = site.settings;
  return {
    mobileDisplay: phones.mobile,
    mobileHref: telHref(phones.mobile),
    landlineDisplay: phones.landline,
    landlineHref: telHref(phones.landline),
    whatsappHref: waHref(phones.whatsapp),
    emailB2b: emails.b2b,
    emailContact: emails.contact,
  };
}

/** "Mon–Fri 9:00–18:00 · Sat 9:00–13:00 · Closed Sunday" -> one line per part. */
export function splitHours(openingHours: string) {
  return openingHours
    .split(/\s*[·|\n]\s*/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function toLink(item: NavItem): NavLink | null {
  const href = safeHref(item.url);
  if (!href) return null;
  return { href, label: item.label, ...(item.description ? { blurb: item.description } : {}), ...(item.openInNewTab ? { newTab: true } : {}) };
}

/** CRM nav items -> the header's NavEntry list. Items without a usable link are dropped. */
export function toNavEntries(items: NavItem[]): NavEntry[] {
  const entries: NavEntry[] = [];
  for (const item of items) {
    if (item.type === "BUTTON") continue;
    const href = safeHref(item.url);
    const children = item.children.map(toLink).filter((l): l is NavLink => l !== null);
    if (children.length === 0) {
      if (href) entries.push({ id: item.id, label: item.label, href, ...(item.openInNewTab ? { newTab: true } : {}) });
      continue;
    }
    const kind = item.type === "MEGA_MENU" ? "mega" : "list";
    // An "All ..." link only when the parent page is not already one of the children.
    const showAll = href !== null && !children.some((c) => c.href === href);
    entries.push({
      id: item.id,
      label: item.label,
      href: href ?? children[0]!.href,
      menu: {
        kind,
        items: children,
        ...(showAll ? { allLabel: kind === "mega" ? `${item.label} overview` : `All ${item.label.toLowerCase()}` } : {}),
      },
      ...(item.isHighlighted ? { emphasis: true } : {}),
    });
  }
  return entries;
}

export function toNavButtons(items: NavItem[]): NavButton[] {
  return items.flatMap((item) => {
    const href = safeHref(item.url);
    return href ? [{ id: item.id, label: item.label, href, style: item.buttonStyle ?? "PRIMARY", newTab: item.openInNewTab }] : [];
  });
}
