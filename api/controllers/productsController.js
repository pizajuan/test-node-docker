const Product = require('../models/product.model');
const mongoose = require('mongoose');
class ProductsController {
    static getAllProducts(req, res, next){
        res.status(200).json({
            message: 'Handling GET requests to /products'
        });
    }

    static createProduct(req, res, next){
        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price
        });
        product.save()
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.error(err);
        });
        
        res.status(201).json({
            message: 'Handling POST requests to /products',
            product: product
        });
    }
}


module.exports.ProductsController = ProductsController;