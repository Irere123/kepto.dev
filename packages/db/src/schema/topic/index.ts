import { sql } from "drizzle-orm";
import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { circle } from "../circle";
import { user } from "../user";

export const topic = pgTable("topics", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  circleId: uuid("circleId")
    .notNull()
    .references(() => circle.id),
  creatorId: uuid("creatorId")
    .notNull()
    .references(() => user.id),
  isPrivate: boolean("isPrivate").default(false),
  slug: text("slug").notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow(),
});

export const topicMember = pgTable("topic_members", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  topicId: uuid("topicId")
    .notNull()
    .references(() => topic.id),
  userId: uuid("userId")
    .notNull()
    .references(() => user.id),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow(),
});

export type Topic = typeof topic.$inferSelect;
export type TopicMember = typeof topic.$inferSelect;
