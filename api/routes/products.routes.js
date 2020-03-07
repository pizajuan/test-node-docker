const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const auth = require('../middleware/auth');

router.get('/', auth.verifyToken, productsController.ProductsController.getAllProducts);
router.get('/:id', auth.verifyToken, productsController.ProductsController.getProduct);
router.post('/', auth.verifyToken, productsController.ProductsController.createProduct);
router.patch('/:id', auth.verifyToken, productsController.ProductsController.updateProduct);
router.delete('/:id', auth.verifyToken, productsController.ProductsController.deleteProduct);

module.exports = router;