const auth = require('../middleware/auth');
const User = require('../models/user.model');
// const mongoose = require('mongoose');

class AuthenticationController {

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