const ErrorHandlerService = require("./error-handler-service");

class ErrorHandlerValidation extends ErrorHandlerService {
  constructor(errors) {
    super("Validation Error", "VALIDATION_ERROR", 400);
    super.name = "Validation Error";
    this.errors = errors || [];
  }
}

module.exports = ErrorHandlerValidation;
