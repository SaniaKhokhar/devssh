const express = require("express");
const Router = express.Router()
const {
  getAllUsers,
  userLogin,
  userLogout,
  userSignup,
  verifyUser,
} = require("../controllers/userController.js");
const  {
  loginValidator,
  signupValidator,
  validate,
} = require("../utils/validators.js");
const { verifyToken } = require("../utils/tokens.js");

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignup);
userRoutes.post("/login", validate(loginValidator), userLogin);
userRoutes.get("/auth-status", verifyToken, verifyUser);
userRoutes.get("/logout", verifyToken, userLogout);

module.exports = userRoutes;