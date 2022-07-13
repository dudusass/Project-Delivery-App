const validator = require('email-validator');
const { BadDigestError } = require('restify-errors');

class UsersMiddleware {
  constructor() {
    this.invalidFieldMessage = 'All fields must be filled';
  }

   verifyName(req, res, next) {
    const { name } = req.body;
    if (!name) {
      throw new BadDigestError(this.invalidFieldMessage);
    }

    if (name.length < 12) {
      throw new BadDigestError('"name" length must be equal or greater than 12');
    }
    return next();
  }

  verifyEmail(req, res, next) {
    const { email } = req.body;
    if (!email) {
      throw new BadDigestError(this.invalidFieldMessage);
    }
    const valid = validator.validate(email);
    if (!valid) {
      throw new BadDigestError('Please provide a valid email adress');
    }
    return next();
  }

  verifyPassword(req, res, next) {
    const { password } = req.body;
    if (!password) {
      throw new BadDigestError(this.invalidFieldMessage);
    }

    if (password.length < 8) {
      throw new BadDigestError('"password" length must be equal or greater than 6');
    }
    return next();
  }
}

module.exports = UsersMiddleware;