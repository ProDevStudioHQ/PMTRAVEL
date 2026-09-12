import "server-only";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "node:crypto";

/**
 * Private S3-compatible storage for RFQ attachments.
 *
 * Attachments are never written into public/ and never served from a public
 * URL. The only way to read one back is a short-lived signed URL issued to a
 * member of staff.
 */

let client: S3Client | undefined;

export function isStorageConfigured(): boolean {
  return Boolean(
    process.env.S3_BUCKET &&
      process.env.S3_ACCESS_KEY_ID &&
      process.env.S3_SECRET_ACCESS_KEY
  );
}

function getClient(): S3Client {
  if (!isStorageConfigured()) {
    throw new Error("S3 storage is not configured");
  }
  client ??= new S3Client({
    region: process.env.S3_REGION ?? "auto",
    endpoint: process.env.S3_ENDPOINT,
    // Most S3-compatible providers (and MinIO) need path-style addressing.
    forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    },
  });
  return client;
}

/** Keys are namespaced by request and carry a random component. */
export function buildStorageKey(reference: string, filename: string): string {
  return `rfq/${reference}/${randomUUID()}-${filename}`;
}

export async function putAttachment(
  key: string,
  body: Uint8Array,
  contentType: string
): Promise<void> {
  await getClient().send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: key,
      Body: body,
      ContentType: contentType,
      // Force the browser to download rather than render an uploaded file
      // in the context of our own origin.
      ContentDisposition: "attachment",
    })
  );
}

/** Short-lived read URL. Default fifteen minutes. */
export async function signAttachmentUrl(
  key: string,
  expiresInSeconds = 900
): Promise<string> {
  return getSignedUrl(
    getClient(),
    new GetObjectCommand({ Bucket: process.env.S3_BUCKET!, Key: key }),
    { expiresIn: expiresInSeconds }
  );
}
