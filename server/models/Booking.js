const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'] 
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: { 
    type: String, 
    required: [true, 'Phone number is required'] 
  },
  date: { 
    type: Date, 
    required: [true, 'Date is required'] 
  },
  time: { 
    type: String, 
    required: [true, 'Time is required'] 
  },
  people: { 
    type: Number, 
    required: [true, 'Number of people is required'],
    min: [1, 'At least one person is required']
  },
  message: { 
    type: String 
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
