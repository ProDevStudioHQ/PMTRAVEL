import { OG_ALT, OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({ title: "B2B programmes, ready to white-label", eyebrow: "Programmes", imageKey: "e05-agafay-camel-caravan" });
}
