const Vehicle = require('../models/Vehicle')
const Driver = require('../models/Driver')

// @desc Get all vehicles
// @route GET /vehicles
// @access Private
const getAllVehicles = async (req, res) => {
    const vehicles = await Vehicle.find().lean()

    if (!vehicles?.length) {
        return res.status(400).json({ message: 'No vehicles found' })
    }

    res.json(vehicles)
}

// @desc Create new vehicle
// @route POST /vehicles
// @access Private
const createNewVehicle = async (req, res) => {
    const { type, licensePlate, capacity } = req.body

    if (!type || !licensePlate || !capacity) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const duplicate = await Vehicle.findOne({ licensePlate }).lean().exec()
    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate license plate' })
    }

    const vehicle = await Vehicle.create({ type, licensePlate, capacity })

    if (vehicle) {
        res.status(201).json({ message: 'New vehicle created' })
    } else {
        res.status(400).json({ message: 'Invalid vehicle data received' })
    }
}

// @desc Update a vehicle
// @route PATCH /vehicles
// @access Private
const updateVehicle = async (req, res) => {
    const { id, type, licensePlate, capacity } = req.body

    if (!id || !type || !licensePlate || !capacity) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const vehicle = await Vehicle.findById(id).exec()
    if (!vehicle) {
        return res.status(400).json({ message: 'Vehicle not found' })
    }

    const duplicate = await Vehicle.findOne({ licensePlate }).lean().exec()
    if (duplicate && duplicate._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate license plate' })
    }

    vehicle.type = type
    vehicle.licensePlate = licensePlate
    vehicle.capacity = capacity

    const updatedVehicle = await vehicle.save()

    res.json({ message: `Vehicle ${updatedVehicle.licensePlate} updated` })
}

// @desc Delete a vehicle
// @route DELETE /vehicles
// @access Private
const deleteVehicle = async (req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: 'Vehicle ID required' })
    }

    const vehicle = await Vehicle.findById(id).exec()
    if (!vehicle) {
        return res.status(400).json({ message: 'Vehicle not found' })
    }

    const result = await vehicle.deleteOne()

    const reply = `Vehicle with ID ${result._id} and license plate ${result.licensePlate} deleted`
    res.json(reply)
}

module.exports = {
    getAllVehicles,
    createNewVehicle,
    updateVehicle,
    deleteVehicle
}
