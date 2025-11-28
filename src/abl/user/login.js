import { InvalidCredentials } from "../../api/errors/user/login.js";
import { userLoginDtoInSchema } from "../../api/validation-types/user/login.js";
import { Validator } from "../../components/validator.js";
import { userDao } from "../../dao/user-dao.js";
import { PasswordService } from "../../components/password-service.js";
import { JwtService } from "../../components/jwt-service.js";

export async function userLoginHandler(unsafeDtoIn) {
  const dtoIn = Validator.validateDtoIn(userLoginDtoInSchema, unsafeDtoIn);

  const user = await userDao.getByEmail(dtoIn.email, false);
  if (!user) {
    throw new InvalidCredentials();
  }

  const isPasswordCorrect = await PasswordService.checkPassword(
    user.passwordHash,
    dtoIn.password
  );
  if (!isPasswordCorrect) {
    throw new InvalidCredentials();
  }

  const token = JwtService.createJwt({
    id: user.id,
    email: user.email,
    name: user.name,
  });

  return { token };
}
