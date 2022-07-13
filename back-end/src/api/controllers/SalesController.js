const { StatusCodes } = require('http-status-codes');
const SalesService = require('../services/SalesService');

class SalesController {
  constructor() {
    this.salesService = new SalesService();
  }

  async getByUser(req, res) {
    // userId tem que ser desestruturado do middleware de autenticação, modificar amanhã.
    const { userId } = req.body;

    const salesFound = await this.salesService.getByUser(userId);

    res.status(StatusCodes.OK).json(salesFound);
  }

  async getById(req, res) {
    const { id } = req.params;

    const saleFound = await this.salesService.getById(id);

    res.status(StatusCodes.OK).json(saleFound);
  }

  async create(req, res) {
    // userId tem que ser desestruturado do middleware de autenticação, modificar amanhã.
    const { userId, totalPrice, deliveryAddress, deliveryNumber, saleProducts } = req.body;

    const saleId = await this.salesService.create({
      userId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      saleProducts,
    });

    res.status(StatusCodes.CREATED).json({ saleId });
  }
}

module.exports = SalesController;
