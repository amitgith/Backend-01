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
    .isMobilePhone("en-IN")
    .withMessage("Invalid Phone Number"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password at least 6 Characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid Request",
        errors: errors.array(),
      });
    }
    next();
  },
];
