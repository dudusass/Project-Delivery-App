const { Product } = require('../../database/models');

class ProductsModel {
  constructor() {
    this.product = Product;
  }

  async getAll() {
    return this.product.findAll();
  }

  async getById(id) {
    return this.product.findByPk(id);
  }
}

module.exports = ProductsModel;
