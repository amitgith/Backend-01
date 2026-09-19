import express from "express";
import { apiController, registerApiController } from "../controllers/auth.controller.js";
const router = express.Router();
router.get("/api", apiController);
router.post("/register", registerApiController);

export default router;
