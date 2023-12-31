import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "../user";
import { conversation } from "../conversation";

export const convMessage = pgTable("conv_messages", {
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
  conversationId: uuid("conversationId")
    .notNull()
    .references(() => conversation.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const Message = convMessage.$inferSelect;
