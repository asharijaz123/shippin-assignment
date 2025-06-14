import { db } from "../connection";
import { UserInput } from "./user.types";

export async function createUsers(users: UserInput[]) {
  const values: any[] = [];
  const placeholders: string[] = [];

  users.forEach((user, i) => {
    values.push(user.name, user.email);
    const offset = i * 2;
    placeholders.push(`($${offset + 1}, $${offset + 2})`);
  });

  const query = `INSERT INTO users(name, email) VALUES ${placeholders.join(
    ", "
  )}`;
  await db.query(query, values);
}
