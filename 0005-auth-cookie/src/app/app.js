import express from "express";
import authRoutes from "../routes/auth.route.js";
const app = express();
// middleware
app.use(express.json());
app.get("/api", authRoutes);
app.post("/api/auth/register", authRoutes);
export default app;
