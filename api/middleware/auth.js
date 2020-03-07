const jwt = require('jsonwebtoken');
const config = require('../../config');

function verifyToken(req, res, next){
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, config.SecretToken);
  if (decodedToken) {
    next();
  } else {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};

function authenticate(user) {
  const payload = {
    id: user._id,
    username:  user.username
  };
  const token = jwt.sign(payload, config.SecretToken, {
    expiresIn: 1440
  });
  return token;
}

module.exports.verifyToken = verifyToken;
module.exports.authenticate = authenticate;