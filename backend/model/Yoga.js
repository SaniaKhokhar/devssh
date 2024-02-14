const mongoose = require("mongoose");

const yogaSchema = new mongoose.Schema({
  yogaName: {
    type: String,
    required: [true, "Yoga name must be provided"],
  },
  yogaSteps: {
    type: String,
    required: [true, "Yoga steps must be provided"],
  },
});

module.exports = mongoose.model("Yoga", yogaSchema);