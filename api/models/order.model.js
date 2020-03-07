const mongoose = require('mongoose');
const Product = require('../models/product.model');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);