module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define(
    "SaleProduct",
    {
      saleId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      timestamp: false,
      underscored: true,
      table: "sales_products",
    }
  );

  SaleProduct.associate = (models) => {
    SaleProduct.belongsTo(models.Sale, { as: "sales", foreignKey: "saleId" });
    SaleProduct.belongsTo(models.Product, {
      as: "product",
      foreignKey: "productId",
    });
  };

  return SaleProduct;
};
