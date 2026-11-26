/**
 * Represents a known failure that should be returned to an API client.
 */
export default class AppError extends Error {
  /**
   * Creates an operational API error.
   * @param {number} statusCode
   * @param {string} message
   * @param {Array<{ field: string, message: string }>} [errors]
   */
  constructor(statusCode, message, errors = []) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = true;
    Error.captureStackTrace?.(this, AppError);
  }
}
