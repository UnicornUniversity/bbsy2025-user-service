export const adaptAbl = (ablFn) => async (req, res, next) => {
  const useCaseContext = {
    identity: req.identity,
    authorization: req.authorization,
  }

  try {
    const result = await ablFn(req.body ?? req.query, useCaseContext);
    res.json(result);
  } catch (err) {
    next(err);
  }
}; 