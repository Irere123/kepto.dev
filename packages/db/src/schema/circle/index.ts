import { sql } from "drizzle-orm";
import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "../user";

export const circle = pgTable("circles", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  githubOrganisationUrl: text("githubOrganisationUrl"),
  website: text("website"),
  ownerId: uuid("ownerId")
    .notNull()
    .references(() => user.id),
  slug: text("slug").notNull(),
  coverPhoto: text("coverPhoto"),
  profilePhoto: text("profilePhoto"),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow(),
});

export const circleMember = pgTable("circle_members", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  circleId: uuid("circleId")
    .notNull()
    .references(() => circle.id),
  userId: uuid("userId")
    .notNull()
    .references(() => user.id),
  admin: boolean("admin").default(false),
  moderator: boolean("moderator").default(false),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow(),
});

export type Circle = typeof circle.$inferSelect;
export type CircleMember = typeof circleMember.$inferSelect;
