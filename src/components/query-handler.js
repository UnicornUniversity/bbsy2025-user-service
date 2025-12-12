import queryString from "query-string";

export function queryHandler(req, res, next) {
  if (req.method !== "GET") {
    return next();
  }

  if (req.body) {
    return next();
  }

  req.body = queryString.parse(req._parsedUrl.query, {
    arrayFormat: "bracket",
  });

  return next();
}
