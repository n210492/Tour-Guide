const mongoose = require('mongoose');

const tourGuideSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    speciality: {
        type: String,
        enum: ['adventure', 'culture', 'nature', 'historical'],
        required: true
    }
});

module.exports = mongoose.model('TourGuide', tourGuideSchema);