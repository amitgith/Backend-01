import { Router } from "express";
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
const router = Router();
// Api Controller
router.get("/", apiController);
// Register
router.post("/register", registerValidator, registerApiController);
// Login
router.post("/login", loginValidator, loginApiController);
// refresh
router.post("/refresh", refreshApiController);
// AboutMe
router.get("/me", aboutMeApiController);
export default router;
