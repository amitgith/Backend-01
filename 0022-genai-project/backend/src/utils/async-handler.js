/**
 * Forwards rejected async route handlers to Express error middleware.
 * @param {import("express").RequestHandler} handler
 * @returns {import("express").RequestHandler}
 */
export function asyncHandler(handler) {
  return (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
}
