const asyncWrapper = (fn) => {
  // we get req, res, next params from express by default
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = asyncWrapper;
