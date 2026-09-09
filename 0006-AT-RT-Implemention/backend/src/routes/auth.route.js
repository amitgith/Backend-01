import { Router } from "express";
import {
  aboutMeApiController,
  apiController,
  loginApiController,
  registerApiController,
} from "../controllers/user.controller.js";

const router = Router();
router.get("/api", apiController);
router.post("/register", registerApiController);
router.get("/me", aboutMeApiController);
router.post("/login", loginApiController);
export default router;
