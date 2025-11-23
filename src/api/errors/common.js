export class EndpointError {
  constructor(code, message, status = 400, params = {}) {
    this.code = code;
    this.message = message;
    this.status = status;
    this.params = params;
  }
}

export class InvalidDtoInError extends EndpointError {
  constructor(issues) {
    super("InvalidDtoIn", "The provided dtoIn is not valid.", 400, { issues });
  }
}
