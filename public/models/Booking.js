const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },  // Reference to User
    landmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Landmark", required: true }], // Multiple landmarks
    tourGuide: { type: mongoose.Schema.Types.ObjectId, ref: "TourGuide", default: null },  // Optional
    bookingDate: { type: Date, default: Date.now },  // When the booking was made
    tourDate: { type: Date, required: true },  // Date of the tour
    totalPrice: { type: Number, required: true },  
    status: { type: String, enum: ["upcoming", "completed"], default: "upcoming" }, // Upcoming or Completed
    canCancel: { type: Boolean, default: true } // True if cancellation is allowed
});

// Middleware: Auto-update `canCancel` based on tour date
bookingSchema.pre("save", function (next) {
    const now = new Date();
    const hoursLeft = (this.tourDate - now) / (1000 * 60 * 60);
    this.canCancel = hoursLeft > 24; // Only allow cancellation if more than 24 hours left
    next();
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
