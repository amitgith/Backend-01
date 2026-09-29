import { body, validationResult } from "express-validator";
export const registerValidator = [
  body("name")
    .exists()
    .withMessage("Name is required")
    .bail()
    .isString()
    .withMessage("Name must be a string")
    .bail()
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("Minimum and Maximum  3 and 20  characters are required"),
  body("email")
    .exists()
    .withMessage("Email is required")
    .bail()
    .trim()
    .isEmail()
    .withMessage("Invalid email address")
    .bail(),
  body("password")
    .exists()
    .withMessage("Password is required")
    .bail()
    .isString()
    .withMessage("Password must be a string")
    .bail()
    .trim()
    .isLength({ min: 8 })
    .withMessage("Minmum 8 characters are required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        message: "Invalid request",
        errors: errors.array(),
      });
    }
    next();
  },
];
export const loginValidator = [
  body("email")
    .exists()
    .withMessage("Email is required")
    .bail()
    .trim()
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .bail()
    .isString()
    .withMessage("Password must be a string")
    .bail()
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be a minimum 8 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid request",
        errors: errors.array(),
      });
    }
    next();
  },
];
