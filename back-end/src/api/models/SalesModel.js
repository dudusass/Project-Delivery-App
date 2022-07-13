const Sequelize = require('sequelize');
const config = require('../../database/config/config');
const { Sale, Product, SaleProduct } = require('../../database/models');

class SalesModel {
  constructor() {
    this.sale = Sale;
    this.saleProduct = SaleProduct;
    this.sequelize = new Sequelize(config.development);
  }

  async getByUser(userId) {
    return this.sale.findAll({ where: { userId } });
  }

  // Team que devolver os produtos também.
  async getById(id) {
    console.log('ola!', id);
    return this.sale.findOne({
      where: { id },
      include: [
        {
          model: SaleProduct,
          as: 'saleProduct',
          include: [{ model: Product, as: 'product' }],
          attributes: { exclude: ['saleId', 'productId'] },
        },
      ],
      // include: [{ model: SalesProduct, as: 'sales' }],
    });
  }

  async create(sale) {
    const { userId, totalPrice, deliveryAddress, deliveryNumber, saleProducts } = sale;

    const saleId = await this.sequelize.transaction(async (t) => {
      const saleCreated = await this.sale.create(
        { userId, totalPrice, deliveryAddress, deliveryNumber },
        { transaction: t },
      );

      // Verificar se vai funcionar por que disseram que o forEach  não funciona bem com async await
      await Promise.all(
        saleProducts.map(async ({ productId, quantity }) => {
          await this.saleProduct.create(
            { saleId: saleCreated.id, productId, quantity },
            { transaction: t },
          );
        }),
      );

      return saleCreated.id;
    });

    return saleId;
  }
}

module.exports = SalesModel;
