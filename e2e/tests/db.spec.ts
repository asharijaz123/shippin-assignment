import { test, expect } from "@playwright/test";
import {
  createTable,
  createUsers,
  getUserById,
  getUsers,
  updateUserById,
  updateUsers,
  deleteUserById,
  deleteUsers,
  deleteAllUsers,
} from "../../db/users-service";

test.describe("testing db crud operations", () => {
  let createdUsers: any[] = [];
  test.beforeAll(async () => {
    await createTable();
    await deleteAllUsers();

    await createUsers([
      { name: "Ashar", email: "ashar@example.com" },
      { name: "Talha", email: "talha@example.com" },
      { name: "Ali", email: "ali@example.com" },
      { name: "Talha", email: "talha.2@example.com" },
    ]);

    createdUsers = await getUsers();
  });

  test.only("TC04 - Scenario A - Get all users", async () => {
    const users = await getUsers();
    expect(users.length).toBeGreaterThanOrEqual(4);
  });

  test.only("TC04 - Scenario B - Get user by ID", async () => {
    const user = await getUserById(createdUsers[0].id);
    expect(user?.email).toBe("ashar@example.com");
  });

  test.only("TC04 - Scenario C - Filter users with AND operator", async () => {
    const users = await getUsers({
      name: "Talha",
      email: "talha@example.com",
      useOrOperator: false,
    });
    expect(users.length).toBe(1);
  });

  test.only("TC04 - Scenario D - Filter users with OR operator", async () => {
    const users = await getUsers({
      name: "Ali",
      email: "nonexistent@example.com",
      useOrOperator: true,
    });
    expect(users.length).toBe(1);
    expect(users[0].name).toBe("Ali");
  });

  test.only("TC04 - Scenario E - Update single user by ID", async () => {
    const targetId = createdUsers[2].id;
    await updateUserById(targetId, { name: "Ali Updated" });
    const updatedUser = await getUserById(targetId);
    expect(updatedUser?.name).toBe("Ali Updated");
  });

  test.only("TC04 - Scenario E - Update multiple users with OR operator", async () => {
    await updateUsers(
      { name: "Talha OR Updated" },
      { name: "Talha", useOrOperator: true }
    );
    const updated = await getUsers({ name: "Talha OR Updated" });
    expect(updated.length).toBe(2);
  });

  test.only("TC04 - Scenario F - Update multiple users with AND operator (no match)", async () => {
    await updateUsers(
      { name: "No Match Update" },
      { name: "Ali Updated", email: "wrong@email.com", useOrOperator: false }
    );
    const unchanged = await getUsers({ name: "No Match Update" });
    expect(unchanged.length).toBe(0);
  });

  test.only("TC04 - Scenario G - Delete single user by ID", async () => {
    await deleteUserById(createdUsers[0].id);
    const deleted = await getUserById(createdUsers[0].id);
    expect(deleted).toBeNull();
  });

  test.only("TC04 - Scenario H - Delete users with AND operator", async () => {
    await deleteUsers({
      name: "Ali Updated",
      email: "ali@example.com",
      useOrOperator: false,
    });
    const users = await getUsers({ name: "Ali Updated" });
    expect(users.length).toBe(0);
  });

  test.only("TC04 - Scenario I - Delete users with OR operator", async () => {
    await deleteUsers({ name: "Talha OR Updated", useOrOperator: true });
    const users = await getUsers({ name: "Talha OR Updated" });
    expect(users.length).toBe(0);
  });

  test.only("TC04 - Scenario J - Final DB check", async () => {
    const users = await getUsers();
    expect(users.length).toBe(0);
  });
});
