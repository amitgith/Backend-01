import { Router } from "express";
import passport from "../config/passport.js";

const router = Router();

/**
 * @method GET
 * @route /api/auth/google
 * @desc Initiates the Google OAuth flow (redirects to Google)
 * @access Public
 */

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
    prompt: "select_account",
  }),
);
export default router;
