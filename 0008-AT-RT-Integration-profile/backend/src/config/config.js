import dotenv from "dotenv";
dotenv.config();
const config = {
  MONGO_URI: process.env.MONGO_URI,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFREH_TOKEN_SECRET: process.env.REFREH_TOKEN_SECRET,
  PORT: process.env.PORT,
};
export default config;
