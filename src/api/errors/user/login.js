import { EndpointError } from "../common.js";

const ERROR_PREFIX = `user-service/user/login/`;

export class InvalidCredentials extends EndpointError {
  constructor(params = {}) {
    super(
      `${ERROR_PREFIX}invalidCredentials`,
      "This combination of email and password is not valid.",
      400,
      params
    );
  }
}
