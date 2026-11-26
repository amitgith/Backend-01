import { validationResult } from "express-validator";
import AppError from "../utils/AppError.js";

/**
 * Rejects requests that failed their preceding express-validator chains.
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @throws {AppError} When one or more request fields are invalid.
 */
export function validate(req, res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const fieldErrors = result.array().map((error) => ({
      field: error.path,
      message: error.msg,
    }));
    throw new AppError(422, "Validation failed", fieldErrors);
  }
  next();
}
