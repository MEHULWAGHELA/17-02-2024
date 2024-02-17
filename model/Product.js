const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product: {
        type: String,
        required: true,
        unique:[true,"Product name must be unique"]
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    productImage: {
        type: String,
    },
}, { timestamps: true })

const Product = mongoose.model("product", productSchema);

module.exports = Product