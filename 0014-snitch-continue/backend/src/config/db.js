import mongoose from "mongoose";
import config from "./config.js";
export async function connectToDB() {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("MongoDb is connected successfully");
  } catch (error) {
    console.log(error.message);
  }
}
