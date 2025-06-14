import { db } from "../connection";
import { UserFilters } from "./user.types";

export async function getUserById(id: number) {
  const query = "SELECT * FROM users WHERE id = $1";
  const res = await db.query(query, [id]);

  return res.rows[0] || null;
}

export async function getUsers(filters: UserFilters = {}) {
  const conditions: string[] = [];
  const values: any[] = [];

  const { useOrOperator, ...dbFilters } = filters;

  Object.entries(dbFilters).forEach(([key, val]) => {
    if (val !== undefined) {
      values.push(val);
      conditions.push(`${key} = $${values.length}`);
    }
  });

  let whereClause = "";
  if (conditions.length > 0) {
    const joiner = filters.useOrOperator ? " OR " : " AND ";
    whereClause = `WHERE ${conditions.join(joiner)}`;
  }

  const query = `SELECT * FROM users ${whereClause}`;
  const res = await db.query(query, values);
  return res.rows;
}
