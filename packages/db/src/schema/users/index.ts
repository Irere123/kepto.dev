import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("users", {
  id: uuid("id").primaryKey(),
  username: text("username").notNull(),
  displayName: text("display_name").notNull(),
  email: text("email"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
