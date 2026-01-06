const { body } = require('express-validator');
const { ROLES } = require('../models/constants');

exports.registerUser = [
  body('username').isString().notEmpty(),
  body('email').isEmail(),
  body('password').isString().isLength({ min: 8 }),

  body('preferences').optional().isObject(),
  body('preferences.categories').optional().isArray(),
  body('preferences.difficulties').optional().isArray(),

  body('role').optional().isInt().isIn([ROLES.USER, ROLES.ADMIN])
];

exports.loginUser = [
    body('username').isString().notEmpty(),
    body('password').isString().notEmpty()
];

exports.updateUser = [
  body('username').optional().isString().notEmpty(),
  body('email').optional().isEmail(),
  body('password').optional().isString().isLength({ min: 8 }),

  body('preferences').optional().isObject(),
  body('preferences.categories').optional().isArray(),
  body('preferences.difficulties').optional().isArray(),
];