const Order = require('../models/orderModel');
const User = require('../models/userModel'); // Assuming you have a User model

// Create a new order
exports.createOrder = async (req, res) => {
  const { products, totalPrice, deliveryAddress, customerPhone } = req.body;
  const customerId = req.user._id; // Assuming you're using JWT for authentication

  try {
    const newOrder = new Order({
      customerId,
      products,
      totalPrice,
      deliveryAddress,
      customerPhone,
    });

    await newOrder.save();

    res.status(201).json({ success: true, order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error creating order' });
  }
};

// Get orders by user (customer)
exports.getOrders = async (req, res) => {
  const customerId = req.user._id; // Assuming you're using JWT for authentication

  try {
    const orders = await Order.find({ customerId })
      .populate('products.productId')
      .populate('customerId', 'name email')
      .exec();

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching orders' });
  }
};

// Update order status (for admin use)
exports.updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error updating order status' });
  }
};
