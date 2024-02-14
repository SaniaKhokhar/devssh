const express = require("express");
const router = express.Router();
const Review = require('../model/Review')

router.post("/add", async (req, res) => {
    try {    
        console.log("Request body:", req.body);

        const existingReview = await Review.findOne({ userId: req.body.userId });

        if (existingReview) {
            // Update the existing review
            existingReview.rate = req.body.rate;
            await existingReview.save();
            res.status(200).send("Review updated successfully");
        } else {
            // create a new one
            const newReview = new Review({
                rate: req.body.rate,
                userId: req.body.userId,
            });
            await newReview.save();
            res.status(200).send("Review added successfully");
        }
    } catch (error) {
        console.log("Error while adding or updating review: ", error);
        res.status(500).send("Internal Server Error");
    }
});


router.post("/get", async (req, res) => {
    try {
        const review = await Review.findOne({ userId: req.body.userId });

        if (review) {
            res.send({ rate: review.rate });
            console.log(review.rate);
        } else {
            res.status(404).send("Review not found");
        }
    } catch (error) {
        console.log("Error while getting review: ", error);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;