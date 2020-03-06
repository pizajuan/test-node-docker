const jwt = require('jsonwebtoken');

function verifyToken(req, res, next){
  // try {
  //   const token = req.headers.authorization.split(' ')[1];
  //   const decodedToken = jwt.verify(token, 'SECRET_TOKEN');
  //   const userId = decodedToken.userId;
  //   if (req.body.userId && req.body.userId !== userId) {
  //     throw 'Invalid user ID';
  //   } else {
  //     next();
  //   }
  // } catch {
  //   res.status(401).json({
  //     error: new Error('Invalid request!')
  //   });
  // }
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'SECRET_TOKEN');
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
  const token = jwt.sign(payload, 'SECRET_TOKEN', {
    expiresIn: 1440
  });
  return token;
}

// module.exports = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
//     const userId = decodedToken.userId;
//     if (req.body.userId && req.body.userId !== userId) {
//       throw 'Invalid user ID';
//     } else {
//       next();
//     }
//   } catch {
//     res.status(401).json({
//       error: new Error('Invalid request!')
//     });
//   }
// };

module.exports.verifyToken = verifyToken;
module.exports.authenticate = authenticate;