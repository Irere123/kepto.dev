import { sql } from "drizzle-orm";
import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { circle } from "../circle";
import { user } from "../user";

export const thread = pgTable("thread", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  body: text("body"),
  title: text("title"),
  circleId: uuid("circleId")
    .notNull()
    .references(() => circle.id),
  userId: uuid("userId")
    .notNull()
    .references(() => user.id),
  messageCount: integer("messageCount").default(0),
  reactionCount: integer("reactionCount").default(0),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow(),
});

export const threadReaction = pgTable("thread_reactions", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  type: text("type"),
  score: integer("score").default(0),
  userId: uuid("userId")
    .notNull()
    .references(() => user.id),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow(),
});

export const threadMessage = pgTable("thread_messages", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  text: text("text"),
  senderId: uuid("senderId")
    .notNull()
    .references(() => user.id),
  threadId: uuid("threadId")
    .notNull()
    .references(() => thread.id),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow(),
});
