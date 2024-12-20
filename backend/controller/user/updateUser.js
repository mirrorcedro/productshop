const userModel = require("../../models/userModel");
const jwt = require('jsonwebtoken');

async function updateUserRole(req, res) {
    try {
        const { userId } = req.body; // Get the userId from the request body

        // Find the user by ID
        const userToUpdate = await userModel.findById(userId);
        if (!userToUpdate) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        // Update the role to "ADMIN"
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { role: 'ADMIN' }, // Set the role to "ADMIN"
            { new: true } // Return the updated user document
        );

        // Generate a new JWT token with updated information (if needed)
        const tokenPayload = {
            email: updatedUser.email,
            userId: updatedUser._id,
        };

        // Create a new token with an updated expiration time
        const newToken = jwt.sign(tokenPayload, 'your_secret_key', { expiresIn: '1h' });

        return res.json({
            data: updatedUser,
            message: "User role updated to ADMIN",
            success: true,
            error: false,
            token: newToken // Provide the updated token in the response
        });
    } catch (err) {
        console.error(err); // Log error for debugging
        return res.status(400).json({
            message: err.message || "An error occurred",
            error: true,
            success: false
        });
    }
}

module.exports = updateUserRole;
