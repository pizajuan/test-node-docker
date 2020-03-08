const Product = require('../models/product.model');
const Order = require('../models/order.model');
const mongoose = require('mongoose');

class OrdersController {
    static async findAll(req, res, next){
        try {
            const orders = Order.find({});
            console.log(req.query);
            if (req.query.populate) {
                console.log(req.query.populate);
                if (typeof req.query.populate == 'string') {
                    orders.populate(req.query.populate);
                }
                if (Array.isArray(req.query.populate)) {
                    req.query.populate.array.forEach(populateElem => {
                        orders.populate(populateElem);
                    });
                }         
            }
            const orderResult = await orders.exec();
            res.status(200).json({
                message: 'Handling GET requests to /orders',
                result: orderResult
            });
          } catch (err) {
            res.status(500).json({
                message: err.message
            });
          }
    }

    static async find(req, res, next){
        try {
            const order = await Order.findById(req.params.id);
            res.status(200).json({
                message: 'Handling GET requests to /orders',
                result: order
            });
          } catch (err) {
            res.status(500).json({
                message: err.message
            });
          }
    }

    static async create(req, res, next){
        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            products: req.body.products
        });
        try {
            await order.save();
            res.status(201).json({
                message: 'Handling POST requests to /orders',
                result: order
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    static async update(req, res, next){
        try {
            await Order.findByIdAndUpdate(req.params.id, req.body);
            const orderUpdated = await Order.findById(req.params.id);
            res.status(200).json({
                message: 'Handling PATCH requests to /orders',
                result: orderUpdated
            });
          } catch (err) {
            res.status(500).json({
                message: err.message
            });
          }
    }

    static async delete(req, res, next){
      try {  
        const orderDeleted = await Order.findByIdAndDelete(req.params.id);
        if (orderDeleted) {
            res.status(204).json({
                message: 'Handling DELETE requests to /orders'
            });
        } else {
            res.status(404).json({
                message: 'Order Not Found'
            });
        }
      } catch (err) {
        res.status(500).json({
            message: err.message
        });
      }
    }
}


module.exports.OrdersController = OrdersController;