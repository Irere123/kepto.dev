import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "../user";
import { follows } from "../connection";

export const connMessage = pgTable("conn_messages", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  text: text("text"),
  senderId: uuid("senderId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  recipientId: uuid("recipientId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  connectionId: uuid("connectionId")
    .notNull()
    .references(() => follows.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const Message = connMessage.$inferSelect;
