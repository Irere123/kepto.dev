import { relations, sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  boolean,
} from "drizzle-orm/pg-core";
import { connections } from "../connections";

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
  numConnections: integer("num_connections").default(0),
  numConnectors: integer("num_connectors").default(0),
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

export const userRelations = relations(user, ({ many }) => ({
  connectee: many(connections),
  connector: many(connections),
}));

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
