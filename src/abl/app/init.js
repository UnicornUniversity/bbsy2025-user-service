import { userDao } from "../../dao/user-dao.js";

export async function appInitHandler(unsafeDtoIn) {
  await userDao.createSchema();
}