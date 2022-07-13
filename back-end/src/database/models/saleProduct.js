module.exports = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define(
    'SalesProduct',
    {
      saleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      quantity: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      underscored: true,
      table: 'sales_products',
    },
  );

  SalesProduct.associate = (models) => {
    SalesProduct.belongsTo(models.Sale, { as: 'sales', foreignKey: 'saleId' });
    SalesProduct.belongsTo(models.Product, {
      as: 'product',
      foreignKey: 'productId',
    });
  };

  return SalesProduct;
};
