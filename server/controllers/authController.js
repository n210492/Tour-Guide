const Tourist = require('../models/Tourist');
const TourGuide = require('../models/TourGuide');
const bcrypt = require('bcryptjs');




// Login for both Tourist and Tour Guide
exports.login = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        let user;
        if (role === 'tourist') {
            user = await Tourist.findOne({ email });
        } else if (role === 'tourguide') {
            user = await TourGuide.findOne({ email });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Invalid role specified'
            });
        }

        // Check if user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Login successful
        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: user
        });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({
            success: false,
            message: 'Error during login',
            error: error.message
        });
    }
};

// Tourist Signup
exports.signupTourist = async (req, res) => {
    try {
        const { fullName, email, password, gender, phoneNumber } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const tourist = new Tourist({
            fullName,
            email,
            password:hashedPassword, // In a real-world scenario, you should hash the password before saving
            gender,
            phoneNumber
        });

        await tourist.save();

        res.status(201).json({
            success: true,
            message: 'Tourist registered successfully',
            data: tourist
        });
    } catch (error) {
        console.error('Error in signupTourist:', error);
        res.status(500).json({
            success: false,
            message: 'Error registering tourist',
            error: error.message
        });
    }
};

// Tour Guide Signup
exports.signupTourGuide = async (req, res) => {
    try {
        const { fullName, email, password, gender, phoneNumber, experience, speciality } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const tourGuide = new TourGuide({
            fullName,
            email,
            password:hashedPassword, // In a real-world scenario, you should hash the password before saving
            gender,
            phoneNumber,
            experience,
            speciality
        });

        await tourGuide.save();

        res.status(201).json({
            success: true,
            message: 'Tour Guide registered successfully',
            data: tourGuide
        });
    } catch (error) {
        console.error('Error in signupTourGuide:', error);
        res.status(500).json({
            success: false,
            message: 'Error registering tour guide',
            error: error.message
        });
    }
};