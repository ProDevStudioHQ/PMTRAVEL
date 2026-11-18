import { OG_ALT, OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({ title: "Merzouga, operated by our Marrakech team", eyebrow: "Destinations", imageKey: "b9-erg-chebbi-camels" });
}
