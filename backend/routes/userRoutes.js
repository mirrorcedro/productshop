const express = require('express');
const router = express.Router();
const User = require('../models/userModel');  // Ensure correct path
const { authenticateToken } = require('../middleware/authToken');  // Ensure correct path

// Ensure the route is properly set up
router.post('/update-user', authenticateToken, async (req, res) => {
    try {
        const { name, email, userId } = req.body;
        
        // Validate input
        if (!name || !email || !userId) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Update the user's name and email
        user.name = name;
        user.email = email;

        // Optionally, add more validation (e.g., check if email is already taken)
        const emailTaken = await User.findOne({ email });
        if (emailTaken && emailTaken._id.toString() !== userId) {
            return res.status(400).json({ success: false, message: 'Email is already in use' });
        }

        // Save the updated user
        await user.save();

        // Respond with success
        res.status(200).json({ success: true, message: 'Profile updated successfully', data: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
