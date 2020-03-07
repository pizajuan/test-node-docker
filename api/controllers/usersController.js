const User = require('../models/user.model');
const mongoose = require('mongoose');

class UsersController {

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
}


module.exports.UsersController = UsersController;