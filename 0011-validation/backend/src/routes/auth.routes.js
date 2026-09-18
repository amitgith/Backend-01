import express from "express";
import { apiController, registerApiController } from "../controller/auth.controller.js";
const router = express.Router();
router.get("/api", apiController);
// register
router.post("/register",registerApiController)
export default router;
