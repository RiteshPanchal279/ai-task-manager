// config/database.ts
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../db/schema';
import 'dotenv/config';

// Check if the environment variable exists
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    'DATABASE_URL environment variable is not set. Please check your .env file.'
  );
}

// Create the neon client
const sql = neon(connectionString);

// Create the drizzle instance
export const db = drizzle(sql, { schema });

// Optional: Export the sql client if needed elsewhere
export { sql };