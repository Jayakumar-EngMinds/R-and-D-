const Boom = require("boom");

function showError(errorMessage, statusCode) {
  const err = new Error(errorMessage);
  const boomError = Boom.boomify(err, {
    statusCode,
  });
  throw boomError;
}

module.exports = {
  showError,
};
