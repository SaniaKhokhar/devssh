// user routes --> for handle incoming requests

const express = require("express");
const {
  getAllUser,
  userSignup,
  userLogin,
} = require("../controllers/userController");
const {
  signupValidator,
  validate,
  loginValidator,
} = require("../utils/validators");
const userRoutes = express.Router();

userRoutes.get("/", getAllUser);
// Sighup request
userRoutes.post("/signup", validate(signupValidator), userSignup);
userRoutes.post("/login", validate(loginValidator), userLogin);

module.exports = userRoutes;
