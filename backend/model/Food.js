const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: true,
  },
  foodRecipe: {
    type: String,
    required: [true, "Description must be provided"],
  },
});

module.exports = mongoose.model("Food", foodSchema);