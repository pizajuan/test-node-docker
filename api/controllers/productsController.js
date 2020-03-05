const Product = require('../models/product.model');
const mongoose = require('mongoose');
class ProductsController {
    static getAllProducts(req, res, next){
        res.status(200).json({
            message: 'Handling GET requests to /products'
        });
    }

    static async createProduct(req, res, next){
        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price
        });
        try {
            await product.save();
            res.status(201).json({
                message: 'Handling POST requests to /products',
                product: product
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
}


module.exports.ProductsController = ProductsController;