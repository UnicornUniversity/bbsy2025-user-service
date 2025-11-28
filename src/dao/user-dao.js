import { getCollection, MongoDao } from "./mongo-dao.js";

/**
 * @type {import("mongodb").IndexDescription[]}
 */
const INDEXES = [{ key: { email: 1 }, unique: true, name: "email_1" }];

class UserDao extends MongoDao {
  constructor() {
    super("user");
  }

  async createSchema() {
    const col = await this.getCollection();

    return await col.createIndexes(INDEXES);
  }

  _beforeReturn(dbObject, redact = true) {
    if (!dbObject) {
      return dbObject;
    }

    const { _id, ...rest } = dbObject;

    if (redact) {
      delete rest.passwordHash;
    }

    return {
      id: _id.toString(),
      ...rest,
    };
  }

  async create(userObject) {
    const result = await super.insertOne(userObject);

    return this._beforeReturn({
      ...userObject,
      _id: result.insertedId,
    });
  }

  async getByEmail(email, redact = true) {
    const result = await super.findOne({ email });

    return this._beforeReturn(result, redact);
  }
}

export const userDao = new UserDao();
