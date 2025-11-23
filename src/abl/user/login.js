import { Validator } from "../../components/validator.js";
import { userLoginDtoInSchema } from "../../api/validation-types/user/login.js";
import { PasswordHandler } from "../../components/password-handler.js";
import { UserDao } from "../../dao/user-dao.js";

export async function userLoginHandler(unsafeDtoIn) {
  const dtoIn = Validator.validateDtoIn(userLoginDtoInSchema, unsafeDtoIn);

  const { password, ...userProperties } = dtoIn;

  const passwordHash = await PasswordHandler.hashPassword(password);

  const userObject = {
    ...userProperties,
    passwordHash,
  };

  const createdUser = await UserDao.create(userObject);

  return dtoIn;
}