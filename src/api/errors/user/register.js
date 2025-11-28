import { EndpointError } from "../common.js";

const ERROR_PREFIX = `user-service/user/register/`;

export class UserAlreadyExists extends EndpointError {
  constructor(params) {
    super(`${ERROR_PREFIX}userAlreadyExists`, "A user with this email already exists", 400, params)
  }
}