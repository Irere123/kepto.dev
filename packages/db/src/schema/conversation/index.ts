import { sql } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { connections } from "../connection";

export const conversation = pgTable("conversations", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  connectionId: uuid("connectionId")
    .notNull()
    .references(() => connections.id),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow(),
});
