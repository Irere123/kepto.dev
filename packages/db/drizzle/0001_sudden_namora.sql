ALTER TABLE "messages" DROP CONSTRAINT "messages_connectionId_connections_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_connectionId_connections_id_fk" FOREIGN KEY ("connectionId") REFERENCES "connections"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
