ALTER TABLE "users" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "token_version" integer DEFAULT 1;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "github_access_token" integer;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "location" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "ip" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "github_id" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "contributions" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "online" boolean DEFAULT false;