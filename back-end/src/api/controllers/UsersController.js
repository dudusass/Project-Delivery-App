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

  async create(req, res) {
    await this.usersService.create(req.body);
    return res.status(StatusCodes.CREATED).end();
  }

  async adminCreate(req, res) {
    await this.usersService.adminCreate(req.body);
    return res.status(StatusCodes.CREATED).end();
  }
}

module.exports = UsersController;