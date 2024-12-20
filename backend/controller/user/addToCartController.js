const addToCartModel = require("../../models/cartProduct");

const addToCartController = async (req, res) => {
    try {
        const { productId } = req?.body;
        const currentUser = req.userId; // Assuming `userId` is set from authentication middleware

        // Check if the product is already in the current user's cart
        const isProductAvailable = await addToCartModel.findOne({ 
            productId, 
            userId: currentUser 
        });

        if (isProductAvailable) {
            return res.json({
                message: "Product already exists in your cart.",
                success: false,
                error: true,
            });
        }

        // Create payload for new cart item
        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentUser,
        };

        // Save the new cart item
        const newAddToCart = new addToCartModel(payload);
        const saveProduct = await newAddToCart.save();

        return res.json({
            data: saveProduct,
            message: "Product added to your cart.",
            success: true,
            error: false,
        });
    } catch (err) {
        res.json({
            message: err?.message || "An error occurred.",
            error: true,
            success: false,
        });
    }
};

module.exports = addToCartController;
