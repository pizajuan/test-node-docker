const Product = require('../models/product.model');
const mongoose = require('mongoose');
class ProductsController {
    static async getAllProducts(req, res, next){
        try {
            const products = await Product.find({});
            res.status(200).json({
                message: 'Handling GET requests to /products',
                result: products
            });
          } catch (err) {
            throw err;
          }
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