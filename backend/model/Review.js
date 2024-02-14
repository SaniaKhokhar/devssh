const mongoose = require("mongoose")

const reviewSchema = {
    rate: {
        type: Number,
        required: true,
        min: 1, 
        max: 5, 
    },
    userId: {
        type: String,
        required: true,
    }
}

const Review = mongoose.model("Review", reviewSchema)

module.exports = Review