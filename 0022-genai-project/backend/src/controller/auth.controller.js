import jwt from "jsonwebtoken";
import {
  clearRefreshToken,
  createUser,
  findUserByEmail,
  findUserByIdWithRefreshToken,
  updateRefreshToken,
} from "../DAO/user.dao.js";
import { env } from "../config/env.js";
import AppError from "../utils/AppError.js";
import { sendSuccess } from "../utils/api-response.js";
import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";

const refreshCookieOptions = {
  httpOnly: true,
  secure: env.nodeEnv === "production",
  sameSite: "strict",
  path: "/api/v1/auth",
};

const toPublicUser = (user) => ({
  id: String(user._id),
  name: user.name,
  email: user.email,
});

const setRefreshCookie = (res, token) => {
  res.cookie("refreshToken", token, {
    ...refreshCookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

const issueSession = async (user, res, statusCode, message) => {
  const accessToken = createAccessToken({ id: String(user._id), email: user.email });
  const refreshToken = createRefreshToken({ id: String(user._id), email: user.email });
  const updatedUser = await updateRefreshToken(String(user._id), refreshToken);
  if (!updatedUser) throw new AppError(404, "User not found");
  setRefreshCookie(res, refreshToken);
  return sendSuccess(res, statusCode, message, {
    user: toPublicUser(updatedUser),
    accessToken,
  });
};

/**
 * Registers a user and creates an authenticated session.
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<import("express").Response>}
 */
export async function register(req, res) {
  const user = await createUser({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  return issueSession(user, res, 201, "Account created");
}

/**
 * Authenticates credentials and creates a new session.
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<import("express").Response>}
 */
export async function login(req, res) {
  const user = await findUserByEmail(req.body.email);
  if (!user || !(await user.comparePassword(req.body.password))) {
    throw new AppError(401, "Invalid credentials");
  }
  return issueSession(user, res, 200, "Login successful");
}

/**
 * Verifies and rotates the refresh-token cookie and stored token.
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<import("express").Response>}
 */
export async function refresh(req, res) {
  const token = req.cookies?.refreshToken;
  if (!token) throw new AppError(401, "Refresh token required");

  const claims = verifyRefreshToken(token);
  if (!claims || typeof claims !== "object" || typeof claims.id !== "string") {
    throw new AppError(401, "Invalid refresh token");
  }
  const user = await findUserByIdWithRefreshToken(claims.id);
  if (!user || user.refreshToken !== token) {
    throw new AppError(401, "Invalid refresh token");
  }

  return issueSession(user, res, 200, "Session refreshed");
}

/**
 * Invalidates a matching stored refresh token and clears the browser cookie.
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<import("express").Response>}
 */
export async function logout(req, res) {
  const token = req.cookies?.refreshToken;
  if (token) {
    const claims = jwt.decode(token);
    if (
      claims &&
      typeof claims === "object" &&
      typeof claims.id === "string" &&
      /^[a-f\d]{24}$/i.test(claims.id)
    ) {
      const user = await findUserByIdWithRefreshToken(claims.id);
      if (user?.refreshToken === token) await clearRefreshToken(claims.id);
    }
  }

  res.clearCookie("refreshToken", refreshCookieOptions);
  return sendSuccess(res, 200, "Logged out", {});
}

/**
 * Returns the authenticated user's public profile.
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {import("express").Response}
 */
export function me(req, res) {
  return sendSuccess(res, 200, "Profile loaded", { user: toPublicUser(req.user) });
}
