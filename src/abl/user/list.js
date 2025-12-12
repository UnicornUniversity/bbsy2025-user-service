import { userListDtoInSchema } from "../../api/validation-types/user/list.js";
import { Validator } from "../../components/validator.js";
import { userDao } from "../../dao/user-dao.js";

export async function userListHandler(unsafeDtoIn) {
  const dtoIn = Validator.validateDtoIn(userListDtoInSchema, unsafeDtoIn);

  return await userDao.list(dtoIn.pageInfo);
}
