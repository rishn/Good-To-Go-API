const User = require('../models/User');
const Booking = require('../models/Booking'); // Updated from Note to Booking
const bcrypt = require('bcrypt');

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = async (req, res) => {
    // Get all users from MongoDB
    const users = await User.find().select('-password').lean();

    // If no users
    if (!users?.length) 
        return res.status(400).json({ message: 'No users found' });

    res.json(users);
};

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = async (req, res) => {
    const { username, password, role, email, contactNumber } = req.body;

    // Confirm data
    if (!username || !password || !email || !contactNumber) 
        return res.status(400).json({ message: 'All fields are required' });

    // Check for duplicate username or email
    const duplicateUsername = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec();
    const duplicateEmail = await User.findOne({ email }).lean().exec();

    if (duplicateUsername || duplicateEmail) 
        return res.status(409).json({ message: 'Duplicate username or email' });

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

    // Set default role to 'Customer' if not provided
    const userObject = { 
        username, 
        password: hashedPwd, 
        role: role || 'Customer', 
        email, 
        contactNumber 
    };

    // Create and store new user
    const user = await User.create(userObject);

    if (user) // created 
        res.status(201).json({ message: `New user ${username} created`, data: user });
    else 
        res.status(400).json({ message: 'Invalid user data received' });
};

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = async (req, res) => {
    const { id, username, role, password, email, contactNumber } = req.body;

    // Confirm data
    if (!id || !username || !role || !email || !contactNumber) 
        return res.status(400).json({ message: 'All fields except password are required' });

    // Confirm whether the user exists
    const user = await User.findById(id).exec();

    if (!user) 
        return res.status(400).json({ message: 'User not found' });

    // Check for duplicate username or email (excluding the current user)
    const duplicateUsername = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec();
    const duplicateEmail = await User.findOne({ email }).lean().exec();

    if ((duplicateUsername && duplicateUsername._id.toString() !== id) || 
        (duplicateEmail && duplicateEmail._id.toString() !== id)) {
        return res.status(409).json({ message: 'Duplicate username or email' });
    }

    // Update user details
    user.username = username;
    user.role = role;
    user.email = email;
    user.contactNumber = contactNumber;

    if (password) {
        // Hash password
        user.password = await bcrypt.hash(password, 10); // salt rounds
    }

    const updatedUser = await user.save();

    res.json({ message: `${updatedUser.username} updated` });
};

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = async (req, res) => {
    const { id } = req.body;

    // Confirm data
    if (!id) 
        return res.status(400).json({ message: 'User ID required' });

    // Check if user has assigned bookings
    const booking = await Booking.findOne({ userId: id }).lean().exec();
    if (booking) 
        return res.status(400).json({ message: 'User has assigned bookings' });

    // Confirm whether the user exists
    const user = await User.findById(id).exec();

    if (!user) 
        return res.status(400).json({ message: 'User not found' });

    const result = await user.deleteOne();

    const reply = `Username ${result.username} with ID ${result._id} deleted`;

    res.json(reply);
};

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
};
