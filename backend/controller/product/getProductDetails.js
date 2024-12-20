const productModel = require("../../models/productModel");

const getProductDetails = async (req, res) => {
    try {
        const { productId } = req.body;

        const product = await productModel.findById(productId);

        // Ensure the product is found and handle cases like event products
        if (!product) {
            return res.status(404).json({
                message: "Product or event not found",
                error: true,
                success: false
            });
        }

        res.json({
            data: product,
            message: "Product details fetched successfully",
            success: true,
            error: false
        });
    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = getProductDetails;
