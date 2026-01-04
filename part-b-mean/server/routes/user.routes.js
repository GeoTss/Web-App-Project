const express = require('express');
const userController = require('../controllers/user.controller');
const { requireAuth } = require('../middleware/auth.middleware');

const router = express.Router();

// Register User Route
router.post('/register', userController.register);

// Login User Route
router.post('/login', userController.login);

// Logout User Route
router.post('/logout', userController.logout);

// Get Current User Route
router.get('/me', userController.getCurrentUser);

// Update User Profile Route
router.put('/me', requireAuth, userController.updateUserProfile);

// Delete User Route
router.delete('/me', requireAuth, userController.deleteUser);

module.exports = router;