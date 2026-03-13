CREATE TYPE "public"."finding_type" AS ENUM('critical', 'warning', 'good', 'neutral');--> statement-breakpoint
CREATE TABLE "roast_findings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"roast_id" uuid NOT NULL,
	"type" "finding_type" NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "roasts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" text NOT NULL,
	"language" text NOT NULL,
	"score" integer NOT NULL,
	"summary" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "suggested_improvements" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"roast_id" uuid NOT NULL,
	"original_code" text NOT NULL,
	"improved_code" text NOT NULL,
	"explanation" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "roast_findings" ADD CONSTRAINT "roast_findings_roast_id_roasts_id_fk" FOREIGN KEY ("roast_id") REFERENCES "public"."roasts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "suggested_improvements" ADD CONSTRAINT "suggested_improvements_roast_id_roasts_id_fk" FOREIGN KEY ("roast_id") REFERENCES "public"."roasts"("id") ON DELETE cascade ON UPDATE no action;