const express = require('express');
const router = express.Router();

const ordersController = require('../controllers/ordersController');
const auth = require('../middleware/auth');

router.get('/', auth.verifyToken, ordersController.OrdersController.findAll);
router.get('/:id', auth.verifyToken, ordersController.OrdersController.find);
router.post('/', auth.verifyToken, ordersController.OrdersController.create);
router.patch('/:id', auth.verifyToken, ordersController.OrdersController.update);
router.delete('/:id', auth.verifyToken, ordersController.OrdersController.delete);

module.exports = router;