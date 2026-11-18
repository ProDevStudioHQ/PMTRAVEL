import type { Faq } from "@/components/FaqSection";
import type { IconName } from "@/components/Icon";

export const PARTNER_BENEFITS: { icon: IconName; title: string; body: string }[] = [
  { icon: "badge-percent", title: "Net B2B rates", body: "Net or contracted rates, clear inclusions, no hidden costs." },
  { icon: "layers", title: "White-label service", body: "Your brand on documents, guides and transfers if needed." },
  { icon: "file-text", title: "Fast, costed proposals", body: "Day-by-day proposals and written confirmations, quickly." },
  { icon: "message-circle", title: "One ops contact", body: "A dedicated operations contact on WhatsApp for every file." },
  { icon: "life-buoy", title: "24/7 on-trip assistance", body: "Our team in Morocco answers around the clock while your clients travel." },
  { icon: "shield-check", title: "Vetted suppliers", body: "Hotels, riads, desert camps, licensed guides and insured transport." },
  { icon: "sliders", title: "Flexible service levels", body: "From boutique riads to 5-star luxury, in one programme if needed." },
  { icon: "languages", title: "Multilingual & fam trips", body: "A team working in five languages, plus fam trips and site inspections." },
];

export const DMC_SERVICES: { icon: IconName; title: string }[] = [
  { icon: "hotel", title: "Accommodation contracting" },
  { icon: "car", title: "Transfers & fleet" },
  { icon: "languages", title: "Licensed guides" },
  { icon: "mountain", title: "Excursions & activities" },
  { icon: "presentation", title: "MICE & events" },
  { icon: "utensils", title: "Dining & gastronomy" },
  { icon: "plane-landing", title: "Meet & assist" },
  { icon: "clipboard-check", title: "Full ground handling" },
];

/** Home destinations rail. Every href is an existing destination page. */
export const HOME_DESTINATIONS = [
  { slug: "marrakech", name: "Marrakech", line: "Our base. Medina, palaces and gardens.", image: "b1-marrakech-hero" },
  { slug: "agafay", name: "Agafay", line: "The stony desert next to Marrakech.", image: "e07-agafay-tent" },
  { slug: "atlas", name: "Atlas Mountains", line: "Amazigh villages, treks and passes.", image: "e10-imlil-village" },
  { slug: "merzouga", name: "Sahara / Merzouga", line: "The Erg Chebbi dunes.", image: "b9-erg-chebbi-camels" },
  { slug: "fes", name: "Fes", line: "The great medieval medina.", image: "b7-fes-medina" },
  { slug: "essaouira", name: "Essaouira", line: "Atlantic port and ramparts.", image: "e22-essaouira-citadel" },
  { slug: "ouarzazate", name: "Ouarzazate", line: "Kasbahs and the gateway to the south.", image: "c6-ouarzazate-kasbah" },
  { slug: "chefchaouen", name: "Chefchaouen", line: "The blue town of the Rif.", image: "c4-chefchaouen" },
] as const;

/**
 * Testimonials. IMPORTANT: placeholders only. Replace each with a real,
 * attributable quote you have written permission to publish. Never invent one.
 */
export type Testimonial = { quote: string; name: string; role: string; companyType: string; placeholder: boolean };

export const TESTIMONIALS: Testimonial[] = [
  { quote: "[Add real testimonial]", name: "[Name]", role: "[Role]", companyType: "Tour operator", placeholder: true },
  { quote: "[Add real testimonial]", name: "[Name]", role: "[Role]", companyType: "Travel agency", placeholder: true },
  { quote: "[Add real testimonial]", name: "[Name]", role: "[Role]", companyType: "MICE agency", placeholder: true },
];

/** Partner logos. Placeholders until real partners approve the use of their logo. */
export const PARTNER_LOGOS: { name: string; placeholder: boolean }[] = Array.from({ length: 6 }, (_, i) => ({
  name: `[Partner logo ${i + 1}]`,
  placeholder: true,
}));

export const TRADE_FAQS: Faq[] = [
  {
    question: "How fast do you send a quote?",
    answer: "Within 24 hours for standard requests. Complex multi-city programmes, large groups or peak dates can take longer while we confirm availability — we tell you when to expect it.",
  },
  {
    question: "Do you offer net rates?",
    answer: "Yes. All our B2B proposals are at net or contracted rates with clear inclusions, so you set your own margin.",
  },
  {
    question: "Can you work white-label?",
    answer: "Yes. Documents, vouchers and airport signs can carry your brand, and our guides and drivers can introduce themselves as your local team.",
  },
  {
    question: "What group sizes do you handle?",
    answer: "From FIT and small private groups up to 200+ passengers for groups, incentives and events.",
  },
  {
    question: "Do you subcontract?",
    answer: "We contract hotels, camps, transport companies and licensed guides directly and coordinate them ourselves, so you deal with one accountable team.",
  },
  {
    question: "What are your payment terms and currencies?",
    answer: "Payment terms, deposits and invoicing currency are agreed per partner and stated on every written confirmation. Ask us for our standard B2B terms.",
  },
  {
    question: "Which cities do you cover?",
    answer: "We are based in Marrakech and operate across Morocco, including Agafay, the High Atlas, Ouarzazate, Merzouga, Fes, Essaouira, Chefchaouen, Casablanca, Rabat and Tangier.",
  },
];
