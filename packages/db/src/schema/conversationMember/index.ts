import { sql } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "../user";
import { conversation } from "../conversation";

export const conversationMember = pgTable("conversation_members", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),

  userId: uuid("userId1")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  conversationId: uuid("conversationId")
    .notNull()
    .references(() => conversation.id),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow(),
});
