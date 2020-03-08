const Product = require('../models/product.model');
const mongoose = require('mongoose');

class ProductsController {
    static async findAll(req, res, next){
        try {
            const products = Product.find({});
            console.log(req.query);
            if (req.query.limit) {
                products.limit(+req.query.limit);
            }
            if (req.query.populate) {
                console.log(req.query.populate);
                if (typeof req.query.populate == 'string') {
                    products.populate(req.query.populate);
                }
                if (Array.isArray(req.query.populate)) {
                    req.query.populate.array.forEach(populateElem => {
                        products.populate(populateElem);
                    });
                }         
            }
            const productsResult = await products.exec();
            res.status(200).json({
                message: 'Handling GET requests to /products',
                result: productsResult
            });
          } catch (err) {
            res.status(500).json({
                message: err.message
            });
          }
    }

    static async find(req, res, next){
        try {
            const product = await Product.findById(req.params.id);
            res.status(200).json({
                message: 'Handling GET requests to /products',
                result: product
            });
          } catch (err) {
            res.status(500).json({
                message: err.message
            });
          }
    }

    static async create(req, res, next){
        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price
        });
        try {
            await product.save();
            res.status(201).json({
                message: 'Handling POST requests to /products',
                result: product
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    static async update(req, res, next){
        try {
            await Product.findByIdAndUpdate(req.params.id, req.body);
            const productUpdated = await Product.findById(req.params.id);
            res.status(200).json({
                message: 'Handling PATCH requests to /products',
                result: productUpdated
            });
          } catch (err) {
            res.status(500).json({
                message: err.message
            });
          }
    }

    static async delete(req, res, next){
        try {
            const productDeleted = await Product.findByIdAndDelete(req.params.id);
            if (productDeleted) {
                res.status(204).json({
                    message: 'Handling DELETE requests to /products'
                });
            } else {
                res.status(404).json({
                    message: 'Product Not Found'
                });
            }
          } catch (err) {
            res.status(500).json({
                message: err.message
            });
          }
    }
}


module.exports.ProductsController = ProductsController;