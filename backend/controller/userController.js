const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Get user profile by user ID (using JWT for authentication)
const getUserProfile = async (req, res) => {
  try {
    // Ensure that the token is passed and decoded to get the user ID
    const token = req.headers.authorization?.split(" ")[1]; // Assuming Bearer token format
    if (!token) return res.status(401).json({ error: 'Authorization token missing' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Find user by user ID
    const user = await userModel.findById(userId).select('-password'); // Exclude password field

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getUserProfile,
};
