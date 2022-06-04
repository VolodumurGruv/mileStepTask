class ExpressError extends Error {
  constructor(text, statusCode) {
      super();
      this.text = text;
      this.statusCode = statusCode;
  }
}

module.exports = ExpressError;
