const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

// Register Route
router.post('/register', userController.register);
// Login Route
router.post('/login', userController.login);


module.exports = router;