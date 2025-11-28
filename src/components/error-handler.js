import { EndpointError } from "../api/errors/common.js";

export function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof EndpointError) {
    res.status(err.status);
    res.json({
      message: err.message,
      code: err.code,
      params: err.params,
    });
    return;
  }
  
  res.status(500);
  res.json({
    message: "Internal server error",
    code: "internalServerError",
    params: { error: err.message },
  });
}
