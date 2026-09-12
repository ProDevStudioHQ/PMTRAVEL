/**
 * Upload validation. Files are validated by magic bytes, never by extension -
 * an extension is just a string the browser sent us.
 */

export const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB
export const MAX_FILES = 5;

type Signature = {
  contentType: string;
  /** Bytes that must appear at `offset`. */
  bytes: number[];
  offset: number;
  /** Extensions this container legitimately carries. */
  extensions: string[];
};

const SIGNATURES: Signature[] = [
  {
    contentType: "application/pdf",
    bytes: [0x25, 0x50, 0x44, 0x46], // %PDF
    offset: 0,
    extensions: ["pdf"],
  },
  {
    contentType: "image/jpeg",
    bytes: [0xff, 0xd8, 0xff],
    offset: 0,
    extensions: ["jpg", "jpeg"],
  },
  {
    contentType: "image/png",
    bytes: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
    offset: 0,
    extensions: ["png"],
  },
  {
    // OLE2 compound file: legacy .doc and .xls.
    contentType: "application/x-ole-storage",
    bytes: [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1],
    offset: 0,
    extensions: ["doc", "xls"],
  },
  {
    // ZIP container: .docx and .xlsx are ZIPs. The magic bytes prove it is a
    // ZIP, not which Office format it is, so the extension narrows it *after*
    // the container has been proven. A ZIP claiming to be .docx is still only
    // ever stored and handed to a human, never executed or unpacked by us.
    contentType: "application/zip",
    bytes: [0x50, 0x4b, 0x03, 0x04],
    offset: 0,
    extensions: ["docx", "xlsx"],
  },
];

const OFFICE_TYPES: Record<string, string> = {
  doc: "application/msword",
  xls: "application/vnd.ms-excel",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};

export type FileCheck =
  | { ok: true; contentType: string; filename: string }
  | { ok: false; reason: string };

/**
 * Strips directories, control characters and anything that is not a safe
 * filename character, then caps the length. Never trust the browser's name.
 */
export function sanitiseFilename(raw: string): string {
  const base = raw.split(/[\\/]/).pop() ?? "file";
  const cleaned = base
    .replace(/[^A-Za-z0-9._-]/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^[.-]+/, "")
    .slice(0, 120);
  return cleaned.length > 0 ? cleaned : "file";
}

function extensionOf(filename: string): string {
  const parts = filename.toLowerCase().split(".");
  return parts.length > 1 ? (parts.pop() ?? "") : "";
}

function matches(head: Uint8Array, signature: Signature): boolean {
  return signature.bytes.every(
    (byte, index) => head[signature.offset + index] === byte
  );
}

export async function checkUpload(file: File): Promise<FileCheck> {
  if (file.size === 0) return { ok: false, reason: "The file is empty." };
  if (file.size > MAX_FILE_BYTES) {
    return { ok: false, reason: "Files must be 10MB or smaller." };
  }

  const filename = sanitiseFilename(file.name);
  const extension = extensionOf(filename);

  const head = new Uint8Array(await file.slice(0, 16).arrayBuffer());
  const signature = SIGNATURES.find((candidate) => matches(head, candidate));

  if (!signature) {
    return {
      ok: false,
      reason: "That file type is not accepted. Send PDF, DOC, DOCX, XLS, XLSX, JPG or PNG.",
    };
  }

  // The container is proven. Now the extension must be one this container can
  // legitimately carry - a .exe renamed to .pdf fails the first test, and a
  // ZIP renamed to .png fails this one.
  if (!signature.extensions.includes(extension)) {
    return {
      ok: false,
      reason: "The file contents do not match its extension.",
    };
  }

  return {
    ok: true,
    filename,
    contentType: OFFICE_TYPES[extension] ?? signature.contentType,
  };
}
