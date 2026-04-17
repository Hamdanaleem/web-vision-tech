import { MongoClient, type MongoClientOptions } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error(
    'Add MONGODB_URI to your environment (e.g. .env.local). Example: MONGODB_URI="mongodb+srv://..."',
  );
}

/** Prefer IPv4 for sockets; helps on some Windows / VPN setups after SRV resolves. */
const clientOptions: MongoClientOptions = { family: 4 };

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, clientOptions);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, clientOptions);
  clientPromise = client.connect();
}

export default clientPromise;
