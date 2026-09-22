import express from "express";
import {
  apiController,
  loginApiController,
  registerApiController,
} from "../controllers/auth.controller.js";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
const router = express.Router();
router.get("/", apiController);
router.post("/register", registerValidator, registerApiController);
router.post("/login", loginValidator, loginApiController);
export default router;
