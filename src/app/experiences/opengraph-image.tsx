import { OG_ALT, OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({ title: "Signature Morocco experiences", eyebrow: "Experiences", imageKey: "e18-jemaa-el-fna-dusk" });
}
