const ErrorHandlerService = require("./../error-handler/error-handler-service");

var middlewareError = (errPassed, r, results, n) => {
  let _errorObject = {};
  const statusCode = errPassed.statusCode || 500;

  if (errPassed instanceof ErrorHandlerService) {
    _errorObject = {
      message: errPassed.message,
      techErrorMessage: errPassed.techErrorMessage,
      errors: errPassed.errors,
      name: errPassed.name,
      code: errPassed.code
    };
  } else {
    _errorObject = {
      message: errPassed.message || "internal server error",
      name: errPassed.constructor.name || "error",
      code: "server_error"
    };
  }
  results.status(statusCode).send(_errorObject);
};

module.exports = middlewareError;
