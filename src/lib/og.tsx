import "server-only";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { ImageResponse } from "next/og";
import { imageByKey } from "@/features/images/registry";

/**
 * Open Graph / Twitter card renderer (1200x630). Every route segment exports
 * an opengraph-image.tsx that calls this with its own hero photo and title,
 * so each page shares with the right picture. Rendered at build time.
 */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";
export const OG_ALT = "PM Travel Agency — Morocco DMC and ground handler in Marrakech";

const MIDNIGHT = "#14213d"; // indigo
const SAND = "#f4ebdd";
const GOLD = "#c9973a";
const TERRACOTTA = "#e59a72"; // terracotta-300, for text on indigo

async function photo(imageKey: string) {
  const record = imageByKey(imageKey);
  if (!record) return null;
  const file = await readFile(join(process.cwd(), "public", record.src));
  const resized = await sharp(file).resize(OG_SIZE.width, OG_SIZE.height, { fit: "cover", position: "attention" }).jpeg({ quality: 78 }).toBuffer();
  return `data:image/jpeg;base64,${resized.toString("base64")}`;
}

export async function ogImage({ title, eyebrow, imageKey }: { title: string; eyebrow: string; imageKey: string }) {
  const src = await photo(imageKey);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: MIDNIGHT }}>
        {/* Satori renders plain <img> only; next/image does not apply here. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {src ? <img src={src} width={1200} height={630} alt="" style={{ position: "absolute", inset: 0, objectFit: "cover" }} /> : null}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, rgba(14,26,43,0.95) 0%, rgba(14,26,43,0.75) 55%, rgba(14,26,43,0.25) 100%)",
          }}
        />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 999,
                border: `2px solid ${GOLD}`,
                color: GOLD,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
              }}
            >
              PM
            </div>
            <div style={{ display: "flex", flexDirection: "column", color: SAND }}>
              <div style={{ fontSize: 24, letterSpacing: 3 }}>PM TRAVEL AGENCY</div>
              <div style={{ fontSize: 15, letterSpacing: 3, opacity: 0.7 }}>BY PRESTIGE MAJESTIC</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 820 }}>
            <div style={{ color: TERRACOTTA, fontSize: 22, letterSpacing: 5, textTransform: "uppercase" }}>{eyebrow}</div>
            <div style={{ color: SAND, fontSize: title.length > 48 ? 58 : 70, lineHeight: 1.05, marginTop: 18, letterSpacing: -1 }}>{title}</div>
            <div style={{ width: 120, height: 2, background: GOLD, marginTop: 34 }} />
            <div style={{ color: SAND, opacity: 0.8, fontSize: 22, marginTop: 22 }}>Morocco DMC · Marrakech · pm-travelagency.com</div>
          </div>
        </div>
      </div>
    ),
    OG_SIZE
  );
}
