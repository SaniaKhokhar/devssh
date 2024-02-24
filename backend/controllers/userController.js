// userController for handles user routes requests
const { Request, Response, NextFunction } = require("express");
const User = require("../models/userModel.js");
const { hash } = require("bcrypt");

// get all user
const getAllUser = async (
  req = Request,
  res = Response,
  next = NextFunction
) => {
  try {
    const users = await User.find();
    return res
      .status(200)
      .json({ message: "Successfully access all users information.", users });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Error in diplay all user's data",
      cause: error.message,
    });
  }
};

// user signup
const userSignup = async (
  req = Request,
  res = Response,
  next = NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const hashPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashPassword });
    await user.save();
    console.log("User signup.");
    return res.status(201).json({
      message: "User signed up successfully.",
      id: user._id.toString(),
    });
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    return res
      .status(500)
      .json({ message: "Error in user signup process", cause: err.message });
  }
};

module.exports = { getAllUser, userSignup };
