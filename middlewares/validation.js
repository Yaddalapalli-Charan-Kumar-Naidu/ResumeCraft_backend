import { check, body,validationResult } from "express-validator";


export const validateLogin = [
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];



export const validateSignup = [
  // Validate name
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),

  // Validate email
  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email format"),

  // Validate password
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&#]/)
    .withMessage("Password must contain at least one special character"),

  // Validate phone number
  body("phoneNumber")
    .trim()
    .isLength({ min: 10, max: 15 })
    .withMessage("Phone number must be between 10 to 15 digits")
    .isNumeric()
    .withMessage("Phone number must contain only digits"),
];
