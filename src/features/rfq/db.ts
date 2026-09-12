import "server-only";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "@/features/rfq/schema";

/**
 * Lazy connection. The site builds and runs without DATABASE_URL - nothing
 * outside the RFQ submission path touches the database - so the pool is only
 * created when a submission actually arrives.
 *
 * PostgreSQL runs as its own service. Never inside the website container.
 */
let pool: Pool | undefined;

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export function getDb() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }
  pool ??= new Pool({
    connectionString,
    max: 5,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
  });
  return drizzle(pool, { schema });
}
