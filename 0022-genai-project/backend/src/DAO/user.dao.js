import User from "../models/user.model.js";

/**
 * Creates and persists a user.
 * @param {{ name: string, email: string, password: string }} data
 * @returns {Promise<import("mongoose").HydratedDocument<unknown>>}
 */
export async function createUser(data) {
  return User.create(data);
}

/**
 * Finds a user by normalized email, including the password hash for login.
 * @param {string} email
 * @returns {Promise<import("mongoose").HydratedDocument<unknown> | null>}
 */
export async function findUserByEmail(email) {
  return User.findOne({ email }).select("+password");
}

/**
 * Finds a user by identifier.
 * @param {string} id
 * @returns {Promise<import("mongoose").HydratedDocument<unknown> | null>}
 */
export async function findUserById(id) {
  return User.findById(id);
}

/**
 * Finds a user and explicitly includes its stored refresh token.
 * @param {string} id
 * @returns {Promise<import("mongoose").HydratedDocument<unknown> | null>}
 */
export async function findUserByIdWithRefreshToken(id) {
  return User.findById(id).select("+refreshToken");
}

/**
 * Persists the active refresh token for a user.
 * @param {string} id
 * @param {string} refreshToken
 * @returns {Promise<import("mongoose").HydratedDocument<unknown> | null>}
 */
export async function updateRefreshToken(id, refreshToken) {
  return User.findByIdAndUpdate(
    id,
    { refreshToken },
    { new: true, runValidators: true },
  ).select("+refreshToken");
}

/**
 * Invalidates a user's active refresh token.
 * @param {string} id
 * @returns {Promise<import("mongoose").HydratedDocument<unknown> | null>}
 */
export async function clearRefreshToken(id) {
  return User.findByIdAndUpdate(
    id,
    { refreshToken: null },
    { new: true },
  ).select("+refreshToken");
}
