import { EndpointError } from "../common.js";

const ERROR_PREFIX = `user-service/user/get/`;

export class Unauthorized extends EndpointError {
  constructor(params) {
    super(
      `${ERROR_PREFIX}unauthorized`,
      "This user is not authorized to request specific users. Only admins may request users other than themselves.",
      403,
      params
    );
  }
}

export class UserDoesNotExist extends EndpointError {
  constructor(params) {
    super(
      `${ERROR_PREFIX}userDoesNotExist`,
      "User with this id does not exist.",
      404,
      params
    );
  }
}
