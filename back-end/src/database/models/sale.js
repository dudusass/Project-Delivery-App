module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    'Sale',
    {
      userId: DataTypes.INTEGER,
      sellerId: DataTypes.INTEGER,
      totalPrice: DataTypes.DECIMAL(4, 2),
      deliveryAddress: DataTypes.STRING,
      deliveryNumber: DataTypes.STRING,
      saleDate: DataTypes.DATE,
      status: DataTypes.STRING,
    },
    {
      timestamps: false,
      underscored: true,
      table: 'sales',
    },
  );

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
    Sale.belongsTo(models.User, { as: 'seller', foreignKey: 'sellerId' });
    Sale.hasMany(models.SalesProduct, {
      as: 'salesProduct',
      foreignKey: 'saleId',
    });
  };

  return Sale;
};
