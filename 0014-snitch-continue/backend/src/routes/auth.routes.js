import express from "express";
import { apiController, registerApiController } from "../controllers/user.controller.js";
const router = express.Router();
router.get("/", apiController);
router.get("/register", registerApiController);
export default router;
