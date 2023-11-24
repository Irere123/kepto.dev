import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "../user";
import { connections } from "../connections";

export const message = pgTable("messages", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  text: text("text"),
  userId: uuid("userId")
    .notNull()
    .references(() => user.id),
  connectionId: uuid("connectionId")
    .notNull()
    .references(() => connections.id),
  receiverId: uuid("receiverId")
    .notNull()
    .references(() => user.id),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const Message = message.$inferSelect;
