const express = require("express");
const router = express.Router();
const food = require("../model/Food");
const yoga = require("../model/Yoga");
const medicine = require("../model/Medicine");

router.post("/food", async (req, res) => {
  console.log("food");
  try {
    var request = req.body.name.toLowerCase();
    request = request.split(" ").join("");

    console.log(req.body.name, " - ", request);

    const data = await food.findOne({ foodName: request });
    if (data) {
        const lines = (data.foodRecipe).split('.')
        console.log(lines);
        res.status(200).send(lines);
    } else {
      console.log("not found");
      res.status(404).send("not found");
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/yoga", async (req, res) => {
  console.log("yoga");
  try {
    var request = req.body.name.split(" ").join("");

    console.log(req.body.name, " - ", request);

    const data = await yoga.findOne({ yogaName: request });
    if (data) {
      const lines = (data.yogaSteps).split('.')
      console.log(lines);
      res.status(200).send(lines);
    } else {
      console.log("not found");
      res.status(404).send("not found");
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/medicine", async (req, res) => {
  console.log("medicine");
  try {
    var request = req.body.name.toLowerCase();
    request = request.split(" ").join("");

    console.log(req.body.name, " - ", request);

    const data = await medicine
      .findOne({ diseaseName: request })
      .select("medicinePrescription homeSolution");
    if (data) {
      console.log(data);
      const newdata = ("Medicine Prescription : " + data.medicinePrescription + ".Home Solution : " + data.homeSolution).split('.')
    
      console.log(newdata)
      res.status(200).send(newdata);
    } else {
      console.log("not found");
      res.status(404).send("not found");
    }
  } catch (error) {
    console.log(error);
  }
});

// router.get("/recipes", async (req, res) => {
//   try {
//     console.log("Fetching recipes...");
//     const recipes = await food.find();

//     console.log("Retrieved recipes:", recipes);

//     res.json(recipes);
//   } catch (error) {
//     console.error("Error fetching recipes:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

module.exports = router;