import { body, validationResult } from "express-validator";
export const registerValidator = [
  body("email")
    .exists()
    .withMessage("Email is required")
    .bail()
    .trim()
    .isEmail()
    .withMessage("Enter valid email address")
    .bail(),
    body("name").exists().withMessage("Name is required").bail()
    .isString().withMessage("Name must be a string").bail()
    .trim()
    .isLength({min:3,max:20}).withMessage()
];
