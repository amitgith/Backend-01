import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

/**
 * Creates a short-lived access token.
 * @param {{ id: string, email: string }} user
 * @returns {string}
 */
export function createAccessToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, env.accessTokenSecret, {
    expiresIn: "15m",
  });
}

/**
 * Creates a seven-day refresh token.
 * @param {{ id: string, email: string }} user
 * @returns {string}
 */
export function createRefreshToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, env.refreshTokenSecret, {
    expiresIn: "7d",
  });
}

/**
 * Verifies an access token and returns its identity claims.
 * @param {string} token
 * @returns {{ id: string, email: string }}
 */
export function verifyAccessToken(token) {
  return jwt.verify(token, env.accessTokenSecret);
}

/**
 * Verifies a refresh token and returns its identity claims.
 * @param {string} token
 * @returns {{ id: string, email: string }}
 */
export function verifyRefreshToken(token) {
  return jwt.verify(token, env.refreshTokenSecret);
}
