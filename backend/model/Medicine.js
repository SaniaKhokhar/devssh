const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  diseaseName: {
    type: String,
    required: [true, "Medicine name must be provided"],
  },
  medicinePrescription: {
    type: String,
    required: [true, "Prescription must be provided"],
  },
  homeSolution: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Medicine", medicineSchema);