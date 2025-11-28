import { Validator } from "../../components/validator.js";
import { userRegisterDtoInSchema } from "../../api/validation-types/user/register.js";
import { PasswordHandler } from "../../components/password-handler.js";
import { userDao } from "../../dao/user-dao.js";
import { DuplicateKeyError } from "../../dao/mongo-dao.js";
import { UserAlreadyExists } from "../../api/errors/user/register.js";

export async function userRegisterHandler(unsafeDtoIn) {
  const dtoIn = Validator.validateDtoIn(userRegisterDtoInSchema, unsafeDtoIn);

  const { password, ...userProperties } = dtoIn;

  const passwordHash = await PasswordHandler.hashPassword(password);

  const userObject = {
    ...userProperties,
    passwordHash,
  };

  let createdUser;
  try {
    createdUser = await userDao.create(userObject);
  } catch (e) {
    if (e instanceof DuplicateKeyError) {
      throw new UserAlreadyExists({ email: userObject.email });
    }
    throw e;
  }

  return createdUser;
}
