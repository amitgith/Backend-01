import express from "express";
import { apiController, registerApiController } from "../controllers/auth.controller.js";
import { registerValidator } from "../validators/auth.validator.js";
const router = express.Router();
router.get("/api", apiController);
router.post("/register",registerValidator, registerApiController);

export default router;
