import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { config } from "../config";

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(config.database.url, { prepare: false });
export const db = drizzle(client, { schema });

