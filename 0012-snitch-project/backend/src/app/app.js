import express from "express";
import appRoutes from "../routes/user.routes.js";
const app = express();
// middeware
app.use(express.json());
app.use("/", appRoutes);
export default app;
