import { body, validationResult } from "express-validator";
export const registerValidator = [
  body("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email Address"),
  body("phone")
    .exists()
    .withMessage("Phone Number is required")
    .isMobilePhone("en-IN").withMessage("Invalid Pho")
];
