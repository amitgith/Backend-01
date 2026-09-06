import express from "express";
import authRoutes from "../routes/auth.route.js";
import cookieParser from "cookie-parser";
const app = express();
// middleware
app.use(express.json());
app.use(cookieParser());
app.use("/", authRoutes);
app.use("/api/auth", authRoutes);
export default app;
