import { OG_ALT, OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({ title: "A Morocco DMC built for the travel trade", eyebrow: "B2B & DMC", imageKey: "d7-dmc-covered-souk" });
}
