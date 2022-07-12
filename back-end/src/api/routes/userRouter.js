const express = require('express');
const UsersController = require('../controllers/UsersController');
const UsersMiddleware = require('../middleware/UsersMidlleware');

const router = express.Router();
const usersController = new UsersController();
const usersMiddleware = new UsersMiddleware();

router.post(
  '/login', 
  (req, res, next) => usersMiddleware.verifyEmail(req, res, next),
  (req, res, next) => usersMiddleware.verifyPassword(req, res, next),
  (req, res) => usersController.login(req, res),
);

module.exports = router;