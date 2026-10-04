import { Router } from "express";
import {
  aboutMeApiController,
  apiController,
  loginApiController,
  logoutApiController,
  refreshApiController,
  registerApiController,
} from "../controllers/auth.controller.js";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator.js";
import { authenticate } from "../middleware/auth.middleware.js";
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
router.get("/me", authenticate, aboutMeApiController);
// logout
router.post("/logout", authenticate, logoutApiController);
export default router;
