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
  displayName: text("displayName").notNull(),
  avatarUrl: text("avatarUrl").notNull(),
  email: text("email").unique(),
  tokenVersion: integer("tokenVersion").default(1),
  githubAccessToken: text("githubAccessToken"),
  location: text("location"),
  bio: text("bio"),
  ip: text("ip"),
  githubId: text("githubId"),
  numFollowing: integer("numFollowing").default(0),
  numFollowers: integer("numFollowers").default(0),
  contributions: integer("contributions").default(0),
  online: boolean("online").default(false),
  staff: boolean("staff").default(false),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
