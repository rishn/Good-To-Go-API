const Driver = require('../models/Driver');
const User = require('../models/User');

// @desc Get all drivers
// @route GET /drivers
// @access Private
const getAllDrivers = async (req, res) => {
    try {
        // Get all drivers from MongoDB
        const drivers = await Driver.find()
            .populate('userId', 'username') // Populating with user details (e.g., username)
            .populate('vehicle', 'type licensePlate')
            .lean();

        // If no drivers found
        if (!drivers?.length) {
            return res.status(400).json({ message: 'No drivers found' });
        }

        res.json(drivers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc Create new driver
// @route POST /drivers
// @access Private
const createNewDriver = async (req, res) => {
    const { userId, driverNum, currentLocation, vehicle } = req.body;

    // Confirm data
    if (!userId || !driverNum || !currentLocation) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the user exists
    const user = await User.findById(userId).exec();
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    try {
        // Create and store the new driver
        const driver = await Driver.create({
            userId,
            driverNum,
            currentLocation,
            vehicle,
        });

        res.status(201).json({ message: 'New driver created', driver });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc Update a driver
// @route PATCH /drivers/:id
// @access Private
const updateDriver = async (req, res) => {
    const { id, driverNum, currentLocation, vehicle, availability, rating, trips } = req.body;

    // Confirm data
    if (!id || !driverNum) 
        return res.status(400).json({ message: 'Required fields missing' });


    // Confirm driver exists
    const driver = await Driver.findById(id).exec();
    if (!driver) {
        return res.status(400).json({ message: 'Driver not found' });
    }

    // Update fields
    if (driverNum) driver.driverNum = driverNum;
    if (currentLocation) driver.currentLocation = currentLocation;
    if (vehicle) driver.vehicle = vehicle;
    if (availability !== undefined) driver.availability = availability;
    if (rating !== undefined) driver.rating = rating;
    if (trips !== undefined) driver.trips = trips;

    try {
        const updatedDriver = await driver.save();
        res.json({ message: `'${updatedDriver.driverNum}' updated`, driver: updatedDriver });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc Delete a driver
// @route DELETE /drivers/:id
// @access Private
const deleteDriver = async (req, res) => {
    const { id } = req.body;

    // Confirm driver exists
    const driver = await Driver.findById(id).exec();
    if (!driver) {
        return res.status(400).json({ message: 'Driver not found' });
    }

    try {
        await driver.deleteOne();
        res.json({ message: `Driver with ID ${id} deleted` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllDrivers,
    createNewDriver,
    updateDriver,
    deleteDriver
};
