const { Router } = require('express');
const ProductsController = require('../controllers/ProductsController');

const route = Router();

const productsController = new ProductsController();

route.get('/', (req, res) => productsController.getAll(req, res));

module.exports = route;
