import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { fileURLToPath } from "url";

// ✅ Get __dirname for ESM support
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Path to your main .proto file
const PROTO_PATH = path.resolve(__dirname, "./proto/a_bit_of_everything.proto");

const GOOGLE_PROTO_DIR = path.resolve(
  __dirname,
  "../node_modules/google-proto-files/google"
);

// ✅ Load the proto with all required includeDirs
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  includeDirs: [
    path.resolve(__dirname, "./proto"), // a_bit_of_everything.proto
    path.resolve(__dirname, "./proto/examples"), // sub/, sub2/ folders
    path.resolve(__dirname, "../node_modules/google-proto-files"),
  ],
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

// ✅ Load as gRPC service
const grpcObj = grpc.loadPackageDefinition(packageDefinition);

// ✅ Export your gRPC client for ABitOfEverythingService
export const everythingClient = new (
  grpcObj as any
).grpc.gateway.examples.examplepb.ABitOfEverythingService(
  "grpcb.in:9001",
  grpc.credentials.createSsl(),
);
