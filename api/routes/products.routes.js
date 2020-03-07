const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const auth = require('../middleware/auth');
// const http = require('http-client-ext');
// console.log(auth);
// console.log(http);

router.get('/', auth.verifyToken, productsController.ProductsController.getAllProducts);
// router.get('/', productsController.ProductsController.getAllProducts);

router.post('/', auth.verifyToken, productsController.ProductsController.createProduct);

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID!',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated Product!'
    });
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted Product!'
    });
});

module.exports = router;