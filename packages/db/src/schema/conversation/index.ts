import { sql } from "drizzle-orm";
import { boolean, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "../user";

export const conversation = pgTable("conversations", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId1: uuid("userId1")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  userId2: uuid("userId2")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  read1: boolean("read1").default(false),
  read2: boolean("read2").default(false),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow(),
});
