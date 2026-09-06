import express from "express";
import {
  aboutMeApiController,
  apiController,
  loginApiController,
  registerApiController,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
const router = express.Router();
router.get("/api", apiController);
router.post("/register", registerApiController);
router.get("/me", authenticate, aboutMeApiController);
router.post("/login", loginApiController);
export default router;
