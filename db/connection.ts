import { Pool } from "pg";

export const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mydatabase",
  password: "mypassword",
  port: 5432,
});
