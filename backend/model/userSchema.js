const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    googleId: String,
    username: String,
    email: String, //{
    //     type: String,
    //     unique: true, // Ensures unique emails for default login/signup
    //   },
    image: String,
    password: String,
  },
  { timestamps: true }
);

const userdb = new mongoose.model("users", userSchema);

module.exports = userdb;
