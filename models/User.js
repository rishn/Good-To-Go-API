const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true // Ensure unique usernames
        },
        password: {
            type: String,
            required: true
        },
        email: { 
            type: String, 
            required: true,
            unique: true // Ensure unique emails
        },
        contactNumber: {
            type: String,
            required: true // Useful for contact
        },
        role: {
            type: String,
            enum: ['Customer', 'Driver', 'Admin'], // Possible roles
            default: 'Customer' // Default role is customer
        },
    }, 
    { 
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);
