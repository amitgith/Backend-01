import mongoose from "mongoose";
import { env } from "./env.js";

/**
 * Connects to the configured MongoDB instance.
 * @returns {Promise<typeof mongoose>}
 */
export async function connectDatabase() {
  return mongoose.connect(env.mongoUri);
}
