import { db } from "../connection";
import { UserFilters } from "./user.types";

export async function deleteUserById(id: number) {
  await db.query("DELETE FROM users WHERE id = $1", [id]);
}

export async function deleteUsers(filters: UserFilters) {
  const { useOrOperator = false, ...conditionsInput } = filters;
  const conditions: string[] = [];
  const values: any[] = [];

  Object.entries(conditionsInput).forEach(([key, val]) => {
    if (val !== undefined) {
      values.push(val);
      conditions.push(`${key} = $${values.length}`);
    }
  });

  if (conditions.length === 0) {
    throw new Error("No filters provided for delete");
  }

  const joiner = useOrOperator ? " OR " : " AND ";
  const whereClause = `WHERE ${conditions.join(joiner)}`;
  const query = `DELETE FROM users ${whereClause}`;

  await db.query(query, values);
}

export async function deleteAllUsers() {
  await db.query("DELETE FROM users");
}
