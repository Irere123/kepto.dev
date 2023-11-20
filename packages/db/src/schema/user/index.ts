import { relations, sql } from "drizzle-orm";
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

export const userRelations = relations(user, ({ many }) => ({
  connectee: many(connections),
  connector: many(connections),
}));

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;

export const connections = pgTable("connections", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  connectorId: uuid("connector").notNull(),
  connecteeId: uuid("connectee").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const connectionRalations = relations(connections, ({ one }) => ({
  connectee: one(user, {
    fields: [connections.connecteeId],
    references: [user.id],
  }),
  connector: one(user, {
    fields: [connections.connectorId],
    references: [user.id],
  }),
}));
