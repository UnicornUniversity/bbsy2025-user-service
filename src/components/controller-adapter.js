export const adaptAbl = (ablFn) => async (req, res, next) => {
  try {
    const result = await ablFn(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
}; 