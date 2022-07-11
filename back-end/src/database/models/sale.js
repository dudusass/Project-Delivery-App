module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    userId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL(4,2),
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: DataTypes.DATETIME,
    status: DataTypes.STRING,
  }, {
    timestamp: false,
    underscored: true,
    table: 'sales'
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, { as: 'user', foreignKey: 'userId'});
    Sale.belongsTo(models.User, { as: 'user', foreignKey: 'sellerId'});
    Sale.hasMany(models.SaleProduct, { as: 'saleProduct', foreignKey: 'saleId'});
  }

  return Sale;
}