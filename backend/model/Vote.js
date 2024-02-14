const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
    userEmail: { 
      type: String, 
      required: true
    },
    feedbackId: { 
      type: mongoose.Types.ObjectId, 
      required: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vote", voteSchema);