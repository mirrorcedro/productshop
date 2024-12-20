const uploadProductPermission = require('../../helpers/permission');
const productModel = require('../../models/productModel');

async function updateProductController(req, res) {
    try {
        if (!uploadProductPermission(req.userId)) {
            throw new Error("Permission denied");
        }

        const { _id, ...resBody } = req.body;

        // Ensure the product type is properly handled in the update
        const updateProduct = await productModel.findByIdAndUpdate(_id, resBody, { new: true });

        if (!updateProduct) {
            return res.status(404).json({
                message: "Product or event not found",
                error: true,
                success: false
            });
        }

        res.json({
            message: "Product or Event updated successfully",
            data: updateProduct,
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
}

module.exports = updateProductController;
