import express from "express";
import appRoutes from "../routes/auth.routes.js";
import cookieParser from "cookie-parser";
const app = express();
// middleware
app.use(express.json());
// cookie middleware
app.use(cookieParser());
app.use("/", appRoutes);
app.use("/api/auth", appRoutes);
export default app;
