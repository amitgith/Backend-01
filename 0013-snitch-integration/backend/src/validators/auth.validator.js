import { body, validationResult } from "express-validator";
export const registerValidator = [
  body("name")
    .exists()
    .withMessage("Name is required")
    .bail()
    .trim()
    .bail()
    .isString()
    .withMessage("Name must be a String")
    .bail()
    .isLength({ min: 3, max: 20 })
    .withMessage("Name length must be between 3 to 20 characters"),
  body("email")
    .exists()
    .withMessage("Email is required")
    .bail()
    .trim()
    .bail()
    .isEmail()
    .withMessage("Enter valid email address"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .bail()
    .isString()
    .withMessage("Password must be minimum 6 characters long")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password must be minimum 8 characters long"),
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
