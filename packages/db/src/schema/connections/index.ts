import { sql } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "../user";

export const connections = pgTable("connections", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: uuid("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  connectorId: uuid("connectorId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type Connection = typeof user.$inferSelect;
export type NewConnnection = typeof user.$inferInsert;
