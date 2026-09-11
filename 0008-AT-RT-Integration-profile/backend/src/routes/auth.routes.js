import { Router } from "express";
import {
    aboutMeApiController,
  apiController,
  refreshApiController,
  registerApiController,
} from "../controllers/user.controller.js";

const router = Router();
// api call
router.get("/api", apiController);
// register api call
router.post("/register", registerApiController);
// Aboout me api call
router.get("/me",aboutMeApiController)
// refresh api call
router.post("/refresh",refreshApiController)
export default router;
