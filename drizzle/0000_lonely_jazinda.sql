CREATE TYPE "public"."programme_type" AS ENUM('leisure_group', 'leisure_fit', 'incentive', 'conference_event', 'educational', 'special_interest', 'other');--> statement-breakpoint
CREATE TYPE "public"."rfq_status" AS ENUM('received', 'qualifying', 'researching', 'matching', 'costing', 'internal_review', 'quoted', 'negotiating', 'won', 'lost', 'withdrawn');--> statement-breakpoint
CREATE TYPE "public"."service_status" AS ENUM('requested', 'pending', 'option', 'held', 'confirmed', 'cancelled', 'expired', 'estimated');--> statement-breakpoint
CREATE TABLE "rfq_access_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"request_id" uuid,
	"actor" text NOT NULL,
	"action" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rfq_attachments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"request_id" uuid NOT NULL,
	"filename" text NOT NULL,
	"content_type" text NOT NULL,
	"byte_size" integer NOT NULL,
	"storage_key" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rfq_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"reference" text NOT NULL,
	"status" "rfq_status" DEFAULT 'received' NOT NULL,
	"company" text NOT NULL,
	"country" text NOT NULL,
	"contact_name" text NOT NULL,
	"role" text NOT NULL,
	"email" text NOT NULL,
	"destinations" text[] NOT NULL,
	"date_from" text,
	"date_to" text,
	"dates_flexible" text DEFAULT 'false' NOT NULL,
	"travellers" integer NOT NULL,
	"programme_type" "programme_type" NOT NULL,
	"brief" text NOT NULL,
	"optional_detail" jsonb,
	"source_ip_hash" text,
	"user_agent" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"first_responded_at" timestamp with time zone,
	CONSTRAINT "rfq_requests_reference_unique" UNIQUE("reference")
);
--> statement-breakpoint
CREATE TABLE "rfq_status_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"request_id" uuid NOT NULL,
	"previous_status" "rfq_status",
	"new_status" "rfq_status" NOT NULL,
	"actor" text NOT NULL,
	"note" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "rfq_access_log" ADD CONSTRAINT "rfq_access_log_request_id_rfq_requests_id_fk" FOREIGN KEY ("request_id") REFERENCES "public"."rfq_requests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rfq_attachments" ADD CONSTRAINT "rfq_attachments_request_id_rfq_requests_id_fk" FOREIGN KEY ("request_id") REFERENCES "public"."rfq_requests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rfq_status_events" ADD CONSTRAINT "rfq_status_events_request_id_rfq_requests_id_fk" FOREIGN KEY ("request_id") REFERENCES "public"."rfq_requests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "rfq_attachments_request_idx" ON "rfq_attachments" USING btree ("request_id");--> statement-breakpoint
CREATE INDEX "rfq_requests_status_idx" ON "rfq_requests" USING btree ("status");--> statement-breakpoint
CREATE INDEX "rfq_requests_created_at_idx" ON "rfq_requests" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "rfq_status_events_request_idx" ON "rfq_status_events" USING btree ("request_id");