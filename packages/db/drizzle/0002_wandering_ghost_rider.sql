ALTER TABLE "conversations" RENAME COLUMN "connectionId" TO "creatorId";--> statement-breakpoint
ALTER TABLE "conversation_members" RENAME COLUMN "userId1" TO "userId";--> statement-breakpoint
ALTER TABLE "conversations" DROP CONSTRAINT "conversations_connectionId_connections_id_fk";
--> statement-breakpoint
ALTER TABLE "conversation_members" DROP CONSTRAINT "conversation_members_userId1_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "conversations" ADD CONSTRAINT "conversations_creatorId_users_id_fk" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "conversation_members" ADD CONSTRAINT "conversation_members_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
