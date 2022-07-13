const { Router } = require('express');
const SalesController = require('../controllers/SalesController');

const route = Router();

const salesController = new SalesController();

route
  .get('/', (req, res) => salesController.getByUser(req, res))
  .get('/:id', (req, res) => salesController.getById(req, res))
  .post('/', (req, res) => salesController.create(req, res));

module.exports = route;
