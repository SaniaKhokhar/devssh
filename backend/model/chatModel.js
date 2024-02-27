const mongoose = require("mongoose");
const { randomUUID } = require("crypto");

const chatSchema = new mongoose.Schema({
  id: {
    type: String,
    default: randomUUID(),
  },
  //   role: {
  //     type: String,
  //     required: true
  //   },
  content: {
    type: String,
    required: true,
  },
});

module.exports = chatSchema;
