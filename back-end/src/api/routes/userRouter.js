const express = require('express');
const UsersController = require('../controllers/UsersController');
const UsersMiddleware = require('../middleware/UsersMidlleware');
const AuthMiddleware = require('../middleware/AuthMiddleware');

const router = express.Router();
const usersController = new UsersController();
const usersMiddleware = new UsersMiddleware();
const auth = new AuthMiddleware();

router.post(
  '/users/login', 
  (req, res, next) => usersMiddleware.verifyEmail(req, res, next),
  (req, res, next) => usersMiddleware.verifyPassword(req, res, next),
  (req, res) => usersController.login(req, res),
);

router.post(
  '/users/register',
  (req, res, next) => usersMiddleware.verifyEmail(req, res, next),
  (req, res, next) => usersMiddleware.verifyName(req, res, next),
  (req, res, next) => usersMiddleware.verifyPassword(req, res, next),
  (req, res) => usersController.create(req, res),
);

router.post(
  '/admin/register',
  (req, res, next) => auth.verifyToken(req, res, next),
  (req, res, next) => usersMiddleware.verifyEmail(req, res, next),
  (req, res, next) => usersMiddleware.verifyName(req, res, next),
  (req, res, next) => usersMiddleware.verifyPassword(req, res, next),
  (req, res, next) => usersMiddleware.verifyRole(req, res, next),
  (req, res) => usersController.adminCreate(req, res),
);

module.exports = router;