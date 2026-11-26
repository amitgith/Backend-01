/**
 * Sends the standard success response envelope.
 * @param {import("express").Response} res
 * @param {number} statusCode
 * @param {string} message
 * @param {unknown} data
 * @returns {import("express").Response}
 */
export function sendSuccess(res, statusCode, message, data) {
  return res.status(statusCode).json({ success: true, message, data });
}
