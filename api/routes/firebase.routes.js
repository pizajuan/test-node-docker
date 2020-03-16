const express = require('express');
const router = express.Router();
const firebaseController = require('../controllers/firebaseController');

router.post('/send', firebaseController.FirebaseController.send);
router.get('/products/list', firebaseController.FirebaseController.listProducts);
router.post('/products/create', firebaseController.FirebaseController.createProduct);

module.exports = router;