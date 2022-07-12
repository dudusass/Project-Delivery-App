const md5 = require('md5');
const { NotFoundError } = require('restify-errors');
const UserModel = require('../models/UserModel');
const JwtGenerator = require('../../utils/JwtGenerator');

class UsersService {
  constructor() {
    this.userModel = new UserModel();
  }

  async login(email, password) {
    const user = await this.userModel.getByEmail(email);
    if (user && user.password === md5(password)) {
      const token = JwtGenerator.generateToken(user.id, user.name, email);
      const { name, role } = user;
      return {
        name,
        email,
        role,
        token,
      };
    }
    throw new NotFoundError('invalid credentials');
  }
}

module.exports = UsersService;