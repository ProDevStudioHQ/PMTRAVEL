import {
  BadgePercent,
  Baby,
  Briefcase,
  Building2,
  Bus,
  Car,
  ClipboardCheck,
  Clock,
  Compass,
  FileText,
  Gem,
  Heart,
  Hotel,
  Key,
  Landmark,
  Languages,
  Layers,
  Leaf,
  LifeBuoy,
  Map,
  MessageCircle,
  Mountain,
  PartyPopper,
  PenTool,
  PlaneLanding,
  Presentation,
  Route,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Store,
  Trophy,
  UserCheck,
  Users,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import { DoorIcon, LanternIcon, StarIcon } from "@/components/moroccan";

/**
 * Icons are referenced by name in content data so the data stays
 * serialisable (the header is a Client Component and receives menus as props).
 */
const ICONS = {
  "badge-percent": BadgePercent,
  baby: Baby,
  briefcase: Briefcase,
  building: Building2,
  bus: Bus,
  car: Car,
  "clipboard-check": ClipboardCheck,
  clock: Clock,
  compass: Compass,
  "file-text": FileText,
  gem: Gem,
  heart: Heart,
  hotel: Hotel,
  key: Key,
  landmark: Landmark,
  languages: Languages,
  layers: Layers,
  leaf: Leaf,
  "life-buoy": LifeBuoy,
  map: Map,
  "message-circle": MessageCircle,
  mountain: Mountain,
  "party-popper": PartyPopper,
  "pen-tool": PenTool,
  "plane-landing": PlaneLanding,
  presentation: Presentation,
  route: Route,
  "shield-check": ShieldCheck,
  sliders: SlidersHorizontal,
  sparkles: Sparkles,
  store: Store,
  trophy: Trophy,
  "user-check": UserCheck,
  users: Users,
  utensils: Utensils,
} satisfies Record<string, LucideIcon>;

/** Moroccan line icons drawn for this site (1.5px stroke, like the lucide set). */
const MOROCCAN = {
  door: DoorIcon,
  lantern: LanternIcon,
  star: StarIcon,
};

export type IconName = keyof typeof ICONS | keyof typeof MOROCCAN;

export function Icon({ name, size = 22, className = "" }: { name: IconName; size?: number; className?: string }) {
  if (name in MOROCCAN) {
    const Custom = MOROCCAN[name as keyof typeof MOROCCAN];
    return <Custom size={size} className={className} />;
  }
  const Component = ICONS[name as keyof typeof ICONS];
  return <Component aria-hidden="true" size={size} strokeWidth={1.5} className={className} />;
}

/** Brand marks (lucide v1 ships no brand icons). Simple paths, currentColor. */
export function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.83v1.5h.06c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.13v5.43h-4v-4.81c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.89h-4v-11Z" />
    </svg>
  );
}

export function WhatsappIcon({ size = 20 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91A9.85 9.85 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 0 1 8.24 8.25c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}

export function FacebookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.5 21.95V14h2.66l.4-3.1H13.5V8.93c0-.9.25-1.5 1.54-1.5h1.64V4.66a22 22 0 0 0-2.39-.12c-2.37 0-3.99 1.44-3.99 4.1v2.26H7.62V14h2.68v7.95h3.2Z" />
    </svg>
  );
}

export function YoutubeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.58 7.19a2.5 2.5 0 0 0-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42a2.5 2.5 0 0 0-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81a2.5 2.5 0 0 0 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42a2.5 2.5 0 0 0 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81ZM10 15V9l5.2 3L10 15Z" />
    </svg>
  );
}

export function TiktokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-2.59-2.59c.27 0 .53.04.77.12V9.77a5.68 5.68 0 1 0 4.91 5.63V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.3 4.3 0 0 1-3.24-1.48Z" />
    </svg>
  );
}

export function PinterestIcon({ size = 20 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-3.64 19.31c-.09-.79-.17-2 .03-2.86l1.18-5s-.3-.6-.3-1.49c0-1.4.81-2.44 1.82-2.44.86 0 1.27.64 1.27 1.41 0 .86-.55 2.15-.83 3.34-.24 1 .5 1.81 1.48 1.81 1.78 0 3.15-1.88 3.15-4.58 0-2.4-1.72-4.07-4.18-4.07-2.85 0-4.52 2.13-4.52 4.34 0 .86.33 1.78.74 2.28.08.1.09.19.07.29l-.28 1.13c-.04.18-.15.22-.34.13-1.25-.58-2.03-2.4-2.03-3.87 0-3.15 2.29-6.04 6.6-6.04 3.46 0 6.16 2.47 6.16 5.77 0 3.44-2.17 6.22-5.18 6.22-1.01 0-1.96-.53-2.29-1.15l-.62 2.38c-.23.87-.84 1.96-1.25 2.62A10 10 0 1 0 12 2Z" />
    </svg>
  );
}

export function XIcon({ size = 20 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3Zm-1.08 16.17h1.7L7.4 4.74H5.58l11.09 14.43Z" />
    </svg>
  );
}

/** True when `name` is one of the icons above (CRM data names icons by string). */
export const isIconName = (name: string | null | undefined): name is IconName => !!name && (name in ICONS || name in MOROCCAN);
