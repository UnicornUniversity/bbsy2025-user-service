import * as argon2 from "argon2";

export class PasswordHandler {
  /**
   * @param {string} password 
   * @returns {Promise<string>} password hash
   */
  static async hashPassword(password) {
    return await argon2.hash(password);
  }

  /**
   * @param {string} hash 
   * @param {string} password 
   * @returns {Promise<boolean>} isValid 
   */
  static async checkPassword(hash, password) {
    return await argon2.verify(hash, password);
  }
}
