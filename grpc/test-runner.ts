import { everythingClient } from "./grpc-client";

interface Body {
  name: string;
}
interface MessageWithBody {
  id: string;
  data: Body;
}

// --- Create via CreateBody
function createBody(): Promise<any> {
  return new Promise((res, rej) => {
    everythingClient.CreateBody(
      {
        string_value: "hello",
        single_nested: { a_string: "nested create", amount: 42, ok: true },
      },
      (e, r) => (e ? rej(e) : res(r))
    );
  });
}

// --- "Read" via GetMessageWithBody
function getMessage(): Promise<any> {
  return new Promise((res, rej) => {
    const payload: MessageWithBody = {
      id: "sample",
      data: { name: "read-test" },
    };
    everythingClient.GetMessageWithBody(payload, (e, r) =>
      e ? rej(e) : res(r)
    );
  });
}

// --- "Update" via PostWithEmptyBody
function postWithEmptyBody(): Promise<any> {
  return new Promise((res, rej) => {
    const b: Body = { name: "updated-name" };
    everythingClient.PostWithEmptyBody(b, (e, r) => (e ? rej(e) : res(r)));
  });
}

// --- "Delete" simulation via NoBindings
function noBindings(): Promise<any> {
  return new Promise((res, rej) => {
    everythingClient.NoBindings({}, (e, r) => (e ? rej(e) : res(r)));
  });
}

async function runCrudSim() {
  try {
    console.log("🟢 CreateBody...");
    const createRes = await createBody();
    console.log("✅ Created:", createRes);

    console.log("🔍 GetMessageWithBody...");
    const readRes = await getMessage();
    console.log("✅ Read:", readRes);

    console.log("✏️ PostWithEmptyBody (update)...");
    await postWithEmptyBody();
    console.log("✅ Updated via PostWithEmptyBody");

    console.log("🎉 CRUD-like operations completed.");
  } catch (err: any) {
    console.error("❌ Error during CRUD flow:");
    console.error("Code:", err.code);
    console.error("Details:", err.details || err.message);
  }
}

runCrudSim();
