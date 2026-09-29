import express from "express";
import {
    aboutMeApiController,
  apiController,
  loginApiController,
  refreshApiController,
  registerApiController,
} from "../controllers/auth.controller.js";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator.js";
import { authenticate } from "../middleware/auth.middleware.js";
const router = express.Router();
router.get("/", apiController);
router.post("/register", registerValidator, registerApiController);
router.post("/login", loginValidator, loginApiController);
router.get("/refresh", refreshApiController);
router.get("/me",authenticate, aboutMeApiController);
export default router;
