const mongoose = require("mongoose");

const tourGuideSchema = new mongoose.Schema({
  name: String,
  specialty: String,
  languages: [String],
  experience: Number,
  rating: Number,
  image: String
});

module.exports = mongoose.model("TourGuide", tourGuideSchema);
