import jwt from "jsonwebtoken";
import { EndpointError } from "../api/errors/common.js";
import { JwtService } from "./jwt-service.js";

const AUTHORIZATION_HEADER = "authorization";
const BEARER_TOKEN_REGEX = /^Bearer (.+)$/;

class UnsupportedToken extends EndpointError {
  constructor() {
    super(
      "unsupportedToken",
      "The provided token is not supported. This application only supports Bearer tokens provided in the Authorization header.",
      401
    );
  }
}

class InvalidToken extends EndpointError {
  constructor() {
    super("invalidToken", "The provided token is not valid.", 401);
  }
}

class ExpiredToken extends EndpointError {
  constructor() {
    super("expiredToken", "The provided token is expired.", 401);
  }
}

export function jwtHandler(req, res, next) {
  const tokenHeader = req.header(AUTHORIZATION_HEADER);
  if (!tokenHeader) {
    req.identity = Identity.anonymousIdentity;
    return next();
  }

  if (!BEARER_TOKEN_REGEX.test(tokenHeader)) {
    throw new UnsupportedToken();
  }

  const [, token] = BEARER_TOKEN_REGEX.exec(tokenHeader);
  let tokenPayload;
  try {
    tokenPayload = JwtService.verifyJwt(token);
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      throw new ExpiredToken();
    }
    throw new InvalidToken();
  }

  const { email, id, name } = tokenPayload;
  if (!email || !id || !name) {
    throw new InvalidToken();
  }

  req.identity = new Identity({
    email,
    id,
    name,
    token: tokenPayload,
  });
  return next();
}

class Identity {
  contructor({ email, id, name, token }) {
    this.email = email;
    this.id = id;
    this.name = name;
    this.token = token;
  }

  static get anonymous() {
    return anonymousIdentity;
  }
}

const anonymousIdentity = new Identity({
  email: "",
  id: "0".repeat(24),
  name: "anonymous",
  token: null,
});
