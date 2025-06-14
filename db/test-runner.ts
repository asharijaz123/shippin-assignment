import {
  createTable,
  createUsers,
  getUserById,
  getUsers,
  updateUserById,
  updateUsers,
  deleteUserById,
  deleteUsers,
} from "../db/users-service";

async function runTests() {
  console.log("🧪 Starting DB test runner...");

  // 0. Setup
  await createTable();
  console.log("✅ Table ensured.");

  // 1. Create multiple users
  await createUsers([
    { name: "Ashar", email: "ashar@example.com" },
    { name: "Talha", email: "talha@example.com" },
    { name: "Ali", email: "ali@example.com" },
    { name: "Talha", email: "talha.2@example.com" },
  ]);
  console.log("✅ Created users.");

  // 2. Get users
  const allUsers = await getUsers();
  console.log("📦 All users:", allUsers);

  // 3. Get user by ID
  const userById = await getUserById(allUsers[0].id);
  console.log("🔍 Get by ID:", userById);

  // 4. Get users by filter (AND)
  const andFiltered = await getUsers({
    name: "Talha",
    email: "talha@example.com",
    useOrOperator: false,
  });
  console.log("🔎 Get users (AND):", andFiltered);

  // 5. Get users by filter (OR)
  const orFiltered = await getUsers({
    name: "Ali",
    email: "nonexistent@example.com",
    useOrOperator: true,
  });
  console.log("🔎 Get users (OR):", orFiltered);

  // 6. Update single user
  const targetId = allUsers[2].id;
  await updateUserById(targetId, { name: "Ali Updated" });
  console.log(`✅ Updated user ${targetId} by ID.`);

  // 7. Update multiple users (OR)
  await updateUsers(
    { name: "Talha OR Updated" },
    { name: "Talha", useOrOperator: true }
  );
  const afterMultiUpdateOr = await getUsers({ name: "Talha OR Updated" });
  console.log("🔁 Users after OR update:", afterMultiUpdateOr);

  // 8. Update multiple users (AND) — No-op example
  await updateUsers(
    { name: "No Match Update" },
    { name: "Ali Updated", email: "wrong@email.com", useOrOperator: false }
  );
  console.log("⚠️ AND update (no match) — should not affect data.");

  // 9. Delete single user
  await deleteUserById(allUsers[0].id);
  console.log(`🗑️ Deleted user ${allUsers[0].id}`);

  // 10. Delete multiple users (AND)
  await deleteUsers({
    name: "Ali Updated",
    email: "ali@example.com",
    useOrOperator: false,
  });
  console.log("🗑️ Delete with AND complete");

  // 11. Delete multiple users (OR)
  await deleteUsers({ name: "Talha OR Updated", useOrOperator: true });
  console.log("🗑️ Delete with OR complete");

  // 12. Final check
  const finalUsers = await getUsers();
  console.log("📦 Final users:", finalUsers);
}

runTests()
  .then(() => {
    console.log("✅ DB tests complete.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ DB test runner failed:", err);
    process.exit(1);
  });
