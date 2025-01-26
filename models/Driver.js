const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        driverNum: {
            type: String,
            default: ""
        },
        currentLocation: {
            type: {
                lat: { type: Number, required: true },
                lng: { type: Number, required: true }
            },
            required: true
        },
        vehicle: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vehicle',
            required: true
        },
        availability: {
            type: Boolean,
            default: true
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            default: 3
        },
        trips: {
            type: Number,
            required: false,
            default: 0
        }
    }, 
    { 
        timestamps: true 
    }
);

module.exports = mongoose.model('Driver', driverSchema);
