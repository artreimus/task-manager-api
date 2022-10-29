const { CustomAPIError } = require('../errors/customError');

const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(500).json({ msg: 'Something went from, please try again' });
};

module.exports = errorHandler;
