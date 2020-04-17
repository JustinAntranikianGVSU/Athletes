
class ServiceError {

  constructor(errorMessage, fieldName = null) {
    this.errorMessage = errorMessage
    this.fieldName = fieldName
  }
}

class ResultContext {

  constructor(value, serviceErrors) {
    this.value = value
    this.serviceErrors = serviceErrors || []
  }

  hasErrors = () => this.serviceErrors.length > 0
}

module.exports = { ServiceError, ResultContext }
