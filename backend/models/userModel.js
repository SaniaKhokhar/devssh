const mongoose = require("mongoose");
const chatSchema = require("./chatModel.js");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // it is not for validation but make search more effective
  },
  password: {
    type: String,
    required: true,
  },
  chat: [chatSchema],
});

module.exports = mongoose.model("User", userSchema);
