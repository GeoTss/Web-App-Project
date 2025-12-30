const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

// Register Route
router.post('/api/users/register', userController.register);
// Login Route
router.post('/api/users/login', userController.login);


module.exports = router;