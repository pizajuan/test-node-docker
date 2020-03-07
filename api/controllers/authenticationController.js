const auth = require('../middleware/auth');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

class AuthenticationController {

    static async login(req, res, next){
        try {
            const user = await User.findOne({ username: req.body.username });
            // TODO: chequear el password con bcript
            const hash = user.password;
            if(bcrypt.compareSync(req.body.password, hash)) {
                // Passwords match
                const token = auth.authenticate(user);
                res.status(200).json({
                    message: 'Success',
                    result: token
                });
               } else {
                // Passwords don't match
                res.status(401).json({
                    message: 'Unauthorized'
                });
               }
          } catch (err) {
            throw err;
          }
    }
}


module.exports.AuthenticationController = AuthenticationController;