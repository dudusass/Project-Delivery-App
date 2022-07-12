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
}

module.exports = UserModel;