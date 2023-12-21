import { sql } from "drizzle-orm";
import { boolean, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "../user";

export const connections = pgTable("connections", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: uuid("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accepted: boolean("accepted").default(false),
  connectorId: uuid("connectorId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type Connection = typeof connections.$inferSelect;
export type NewConnection = typeof connections.$inferInsert;
