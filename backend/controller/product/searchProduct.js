const productModel = require("../../models/productModel");

const searchProduct = async (req, res) => {
    try {
        const query = req.query.q;
        const regex = new RegExp(query, 'i', 'g'); // Case-insensitive search

        // Search in product name and category, considering productType as well
        const product = await productModel.find({
            "$or": [
                { productName: regex },
                { category: regex }
            ]
        });

        res.json({
            data: product,
            message: "Search Product and Event list",
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

module.exports = searchProduct;
