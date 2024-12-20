const productModel = require("../../models/productModel");

const getProductController = async (req, res) => {
    try {
        const productType = req?.query?.productType; // Added productType filter

        const filterCriteria = {};

        // Add productType filter if it's provided
        if (productType) {
            filterCriteria.productType = productType;
        }

        const allProduct = await productModel.find(filterCriteria).sort({ createdAt: -1 });

        res.json({
            message: "All Products and Events",
            success: true,
            error: false,
            data: allProduct
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = getProductController;
