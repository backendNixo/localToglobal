
class APIError {
  constructor( message="error", statusCode) {
    this.data = null,
    this.message = message;
    this.error = statusCode>=400,
    this.statusCode=statusCode
  }
}

export default APIError ;
