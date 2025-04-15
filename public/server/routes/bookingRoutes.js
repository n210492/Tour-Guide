const express = require('express');
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  getBooking,
  updateBooking,
  deleteBooking
} = require('../controllers/bookingController');

// Booking routes
router.post('/', createBooking);
router.get('/', getAllBookings);
router.get('/:id', getBooking);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);

module.exports = router;
