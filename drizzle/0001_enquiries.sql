CREATE TYPE "public"."enquiry_kind" AS ENUM('quote', 'partner', 'contact', 'newsletter');--> statement-breakpoint
CREATE TABLE "enquiries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"reference" text NOT NULL,
	"kind" "enquiry_kind" NOT NULL,
	"email" text NOT NULL,
	"data" jsonb NOT NULL,
	"source_path" text,
	"source_ip_hash" text,
	"user_agent" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "enquiries_reference_unique" UNIQUE("reference")
);
--> statement-breakpoint
CREATE INDEX "enquiries_kind_created_idx" ON "enquiries" USING btree ("kind","created_at");