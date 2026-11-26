import axios from "axios";

const client = axios.create({
  baseURL: "/api/v1/auth",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

const unwrap = (response) => response.data.data;

/**
 * Registers a Downbot account.
 * @param {{ name: string, email: string, password: string }} credentials
 * @returns {Promise<{ user: object, accessToken: string }>}
 */
export async function registerApi(credentials) {
  return unwrap(await client.post("/register", credentials));
}

/**
 * Logs in to an existing Downbot account.
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{ user: object, accessToken: string }>}
 */
export async function loginApi(credentials) {
  return unwrap(await client.post("/login", credentials));
}

/**
 * Restores a session and rotates the httpOnly refresh cookie.
 * @returns {Promise<{ user: object, accessToken: string }>}
 */
export async function refreshApi() {
  return unwrap(await client.post("/refresh"));
}

/**
 * Loads the current user's public profile with an access token.
 * @param {string} accessToken
 * @returns {Promise<{ user: object }>}
 */
export async function getCurrentUserApi(accessToken) {
  return unwrap(
    await client.get("/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    }),
  );
}

/**
 * Invalidates the current refresh session and clears its cookie.
 * @returns {Promise<object>}
 */
export async function logoutApi() {
  return unwrap(await client.post("/logout"));
}
