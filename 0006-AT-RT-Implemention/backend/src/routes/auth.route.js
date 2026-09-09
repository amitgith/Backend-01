import { Router } from "express";
import {
  aboutMeApiController,
  apiController,
  registerApiController,
} from "../controllers/user.controller.js";

const router = Router();
router.get("/api", apiController);
router.post("/register", registerApiController);
router.get("/me", aboutMeApiController);
export default router;
