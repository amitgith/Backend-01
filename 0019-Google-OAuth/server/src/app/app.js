import express from "express";
import authRoutes from "../routes/auth.routes.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
const app = express();
// middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);
export default app;
