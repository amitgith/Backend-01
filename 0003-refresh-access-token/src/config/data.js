import mongoose from "mongoose";
import config from "../config/config.js";
export async function connectdb() {
  await mongoose.connect(config.MONGO_URI);
  console.log("Mongodb connected successfully");
}
