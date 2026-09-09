import express from "express";
import { apiController } from "../controllers/user.controller.js";

const router = express.Router();
router.use("/api", apiController);
export default router;
