const jwt = require('jsonwebtoken');
const fs = require('fs');
const { UnauthorizedError } = require('restify-errors');

class AdminAuthMiddleware {
  constructor() {
    this.secret = fs.readFileSync('./jwt.evaluation.key');
  }
  
  verifyToken(req, res, next) {
    const { authorization: token } = req.headers;
    if (token) {
      const decoded = jwt.verify(token, this.secret);
      req.body.decoded = decoded;
      console.log(decoded);
      if (decoded.role !== 0) {
        throw new UnauthorizedError('Access denied');
      }
      next();
    } else {
      throw new UnauthorizedError('missing authorization token');
    }
  }
}

module.exports = AdminAuthMiddleware;