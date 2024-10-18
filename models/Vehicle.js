const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['bike', 'car', 'truck'], // Define more types as needed
        required: true
    },
    licensePlate: {
        type: String,
        required: true
    },
    capacity: {
        type: Number, // Capacity can be in terms of weight or volume
        required: true
    }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
