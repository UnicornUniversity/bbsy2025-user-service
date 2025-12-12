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

  async findOne(filter) {
    const col = await this.getCollection();
    return await col.findOne(filter);
  }

  async list(filter, pageInfo) {
    const pageSize = pageInfo?.pageSize ?? 1000;
    const pageIndex = pageInfo?.pageIndex ?? 0;

    const col = await this.getCollection();
    const [result] = await col
      .aggregate([
        { $match: filter },
        {
          $facet: {
            itemList: [{ $skip: pageSize * pageIndex }, { $limit: pageSize }],
            pageInfo: [{ $count: "total" }],
          },
        },
      ])
      .toArray();

    const {
      itemList,
      pageInfo: [{ total }],
    } = result;

    return {
      itemList,
      pageInfo: {
        pageSize,
        pageIndex,
        total,
      },
    };
  }

  async getCollection() {
    return await getCollection(this.collectionName);
  }
}
