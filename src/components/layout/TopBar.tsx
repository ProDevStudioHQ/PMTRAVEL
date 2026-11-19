/**
 * The utility bar above the main navigation, and the announcement strip above
 * that. Both are CRM data (docs/api-contract.md 4.4). Rendered inside the
 * Client header, so this file is client code too; it has no state of its own.
 */
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail, Phone } from "lucide-react";
import { Icon, WhatsappIcon, isIconName } from "@/components/Icon";
import { LanguageDropdown } from "@/components/layout/LanguageDropdown";
import { isExternal, safeHref, telHref, waHref } from "@/lib/site-layout";
import type { Announcement, AnnouncementColor, TopBarItem } from "@/types/cms";

/** colorToken -> design colour. Text colours measured AA on each fill (decisions.md D9). */
const ANNOUNCEMENT_TONES: Record<AnnouncementColor, string> = {
  terracotta: "bg-terracotta text-white",
  indigo: "bg-indigo text-sand",
  zellige: "bg-zellige text-white",
  majorelle: "bg-majorelle text-white",
  gold: "bg-gold text-ink",
};

export function AnnouncementStrip({ announcement, collapsed }: { announcement: Announcement; collapsed: boolean }) {
  const href = safeHref(announcement.link?.url);
  const external = href ? isExternal(href) || announcement.link?.openInNewTab : false;
  return (
    <div
      className={`site-announcement relative z-20 overflow-hidden transition-[max-height,opacity] duration-300 ${ANNOUNCEMENT_TONES[announcement.colorToken]} ${
        collapsed ? "pointer-events-none max-h-0 opacity-0" : "max-h-9 opacity-100"
      }`}
    >
      <p className="mx-auto flex h-9 max-w-site items-center justify-center gap-3 truncate px-4 text-[0.8125rem] font-medium sm:px-6 lg:px-10">
        <span className="truncate">{announcement.text}</span>
        {href && announcement.link ? (
          <a
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="inline-flex shrink-0 items-center gap-1 underline underline-offset-4"
          >
            {announcement.link.label}
            <ArrowRight aria-hidden="true" size={14} />
          </a>
        ) : null}
      </p>
    </div>
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[\d\s().-]{7,}$/;

/**
 * Editors often add a phone number or address as a plain "Text" item. Treat a
 * text item that is clearly an email or a phone number as one, so it gets the
 * right icon and link.
 */
function kindOf(item: TopBarItem): TopBarItem["type"] {
  if (item.type !== "TEXT") return item.type;
  const v = (item.value || item.label || "").trim();
  if (EMAIL_RE.test(v)) return "EMAIL";
  if (PHONE_RE.test(v) && v.replace(/\D/g, "").length >= 7) return "PHONE";
  return "TEXT";
}

function hrefFor(item: TopBarItem): string | null {
  const type = kindOf(item);
  const raw = (item.url ?? "").trim();
  // "name@example.com" typed as the link: make it a mail link.
  if (raw && EMAIL_RE.test(raw)) return `mailto:${raw}`;
  const given = safeHref(raw);
  if (given) return given;
  const value = item.value || (type !== "TEXT" ? item.label : null);
  if (!value) return null;
  if (type === "PHONE") return telHref(value);
  if (type === "WHATSAPP") return waHref(value);
  if (type === "EMAIL") return `mailto:${value.trim()}`;
  return null;
}

function ItemIcon({ item }: { item: TopBarItem }) {
  const type = kindOf(item);
  if (type === "PHONE") return <Phone aria-hidden="true" size={14} className="text-gold" />;
  if (type === "WHATSAPP")
    return (
      <span className="text-gold">
        <WhatsappIcon size={14} />
      </span>
    );
  if (type === "EMAIL") return <Mail aria-hidden="true" size={14} className="text-gold" />;
  if (isIconName(item.icon)) return <Icon name={item.icon} size={14} className="text-gold" />;
  if (item.type === "LINK") return <ArrowUpRight aria-hidden="true" size={14} className="text-gold" />;
  return null;
}

function TopBarEntry({ item }: { item: TopBarItem }) {
  const visibility = item.showOnMobile ? "inline-flex" : "hidden lg:inline-flex";
  if (item.type === "LANGUAGE_SWITCH") {
    return (
      <span className={item.showOnMobile ? "contents" : "hidden lg:contents"}>
        <LanguageDropdown />
      </span>
    );
  }
  const href = hrefFor(item);
  const type = kindOf(item);
  // Phone numbers and addresses are never machine-translated.
  const noTranslate = type === "PHONE" || type === "EMAIL" || type === "WHATSAPP";
  const content = (
    <>
      <ItemIcon item={item} />
      <span className={type === "EMAIL" ? "max-sm:sr-only" : undefined}>{item.label}</span>
    </>
  );
  const cls = `${visibility} ${noTranslate ? "notranslate " : ""}min-h-9 items-center gap-2 whitespace-nowrap hover:text-sand`;
  if (!href) {
    return (
      <span className={cls} translate={noTranslate ? "no" : undefined}>
        {content}
      </span>
    );
  }
  const external = isExternal(href);
  if (href.startsWith("/") && !external) {
    return (
      <Link href={href} className={cls}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} translate={noTranslate ? "no" : undefined} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {content}
    </a>
  );
}

/** Items by position. Collapses away once the page scrolls, like the bar it replaces. */
export function TopBar({ items, collapsed }: { items: TopBarItem[]; collapsed: boolean }) {
  const left = items.filter((i) => i.position === "LEFT");
  const right = items.filter((i) => i.position === "RIGHT");
  const mobileCount = items.filter((i) => i.showOnMobile).length;
  return (
    <div
      className={`relative z-10 border-b border-sand/10 transition-[max-height,opacity] duration-300 ${mobileCount === 0 ? "hidden lg:block" : ""} ${
        collapsed ? "pointer-events-none max-h-0 overflow-hidden opacity-0" : "max-h-10 overflow-visible opacity-100"
      }`}
    >
      <div className="mx-auto flex h-9 max-w-site items-center justify-between gap-4 px-4 text-xs text-sand/80 sm:px-6 lg:h-10 lg:px-10 lg:text-[0.8125rem]">
        <div className="flex min-w-0 items-center gap-4 lg:gap-8">
          {left.map((item) => (
            <TopBarEntry key={item.id} item={item} />
          ))}
        </div>
        <div className="flex items-center gap-4 lg:gap-8">
          {right.map((item) => (
            <TopBarEntry key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
