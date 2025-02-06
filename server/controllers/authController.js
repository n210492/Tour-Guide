const Tourist = require('../models/Tourist');
const TourGuide = require('../models/TourGuide');

// Tourist Signup
exports.signupTourist = async (req, res) => {
    try {
        const { fullName, email, password, gender, phoneNumber } = req.body;

        const tourist = new Tourist({
            fullName,
            email,
            password, // In a real-world scenario, you should hash the password before saving
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

        const tourGuide = new TourGuide({
            fullName,
            email,
            password, // In a real-world scenario, you should hash the password before saving
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