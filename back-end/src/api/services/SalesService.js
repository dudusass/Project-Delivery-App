const { NotFoundError, UnauthorizedError, BadRequestError } = require('restify-errors');
const { statusValidatorClient, statusValidatorSeller } = require('../../utils/statusValidate');
const SalesModel = require('../models/SalesModel');
const UserModel = require('../models/UserModel');
const ProductsModel = require('../models/ProductsModel');

class SalesService {
  constructor() {
    this.salesModel = new SalesModel();
    this.usersModel = new UserModel();
    this.productsModel = new ProductsModel();
  }

  async getByUser(userId) {
    return this.salesModel.getByUser(userId);
  }

  async getBySeller(sellerId) {
    return this.salesModel.getBySeller(sellerId);
  }

  async getById(id) {
    const saleFound = await this.salesModel.getById(id);

    if (!saleFound) throw new NotFoundError('Sale not found');

    return saleFound;
  }

  async create(sale) {
    const { sellerId } = sale;

    const userFound = await this.usersModel.getById(sellerId);

    if (!userFound) throw new NotFoundError('Seller not found');

    await this.validateSaleProducts(sale);

    return this.salesModel.create(sale);
  }

  async changeStatus(status, saleId, role) {
    await this.getById(saleId);
    if (statusValidatorClient(role, status) || statusValidatorSeller(role, status)) {
      return this.salesModel.changeStatus(saleId, status);
    }
    throw new UnauthorizedError('Access denied');
  }

  async validateSaleProducts(sale) {
    const { totalPrice, saleProducts } = sale;
    let productError = false;

    const totalProductsPrice = await saleProducts.reduce(async (previousValue, currentValue) => {
      const productFound = await this.productsModel.getById(currentValue.productId);

      if (!productFound) {
        productError = true;
      } else {
        const total = (await previousValue) + productFound.price * currentValue.quantity;
        return total;
      }
    }, 0);

    if (productError) {
      throw new NotFoundError('There is a product not registered in the database!');
    }

    if (totalPrice !== totalProductsPrice) {
      throw new BadRequestError('The totalPrice must equal the total of all products!');
    }
  }
}

module.exports = SalesService;
