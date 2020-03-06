const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authenticationController');
const auth = require('../middleware/auth');

router.post('/register', authenticationController.AuthenticationController.createUser);
router.post('/login', authenticationController.AuthenticationController.login);

module.exports = router;