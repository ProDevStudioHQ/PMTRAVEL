import {
  Binoculars,
  Castle,
  ChefHat,
  Compass,
  Handshake,
  Info,
  Landmark,
  Mail,
  Map,
  MapPin,
  Mountain,
  Package,
  Presentation,
  Send,
  Sun,
  Tent,
  Waves,
  Workflow,
  type LucideIcon,
} from "lucide-react";
// From ./company, not ./nav: the header imports this module in the browser.
import { RFQ_HREF } from "@/lib/company";

/**
 * One lucide icon per page, keyed by href, for the header dropdowns and the
 * footer. Kept out of nav.ts so the navigation data stays plain data.
 */
const ICONS: Record<string, LucideIcon> = {
  "/morocco-dmc": Compass,
  "/mice": Presentation,
  "/programmes": Package,
  "/excursions": Binoculars,
  "/programmes/taste-of-marrakech": ChefHat,
  "/b2b": Handshake,
  "/destinations": Map,
  "/how-we-work": Workflow,
  "/about": Info,
  "/contact": Mail,
  [RFQ_HREF]: Send,
  "/destinations/marrakech": Landmark,
  "/destinations/agafay": Tent,
  "/destinations/atlas": Mountain,
  "/destinations/essaouira": Waves,
  "/destinations/merzouga": Sun,
  "/destinations/fes": Castle,
};

export const iconFor = (href: string): LucideIcon =>
  ICONS[href] ??
  (href.startsWith("/programmes/") ? Package : href.startsWith("/excursions/") ? Binoculars : MapPin);
