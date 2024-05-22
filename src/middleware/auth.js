const jwt = require('jsonwebtoken');
const ResponseError = require('../error/response-error');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    throw new ResponseError(401, 'No token provided');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      throw new ResponseError(401, err.message);
    }
    req.user = decoded.user;
    next();
  });
};

module.exports = verifyToken;
