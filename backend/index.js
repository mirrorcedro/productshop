const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');


const app = express();

// Enable CORS for the frontend URL
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true, // Allow cookies
}));

// Middleware for parsing JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Use /api routes for all requests
app.use("/api", router);



// Example of adding order routes (if needed)
app.post('/api/orders', async (req, res) => {
    const { customerInfo, products, totalPrice, paymentStatus, paymentMethod } = req.body;
    const user = await User.findById(req.user.id); // Get the logged-in user

    const newOrder = new Order({
        userId: user._id,
        customerInfo,
        products,
        totalPrice,
        paymentStatus,
        paymentMethod,
        orderDate: new Date(),
    });

    await newOrder.save();
    res.json({ success: true, order: newOrder });
});

app.get('/api/orders', async (req, res) => {
    const user = await User.findById(req.user.id); // Get the logged-in user
    const orders = await Order.find({ userId: user._id }).populate('products.productId');
    res.json({ success: true, orders });
});

app.post('/api/validate-token', (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'Invalid or expired token' });
        }

        // Fetch user from database using decoded user info (if needed)
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, user });
    });
});

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to DB");
        console.log("Server is running on port " + PORT);
    });
});
