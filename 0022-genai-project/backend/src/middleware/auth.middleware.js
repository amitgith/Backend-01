import { findUserById } from "../DAO/user.dao.js";
import AppError from "../utils/AppError.js";
import { verifyAccessToken } from "../utils/jwt.js";

/**
 * Authenticates a bearer access token and loads its current user.
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @returns {Promise<void>}
 */
export async function requireAuth(req, res, next) {
  const authorization = req.get("authorization");
  if (!authorization?.startsWith("Bearer ")) {
    throw new AppError(401, "Authentication required");
  }

  const token = authorization.slice("Bearer ".length).trim();
  if (!token) throw new AppError(401, "Authentication required");

  const claims = verifyAccessToken(token);
  if (!claims || typeof claims !== "object" || typeof claims.id !== "string") {
    throw new AppError(401, "Invalid access token");
  }

  const user = await findUserById(claims.id);
  if (!user) throw new AppError(401, "Invalid access token");

  req.user = user;
  next();
}
