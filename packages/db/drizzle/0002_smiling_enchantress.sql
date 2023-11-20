ALTER TABLE "connections" ALTER COLUMN "connector" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "connections" ALTER COLUMN "connectee" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "connections" ADD CONSTRAINT "connections_connector_unique" UNIQUE("connector");--> statement-breakpoint
ALTER TABLE "connections" ADD CONSTRAINT "connections_connectee_unique" UNIQUE("connectee");