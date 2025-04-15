const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  location: String,
  profilePic: String,
  bookingHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Landmark" }]
});

module.exports = mongoose.model("User", userSchema);
