const productModel = require("../../models/productModel");

const filterProductController = async (req, res) => {
    try {
        const categoryList = req?.body?.category || [];
        const productType = req?.body?.productType; // Added productType filter

        const filterCriteria = { category: { "$in": categoryList } };

        // Add productType filter if it's provided
        if (productType) {
            filterCriteria.productType = productType;
        }

        const product = await productModel.find(filterCriteria);

        res.json({
            data: product,
            message: "Product and Event filtered successfully",
            error: false,
            success: true
        });
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = filterProductController;
