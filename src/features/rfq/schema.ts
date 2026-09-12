import {
  pgTable,
  pgEnum,
  uuid,
  text,
  integer,
  timestamp,
  jsonb,
  index,
} from "drizzle-orm/pg-core";

/**
 * RFQ status model. Every change is recorded in rfqStatusEvents, which is what
 * will eventually let us publish a REAL measured response time. Until that
 * measurement exists we publish no response-time figure at all.
 */
export const rfqStatus = pgEnum("rfq_status", [
  "received",
  "qualifying",
  "researching",
  "matching",
  "costing",
  "internal_review",
  "quoted",
  "negotiating",
  "won",
  "lost",
  "withdrawn",
]);

/**
 * Service status model. A client-facing quote must NEVER make an unconfirmed
 * service look confirmed - this is one of the biggest trust failures in the
 * industry, so the distinction is enforced in the data model rather than left
 * to whoever writes the quote.
 */
export const serviceStatus = pgEnum("service_status", [
  "requested",
  "pending",
  "option",
  "held",
  "confirmed",
  "cancelled",
  "expired",
  "estimated",
]);

export const programmeType = pgEnum("programme_type", [
  "leisure_group",
  "leisure_fit",
  "incentive",
  "conference_event",
  "educational",
  "special_interest",
  "other",
]);

export const rfqRequests = pgTable(
  "rfq_requests",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    /** Human-readable reference given to the sender, e.g. PM-2609-4F7K. */
    reference: text("reference").notNull().unique(),
    status: rfqStatus("status").notNull().default("received"),

    // Step 1 - required.
    company: text("company").notNull(),
    country: text("country").notNull(),
    contactName: text("contact_name").notNull(),
    role: text("role").notNull(),
    email: text("email").notNull(),
    destinations: text("destinations").array().notNull(),
    /** Null when the sender selected "flexible". */
    dateFrom: text("date_from"),
    dateTo: text("date_to"),
    datesFlexible: text("dates_flexible").notNull().default("false"),
    travellers: integer("travellers").notNull(),
    programmeType: programmeType("programme_type").notNull(),
    brief: text("brief").notNull(),

    // Steps 2 and 3 - optional. Kept as JSON because they are a buyer's
    // free-form detail, not something we query across.
    optionalDetail: jsonb("optional_detail").$type<Record<string, unknown>>(),

    // Provenance of the submission itself.
    sourceIpHash: text("source_ip_hash"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    /** Set the first time a human responds. Feeds the response-time measure. */
    firstRespondedAt: timestamp("first_responded_at", { withTimezone: true }),
  },
  (table) => [
    index("rfq_requests_status_idx").on(table.status),
    index("rfq_requests_created_at_idx").on(table.createdAt),
  ]
);

export const rfqStatusEvents = pgTable(
  "rfq_status_events",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    requestId: uuid("request_id")
      .notNull()
      .references(() => rfqRequests.id, { onDelete: "cascade" }),
    previousStatus: rfqStatus("previous_status"),
    newStatus: rfqStatus("new_status").notNull(),
    /** Who made the change. "system" for the initial received event. */
    actor: text("actor").notNull(),
    note: text("note"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [index("rfq_status_events_request_idx").on(table.requestId)]
);

export const rfqAttachments = pgTable(
  "rfq_attachments",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    requestId: uuid("request_id")
      .notNull()
      .references(() => rfqRequests.id, { onDelete: "cascade" }),
    /** Sanitised. Never the raw filename from the browser. */
    filename: text("filename").notNull(),
    /** Detected from magic bytes, not from the extension or the browser. */
    contentType: text("content_type").notNull(),
    byteSize: integer("byte_size").notNull(),
    /** Object key in private storage. Never a public URL. */
    storageKey: text("storage_key").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [index("rfq_attachments_request_idx").on(table.requestId)]
);

/**
 * Audit log for every read of RFQ content. RFQ data is commercially sensitive -
 * client names, budgets, itineraries - and is never used as public content
 * without written permission.
 */
export const rfqAccessLog = pgTable("rfq_access_log", {
  id: uuid("id").defaultRandom().primaryKey(),
  requestId: uuid("request_id").references(() => rfqRequests.id, {
    onDelete: "cascade",
  }),
  actor: text("actor").notNull(),
  action: text("action").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type RfqRequest = typeof rfqRequests.$inferSelect;
export type NewRfqRequest = typeof rfqRequests.$inferInsert;
