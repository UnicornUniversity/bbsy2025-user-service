import { MongoClient } from "mongodb";

const DATABASE_URL =
  "mongodb://localhost:27018/user-service?directConnection=true";

const client = new MongoClient(DATABASE_URL, {
  serverSelectionTimeoutMS: 5000, // 5 second timeout
  connectTimeoutMS: 5000,
  socketTimeoutMS: 5000,
});

let connectionPromise = null;

async function ensureConnected() {
  if (!connectionPromise) {
    connectionPromise = client.connect().catch((err) => {
      connectionPromise = null; // Reset on error so we can retry
      throw err;
    });
  }
  return connectionPromise;
}

export async function getCollection(name) {
  await ensureConnected();
  return client.db().collection(name);
}

export class DuplicateKeyError extends Error {}

export class MongoDao {
  constructor(collectionName) {
    this.collectionName = collectionName;
  }

  async insertOne(document) {
    const col = await this.getCollection();
    try {
      return await col.insertOne(document);
    } catch (e) {
      if (e?.code === 11000) {
        throw new DuplicateKeyError(e);
      }
      throw e;
    }
  }

  async getCollection() {
    return await getCollection(this.collectionName);
  }
}
