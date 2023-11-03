import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  boolean,
} from "drizzle-orm/pg-core";

export const user = pgTable("users", {
  id: uuid("id").primaryKey(),
  username: text("username").notNull(),
  displayName: text("display_name").notNull(),
  avatarUrl: text("display_name").notNull(),
  email: text("email"),
  tokenVersion: integer("token_version").default(1),
  githubAccessToken: integer("github_access_token"),
  location: text("location"),
  bio: text("location"),
  ip: text("ip"),
  githubId: text("github_id"),
  contributions: text("contributions"),
  online: boolean("online").default(false),
  staff: boolean("online").default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
