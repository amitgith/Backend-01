import { Router } from "express";
import {
  login,
  logout,
  me,
  refresh,
  register,
} from "../controller/auth.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";

const router = Router();

router.post("/register", registerValidator, validate, asyncHandler(register));
router.post("/login", loginValidator, validate, asyncHandler(login));
router.post("/refresh", asyncHandler(refresh));
router.post("/logout", asyncHandler(logout));
router.get("/me", asyncHandler(requireAuth), me);

export default router;
