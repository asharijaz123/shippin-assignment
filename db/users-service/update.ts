import { db } from "../connection";
import { UserFilters } from "./user.types";

export async function updateUserById(
  id: number,
  updates: Omit<UserFilters, "useOrOperator">
) {
  const updatesList: string[] = [];
  const values: any[] = [];

  Object.entries(updates).forEach(([key, val]) => {
    values.push(val);
    updatesList.push(`${key} = $${values.length}`);
  });

  if (updatesList.length === 0) {
    throw new Error("No fields to update");
  }

  values.push(id);
  const query = `UPDATE users SET ${updatesList.join(", ")} WHERE id = $${
    values.length
  }`;
  await db.query(query, values);
}

export async function updateUsers(
  updates: Omit<UserFilters, "useOrOperator">,
  filters: UserFilters
) {
  const updateList: string[] = [];
  const conditions: string[] = [];
  const values: any[] = [];

  // 1. Set fields to update
  Object.entries(updates).forEach(([key, val]) => {
    if (val !== undefined) {
      values.push(val);
      updateList.push(`${key} = $${values.length}`);
    }
  });

  if (updateList.length === 0) {
    throw new Error("No fields to update");
  }

  // 2. Set filters
  const { useOrOperator = false, ...filterFields } = filters;

  Object.entries(filterFields).forEach(([key, val]) => {
    if (val !== undefined) {
      values.push(val);
      conditions.push(`${key} = $${values.length}`);
    }
  });

  if (conditions.length === 0) {
    throw new Error("No filters provided — this would update ALL users");
  }

  const joiner = useOrOperator ? " OR " : " AND ";
  const whereClause = `WHERE ${conditions.join(joiner)}`;
  const query = `UPDATE users SET ${updateList.join(", ")} ${whereClause}`;

  await db.query(query, values);
}
