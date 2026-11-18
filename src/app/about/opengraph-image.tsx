import { OG_ALT, OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({ title: "A Marrakech DMC that works for the travel trade", eyebrow: "About us", imageKey: "e16-ben-youssef-madrasa" });
}
