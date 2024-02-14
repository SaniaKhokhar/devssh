const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String,
    required: true 
  },
  votesCount: {
    type: Number,
    default: 0,
  }
});

module.exports = mongoose.model("Feedback", feedbackSchema);
