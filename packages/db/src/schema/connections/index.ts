import { relations, sql } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "../user";

export const connections = pgTable("connections", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  connectorId: uuid("connectorId").notNull(),
  connecteeId: uuid("connecteeId").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const connectionRalations = relations(connections, ({ one }) => ({
  connectee: one(user, {
    fields: [connections.connecteeId],
    references: [user.id],
  }),
  connector: one(user, {
    fields: [connections.connectorId],
    references: [user.id],
  }),
}));

export type Connection = typeof user.$inferSelect;
export type NewConnnection = typeof user.$inferInsert;
