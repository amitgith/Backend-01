import AppError from "../utils/AppError.js";

/**
 * Forwards unmatched routes to the centralized error handler.
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @throws {AppError} Always, with HTTP 404.
 */
export function notFoundMiddleware(req, res, next) {
  throw new AppError(404, "Route not found");
}
