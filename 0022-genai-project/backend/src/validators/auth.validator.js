import { body } from "express-validator";

/**
 * Validates registration fields and normalizes their safe input forms.
 * @type {import("express-validator").ValidationChain[]}
 */
export const registerValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail(),
  body("password")
    .isString()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/^(?=.*[A-Za-z])(?=.*\d).+$/)
    .withMessage("Password must contain a letter and a number"),
];

/**
 * Validates login fields without disclosing which credential is incorrect.
 * @type {import("express-validator").ValidationChain[]}
 */
export const loginValidator = [
  body("email").trim().isEmail().withMessage("Enter a valid email address").normalizeEmail(),
  body("password").isString().notEmpty().withMessage("Email and password are required"),
];
