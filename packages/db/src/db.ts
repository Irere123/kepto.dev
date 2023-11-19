import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import { isProd } from "./constants";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL as string,
});

export const db = drizzle(pool, { schema, logger: !isProd });
