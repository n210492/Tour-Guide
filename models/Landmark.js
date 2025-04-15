const mongoose = require("mongoose");

const landmarkSchema = new mongoose.Schema({
  name: String,
  city: String,
  images: [String],
  rating: Number,
  price: Number,
  description: String,
  rules: {
    do: [String],
    dont: [String]
  },
  location: {
    latitude: Number,
    longitude: Number
  }
});

module.exports = mongoose.model("Landmark", landmarkSchema);
