// user routes --> for handle incoming requests

const express = require("express");
const { getAllUser, userSignup } = require("../controllers/userController");
const { signupValidator, validate } = require("../utils/validators");
const userRoutes = express.Router();

userRoutes.get("/", getAllUser);
// Sighup request
userRoutes.post("/signup", validate(signupValidator), userSignup);

module.exports = userRoutes;
