class ErrorHandlerService extends Error {
  constructor(message, code, statusCode, innerError) {
    statusCode = typeof statusCode !== undefined ? statusCode : 500;
    innerError = typeof innerError !== undefined ? innerError : null;
    super(message);
    super.name = "Service Error";
    if (innerError && innerError.stack) {
      super.stack = innerError.stack;
    }
    this.code = code;
    this.statusCode = statusCode;
    this.techErrorMessage = innerError && innerError.message;
  }
}

module.exports = ErrorHandlerService;
