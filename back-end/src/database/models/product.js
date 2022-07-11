module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(4,2),
    urlImage: DataTypes.STRING,
  }, {
    timestamp: false,
    underscored: true,
    table: 'products'
  });

  Product.associate = (models) => {
    Product.hasMany(models.SaleProduct, { as: 'saleProducts', foreignKey: 'productId'});
  }

  return Product;
}