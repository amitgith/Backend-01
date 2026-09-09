import express from "express";
import appRoutes from "../routes/auth.route.js";
import cookieParser from "cookie-parser";
const app = express();
// middleware
app.use(express.json());
// cookie-parser middleare
app.use(cookieParser());
app.use("/", appRoutes);
app.use("/api/auth", appRoutes);
export default app;
