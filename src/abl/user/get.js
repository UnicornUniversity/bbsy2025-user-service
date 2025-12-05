import { userGetDtoInSchema } from "../../api/validation-types/user/get.js";
import { Validator } from "../../components/validator.js";
import { Profiles } from "../../api/profiles.js";
import { Unauthorized, UserDoesNotExist } from "../../api/errors/user/get.js";
import { userDao } from "../../dao/user-dao.js";

export async function userGetHandler(unsafeDtoIn, useCaseContext) {
  const dtoIn = Validator.validateDtoIn(userGetDtoInSchema, unsafeDtoIn);

  const userProfiles = useCaseContext.authorization.userProfiles;
  const isAdmin = userProfiles.includes(Profiles.admin);
  if (!isAdmin && dtoIn.id) {
    throw new Unauthorized({
      userProfiles,
    });
  }

  const userId = dtoIn.id ?? useCaseContext.identity.id;
  const user = await userDao.getById(userId);
  if (!user) {
    throw new UserDoesNotExist({ userId });
  }

  return { user };
}
