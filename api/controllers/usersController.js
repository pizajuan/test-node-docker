const User = require('../models/user.model');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

class UsersController {

    static async createUser(req, res, next){
        const passwordHashed = bcrypt.hashSync(req.body.password, 10);
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            password: passwordHashed
        });
        try {
            await user.save();
            const userSaved = {
                _id: user._id,
                username: user.username
            };
            res.status(201).json({
                message: 'User register Success!',
                result: userSaved
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
}


module.exports.UsersController = UsersController;