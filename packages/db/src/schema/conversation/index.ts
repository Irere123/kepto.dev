import { sql } from "drizzle-orm";
import { pgTable, uuid } from "drizzle-orm/pg-core";

const conversation = pgTable("conversations", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
});
