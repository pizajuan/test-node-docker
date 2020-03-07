const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authenticationController');
const usersController = require('../controllers/usersController');
// const auth = require('../middleware/auth');

router.post('/register', usersController.UsersController.createUser);
router.post('/login', authenticationController.AuthenticationController.login);

module.exports = router;