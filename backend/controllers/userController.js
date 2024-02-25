// userController for handles user routes requests
const { Request, Response, NextFunction } = require("express");
const User = require("../models/userModel.js");
const { hash, compare } = require("bcrypt");
const { trusted } = require("mongoose");
const COOKIE_NAME = require("../utils/constants.js");
const { createToken } = require("../utils/tokens.js");

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

// user login
const userLogin = async (
  req = Request,
  res = Response,
  next = NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).send("User is not Registered");
    }
    // "campare" is use for verification of password
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).send("Incorrect password");
    }

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });
    const token = createToken(user._id.toString(), user.email, "7d");

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    }); // using this cookie create inside browser

    // ----------------------------------------------------
    return res.status(201).json({
      message: "User logged in successfully.",
      id: user._id.toString(),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in user login process", cause: error.message });
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
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(401).send("User is already signed up");
    }
    const hashPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashPassword });
    await user.save();

    // create token and stores cookie
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });
    console.log("User signup.");
    return res.status(201).json({
      message: "User signed up successfully.",
      id: user._id.toString(),
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return res
      .status(500)
      .json({ message: "Error in user signup process", cause: error.message });
  }
};

module.exports = { getAllUser, userSignup, userLogin };
