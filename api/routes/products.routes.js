const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const auth = require('../middleware/auth');

router.get('/', auth.verifyToken, productsController.ProductsController.findAll);
router.get('/:id', auth.verifyToken, productsController.ProductsController.find);
router.post('/', auth.verifyToken, productsController.ProductsController.create);
router.patch('/:id', auth.verifyToken, productsController.ProductsController.update);
router.delete('/:id', auth.verifyToken, productsController.ProductsController.delete);

module.exports = router;