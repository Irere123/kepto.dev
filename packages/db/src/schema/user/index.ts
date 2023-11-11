import { sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  boolean,
} from "drizzle-orm/pg-core";

export const user = pgTable("users", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  displayName: text("display_name").notNull(),
  avatarUrl: text("avatar_url").notNull(),
  email: text("email").unique(),
  tokenVersion: integer("token_version").default(1),
  githubAccessToken: text("github_access_token"),
  location: text("location"),
  bio: text("bio"),
  ip: text("ip"),
  githubId: text("github_id"),
  contributions: integer("contributions").default(0),
  online: boolean("online").default(false),
  staff: boolean("staff").default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
