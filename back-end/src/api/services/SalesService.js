const { NotFoundError } = require('restify-errors');
const SalesModel = require('../models/SalesModel');

class SalesService {
  constructor() {
    this.salesModel = new SalesModel();
  }

  async getByUser(userId) {
    const salesFound = await this.salesModel.getByUser(userId);

    if (!salesFound || salesFound.length === 0) throw new NotFoundError('Not a sale found');

    return salesFound;
  }

  async getBySeller(sellerId) {
    const salesFound = await this.salesModel.getBySeller(sellerId);

    if (!salesFound || salesFound.length === 0) throw new NotFoundError('Not a sale found');

    return salesFound;
  }

  async getById(id) {
    const saleFound = await this.salesModel.getById(id);

    if (!saleFound) throw new NotFoundError('Sale not found');

    return saleFound;
  }

  async create(sale) {
    return this.salesModel.create(sale);
  }
}

module.exports = SalesService;
