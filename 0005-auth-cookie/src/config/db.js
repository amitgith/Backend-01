import mongooose from "mongoose";
import config from "../config/config.js";
export async function connectToDB() {
  try {
    await mongooose.connect(config.MONGO_URI);
    console.log("Mongodb is connected");
  } catch (error) {
    console.log(error.message);
  }
}
