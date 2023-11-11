import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  port: 5432,
  host: "localhost",
  database: "kepto_dev",
});

export const db = drizzle(pool, { schema });
