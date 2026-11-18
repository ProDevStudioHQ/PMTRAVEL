import { OG_ALT, OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({ title: "B2B excursions around Marrakech", eyebrow: "Excursions", imageKey: "e13-agafay-desert-track" });
}
