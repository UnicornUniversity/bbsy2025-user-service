import jwt from "jsonwebtoken";

const JWT_SECRET = "c3BpbmNlbnRyYWxmaXhzcGVha2JyYXZlZWl0aGVyZHVzdHRoZW9yeXNob3J0ZXJnb3Zlcm5tZW50c";
const JWT_EXPIRY = 1800; // in seconds

export class JwtService {
  /**
   * @param {{ id: string, email: string, name: string }} userInfo
   * @returns {string} jwt 
   */
  static createJwt(userInfo) {
    return jwt.sign(userInfo, JWT_SECRET, { issuer: "user-service", subject: userInfo.id, expiresIn: JWT_EXPIRY });
  }

  static verifyJwt(str) {
    return jwt.verify(str, JWT_SECRET, { complete: false });
  }
}