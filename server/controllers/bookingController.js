const Booking = require('../models/Booking');

// Create new booking
exports.createBooking = async (req, res) => {
    try {
        console.log('=== New Booking Request ===');
        console.log('Received booking data:', req.body);

        // Validate required fields
        const requiredFields = ['name', 'email', 'phone', 'date', 'time', 'people'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            console.log('Missing required fields:', missingFields);
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        // Create new booking instance
        const booking = new Booking(req.body);
        console.log('Created booking instance:', booking);

        // Save to database
        console.log('Attempting to save booking to database...');
        const savedBooking = await booking.save();
        console.log('Booking saved successfully:', savedBooking);

        // Send success response
        res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            data: savedBooking
        });
        
        console.log('=== Booking Process Complete ===');
    } catch (error) {
        console.error('Error in createBooking:', error);
        
        // Check for validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }

        // Check for duplicate key errors
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Duplicate booking error',
                field: Object.keys(error.keyPattern)[0]
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error creating booking',
            error: error.message
        });
    }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
    try {
        console.log('Fetching all bookings...');
        const bookings = await Booking.find().sort({ createdAt: -1 });
        console.log(`Found ${bookings.length} bookings`);
        
        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get single booking
exports.getBooking = async (req, res) => {
    try {
        console.log('Fetching booking with ID:', req.params.id);
        const booking = await Booking.findById(req.params.id);
        
        if (!booking) {
            console.log('Booking not found with ID:', req.params.id);
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        console.log('Found booking:', booking);
        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error) {
        console.error('Error fetching booking:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update booking status
exports.updateBooking = async (req, res) => {
    try {
        console.log('Updating booking:', req.params.id);
        console.log('Update data:', req.body);

        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true, runValidators: true }
        );
        
        if (!booking) {
            console.log('Booking not found for update:', req.params.id);
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        console.log('Booking updated successfully:', booking);
        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error) {
        console.error('Error updating booking:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Delete booking
exports.deleteBooking = async (req, res) => {
    try {
        console.log('Deleting booking:', req.params.id);
        const booking = await Booking.findByIdAndDelete(req.params.id);
        
        if (!booking) {
            console.log('Booking not found for deletion:', req.params.id);
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        console.log('Booking deleted successfully');
        res.status(200).json({
            success: true,
            message: 'Booking deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
