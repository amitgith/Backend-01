import { Router } from "express";
import {
  aboutMeApiController,
  apiController,
  refreshApiController,
  registerApiController,
} from "../controllers/user.controller.js";

const router = Router();
router.get("/api", apiController);
router.post("/register", registerApiController);
router.get("/me", aboutMeApiController);
router.post("/refresh", refreshApiController);

export default router;
