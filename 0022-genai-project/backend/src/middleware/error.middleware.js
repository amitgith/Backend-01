import mongoose from "mongoose";
import { env } from "../config/env.js";
import AppError from "../utils/AppError.js";

/**
 * Converts application, database, and token errors to the standard API shape.
 * @param {Error & Record<string, any>} error
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @returns {void}
 */
export function errorMiddleware(error, req, res, next) {
  let statusCode = 500;
  let message = "Internal server error";
  let errors = [];
  let knownError = false;

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    errors = error.errors;
    knownError = true;
  } else if (error?.code === 11000) {
    const field = Object.keys(error.keyPattern ?? error.keyValue ?? {})[0] ?? "email";
    statusCode = 409;
    message = "A user with this email already exists";
    errors = [{ field, message: "This value is already in use" }];
    knownError = true;
  } else if (error instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = "Invalid request value";
    errors = [{ field: error.path, message: "Invalid value" }];
    knownError = true;
  } else if (
    error?.name === "JsonWebTokenError" ||
    error?.name === "TokenExpiredError" ||
    error?.name === "NotBeforeError"
  ) {
    statusCode = 401;
    message = "Invalid or expired token";
    knownError = true;
  }

  if (!knownError) {
    console.error("Unhandled request error:", error);
  }

  const response = { success: false, message, errors };
  if (env.nodeEnv !== "production") response.stack = error?.stack;
  res.status(statusCode).json(response);
}
