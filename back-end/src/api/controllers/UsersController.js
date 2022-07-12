const { StatusCodes } = require('http-status-codes');
const UsersService = require('../services/UsersService');

class UsersController {
  constructor() {
    this.usersService = new UsersService();
  }

  async login(req, res) {
    const { email, password } = req.body;
    
    const result = await this.usersService.login(email, password);
    return res.status(StatusCodes.OK).json(result);
  }
}

module.exports = UsersController;