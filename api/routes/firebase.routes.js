const express = require('express');
const router = express.Router();
const firebaseController = require('../controllers/firebaseController');

router.post('/send', firebaseController.FirebaseController.send);

module.exports = router;