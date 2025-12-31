const express = require('express');
const userController = require('../controllers/user.controller');
const requireAuth = require('../middleware/auth.middleware');

const router = express.Router();

// Register Route
router.post('/register', userController.register);
// Login Route
router.post('/login', userController.login);
// Logout Route
router.post('/logout', userController.logout);
// Get Current User Route
router.get('/me', requireAuth, userController.getCurrentUser);


module.exports = router;