import * as argon2 from "argon2";

export class PasswordHandler {
  static async hashPassword(password) {
    return await argon2.hash(password);
  }

  static async checkPassword(hash, password) {
    return await argon2.verify(hash, password);
  }
}
