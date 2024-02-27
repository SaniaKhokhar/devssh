const { Request, Response, NextFunction } = require("express");
const {
  body,
  validationResult,
  ValidationChain,
} = require("express-validator");
const User = require("../model/userModel.js");

const validate = (validations = ValidationChain) => {
  return async (req = Request, res = Response, next = NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        break;
      }
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next(); // if input data is successfully validate then we can sent that data to next middleware function which is final : userSignup(userController)
    }
    return res.status(422).json({ error: errors.array() });
  };
};

const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid Email"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/)
    .withMessage("Password must contains (A-Z), (a-z), (0-9) characters"),
];

const signupValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  //   body("email")
  //     .notEmpty()
  //     .withMessage("Email is required")
  //     .normalizeEmail()
  //     .isEmail()
  //     .withMessage("Invalid Email")
  //     .custom(async (email) => {
  //       const existingUser = await User.findOne({ email: email });
  //       if (existingUser) {
  //         throw new Error("Email in use");
  //       }
  //     }),
  //   body("password")
  //     .trim()
  //     .isLength({ min: 6 })
  //     .withMessage("Password must be at least 6 characters")
  //     .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/)
  //     .withMessage("Password must contains (A-Z), (a-z), (0-9) characters"),
  ...loginValidator,
  body("confirmPassword")
    .notEmpty()
    .withMessage("Password must reentered here")
    .custom((passwordConfirmation, { req }) => {
      if (passwordConfirmation !== req.body.password) {
        console.log("sd");
        throw new Error("Password confirmation failed!");
      }
      return true;
    }),
];

module.exports = { signupValidator, loginValidator, validate };

// isEmail(): This validator function checks if the incoming string is a valid email address.
// The normalizeEmail() method helps to convert the emails entered into the standard approved format.
