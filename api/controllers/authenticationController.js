const auth = require('../middleware/auth');
const User = require('../models/user.model');
const mongoose = require('mongoose');

class AuthenticationController {

    // TODO: esta funcion moverla a UserController
    static async createUser(req, res, next){
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            password: req.body.password
        });
        try {
            await user.save();
            res.status(201).json({
                message: 'User register Success!',
                user: user
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    static async login(req, res, next){
        try {
            const user = await User.findOne({ username: req.body.username });
            // TODO: chequear el password con bcript
            if (user) {
                const token = auth.authenticate(user);
                res.status(200).json({
                    message: 'Success',
                    token: token
                });
            } else {
                throw err;
            }
          } catch (err) {
            throw err;
          }
    }
}


module.exports.AuthenticationController = AuthenticationController;