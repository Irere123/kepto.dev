ALTER TABLE "circles" DROP CONSTRAINT "circles_ownerId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "circle_members" DROP CONSTRAINT "circle_members_circleId_circles_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "circles" ADD CONSTRAINT "circles_ownerId_users_id_fk" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "circle_members" ADD CONSTRAINT "circle_members_circleId_circles_id_fk" FOREIGN KEY ("circleId") REFERENCES "circles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
