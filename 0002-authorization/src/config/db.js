import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export async function connectdb() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("mongodb connected successfully");
}
