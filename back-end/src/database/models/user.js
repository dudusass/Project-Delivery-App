module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.INTEGER,
  }, {
    timestamp: false,
    underscored: false,
    table: 'users'
  });

  User.associate = (models) => {
    User.hasMany(models.Sale, { as: 'user', foreignKey: 'userId'});
    User.hasMany(models.Sale, { as: 'seller', foreignKey: 'sellerId'});
  }

  return User;
}

