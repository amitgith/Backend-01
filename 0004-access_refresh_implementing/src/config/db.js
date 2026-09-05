import mongoose from "mongoose";
import config from "../config/config.js";
export async function connectToDB() {
  await mongoose.connect(config.MONGO_URI);
  console.log("Mongodb is connected");
}
