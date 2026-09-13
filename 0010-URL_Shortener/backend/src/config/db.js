import mongoose from "mongoose";
import config from "./config.js";
export async function connectToDb() {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("Mongodb is connected");
  } catch (error) {
    console.log(error.message);
  }
}
