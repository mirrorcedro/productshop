const productModel = require("../../models/productModel");

const getCategoryWiseProduct = async (req, res) => {
    try {
        const { category, productType } = req?.body || req?.query;

        const filterCriteria = { category };

        // Add productType filter if it's provided
        if (productType) {
            filterCriteria.productType = productType;
        }

        const product = await productModel.find(filterCriteria);

        res.json({
            data: product,
            message: "Products or Events by Category",
            success: true,
            error: false
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = getCategoryWiseProduct;
