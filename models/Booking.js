const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
    {
        userId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
        driverId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Driver', 
            required: false 
        },
        item: {
            type: String,
            required: true
        },
        weight: { // New weight field
            type: Number,
            required: true
        },
        pickupAddress: {
            type: String,
            required: true
        },
        pickupLocation: { 
            type: {
                lat: { type: Number, required: true },
                lng: { type: Number, required: true }
            },
            required: true 
        },
        dropoffAddress: {
            type: String,
            required: true
        },
        dropoffLocation: { 
            type: {
                lat: { type: Number, required: true },
                lng: { type: Number, required: true }
            },
            required: true 
        },
        distance: { // New distance field
            type: Number,
            required: true
        },
        price: { 
            type: Number, 
            required: true 
        },
        status: { 
            type: String, 
            enum: ['pending', 'completed'], 
            default: 'pending' 
        },
        accepted: {
            type: Boolean,
            required: true,
            default: false
        }
    }, 
    { 
        timestamps: true 
    }
);

module.exports = mongoose.model('Booking', bookingSchema);
