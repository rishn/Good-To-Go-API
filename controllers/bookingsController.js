const Booking = require('../models/Booking')
const User = require('../models/User')
const Driver = require('../models/Driver')
const Vehicle = require('../models/Vehicle')

// @desc Get all bookings
// @route GET /bookings
// @access Private
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('driverId', 'userId driverNum rating vehicle trips')
            .populate('userId', 'username')
            .lean();

        if (!bookings.length) {
            return res.status(400).json({ message: 'No bookings found' });
        }

        // Fetch associated user and driver details for each booking
        const bookingsWithDetails = await Promise.all(bookings.map(async (booking) => {
            const vehicle = booking.driverId && booking.driverId.vehicle 
                ? await Vehicle.findById(booking.driverId.vehicle).lean().exec() 
                : null; // Correctly fetching vehicle using vehicle ID

            const driverUser = booking.driverId && booking.driverId.userId 
                ? await User.findById(booking.driverId.userId).lean().exec() 
                : null; // Correctly fetching user using user ID

            const driver = booking.driverId
                ? await Driver.findById(booking.driverId).lean().exec() 
                : null; // Correctly fetching user using user ID

            return { 
                ...booking, 
                driverName: driverUser ? driverUser.username : 'No driver assigned',
                driverLocation: driverUser ? driver.currentLocation: 'No driver assigned',
                vehiclePlate: vehicle ? vehicle.licensePlate : 'No vehicle found',
                vehicleType: vehicle ? vehicle.type : 'No vehicle found',
                status: booking.status // Include status field in response
            };
        }));

        res.json(bookingsWithDetails);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// @desc Create new booking
// @route POST /bookings
// @access Private
const createNewBooking = async (req, res) => {
    const { userId, driverId, item, weight, pickupAddress, pickupLocation, dropoffAddress, dropoffLocation, distance, price, status, accepted } = req.body;

    // Ensure that all required fields are present
    if (!userId || !item || !weight || !pickupAddress || !pickupLocation || !dropoffAddress || !dropoffLocation || !distance || !price || accepted === null) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Create booking
    const booking = await Booking.create({ 
        userId, 
        driverId,
        item,
        weight,
        pickupAddress,
        pickupLocation, 
        dropoffAddress,
        dropoffLocation, 
        distance, 
        price, 
        status: status || 'pending',
        accepted
    });

    if (booking) {
        res.status(201).json({ message: 'New booking created', data: booking });
    } else {
        res.status(400).json({ message: 'Invalid booking data received' });
    }
}

// @desc Update a booking
// @route PATCH /bookings
// @access Private
const updateBooking = async (req, res) => {
    const { id, item, driverId, status, accepted } = req.body

    // Check if required fields (id and status) are provided
    if (!id || !status || !accepted) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Find the booking to be updated
    const booking = await Booking.findById(id).exec()
    if (!booking) {
        return res.status(400).json({ message: 'Booking not found' })
    }

    // Update driverId and status if provided
    booking.driverId = driverId || booking.driverId
    booking.item = item || booking.item
    booking.status = status
    booking.accepted = accepted

    const updatedBooking = await booking.save()

    res.json({ message: `Booking with ID ${updatedBooking._id} updated`, data: updatedBooking })
}

// @desc Delete a booking
// @route DELETE /bookings
// @access Private
const deleteBooking = async (req, res) => {
    const { id } = req.body
    console.log(id);

    if (!id) {
        return res.status(400).json({ message: 'Booking ID required' })
    }

    const booking = await Booking.findById(id).exec()
    if (!booking) {
        return res.status(400).json({ message: 'Booking not found' })
    }

    const result = await booking.deleteOne()

    const reply = `Booking with ID ${result._id} deleted`
    res.json(reply)
}

module.exports = {
    getAllBookings,
    createNewBooking,
    updateBooking,
    deleteBooking
}
