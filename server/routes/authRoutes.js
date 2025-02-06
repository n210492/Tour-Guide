const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Tourist Signup Route
router.post('/signup/tourist', authController.signupTourist);

// Tour Guide Signup Route
router.post('/signup/tourguide', authController.signupTourGuide);
router.post('/login',authController.login);

module.exports = router;