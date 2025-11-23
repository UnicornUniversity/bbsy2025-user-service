import { MongoClient } from "mongodb";

const DATABASE_URL = "mongodb://localhost:27018/user-service?directConnection=true";

const client = new MongoClient(DATABASE_URL, {});

await client.connect();

export class UserDao {
  static async create(userObject) {
    try {
      const result = await client
        .db()
        .collection("users")
        .insertOne(userObject);
      return await client
        .db()
        .collection("users")
        .findOne({ _id: result.insertedId });
    } catch (e) {}
  }
}
