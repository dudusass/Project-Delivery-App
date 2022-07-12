const fs = require('fs');
const jwt = require('jsonwebtoken');

class JwtGenerator {
  static generateToken(id, name, email) {
    const data = {
      id, 
      name,
      email,
    };
    const jwtConfig = {
      expiresIn: '5h',
      algorithm: 'HS256',
    };
    const SECRET = fs.readFileSync('./jwt.evaluation.key');

    const token = jwt.sign(data, SECRET, jwtConfig);

    return token;
  }
}

module.exports = JwtGenerator;