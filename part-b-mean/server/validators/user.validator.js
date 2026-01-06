const { body } = require('express-validator');
const { ROLES } = require('../models/constants');

exports.registerUser = [
  body('username').isString().notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isString().isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),

  body('category').optional().isArray().withMessage('Category must be an array'),
  body('difficulty').optional().isArray().withMessage('Difficulty must be an array'),

];

exports.loginUser = [
    body('username').isString().notEmpty().withMessage('Username is required'),
    body('password').isString().notEmpty().withMessage('Password is required')
];

exports.updateUser = [
  body('username').optional().isString().notEmpty().withMessage('Username cannot be empty'),
  body('email').optional().isEmail().withMessage('Invalid email address'),
  body('password').optional().isString().isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),

  body('category').optional().isArray().withMessage('Category must be an array'),
  body('difficulty').optional().isArray().withMessage('Difficulty must be an array'),
];