const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        const token = req.cookies?.token; // Getting token from cookies

        console.log("token", token);

        if (!token) {
            return res.status(401).json({
                message: "Please Login to continue.", // More user-friendly message
                error: true,
                success: false
            });
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log("error auth", err);
                // Check if the token has expired
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({
                        message: "Session expired, please login again.",
                        error: true,
                        success: false
                    });
                }
                return res.status(401).json({
                    message: "Invalid token. Please login again.",
                    error: true,
                    success: false
                });
            }

            // If the token is valid
            console.log("decoded", decoded);
            req.userId = decoded?._id; // Save the user ID from the token into the request object
            next(); // Call the next middleware or route handler
        });
    } catch (err) {
        console.error("Authentication error:", err);
        return res.status(400).json({
            message: err.message || "An unexpected error occurred during authentication.",
            error: true,
            success: false
        });
    }
}

module.exports = authToken;
