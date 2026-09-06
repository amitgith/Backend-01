import express from "express";
import {
  aboutMeApicontroller,
  apicontroller,
  registerApiController,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
const router = express.Router();
router.get("/api", apicontroller);
router.post("/api/auth/register", registerApiController);
router.get("/api/auth/me", authenticate, aboutMeApicontroller);
export default router;
