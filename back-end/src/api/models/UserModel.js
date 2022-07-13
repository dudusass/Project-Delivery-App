const { User } = require('../../database/models');

class UserModel {
  constructor() {
    this.user = User;
  }

  async getByEmail(email) {
    const user = await this.user.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  async getByName(name) {
    const user = await this.user.findOne({
      where: {
        name,
      },
    });

    return user;
  }

  async create(admin, payload) {
    const { isAdmin } = admin;
    const { name, email, password, role } = payload;

    if (isAdmin) {
      await this.user.create({
        name, 
        email,
        password,
        role,
      });
    } else {
      await this.user.create({
        name, 
        email,
        password,
      });
    }
  }
}

module.exports = UserModel;