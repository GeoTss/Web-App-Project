const express = require('express');
const userController = require('../controllers/user.controller');
const { requireAuth } = require('../middleware/auth.middleware');
const validate = require('../middleware/request.validator.middleware');
const { registerUser, loginUser, updateUser } = require('../validators/user.validator');

const router = express.Router();

// USERS ROUTES

// Register User Route
router.post('/register', validate(registerUser), userController.register);

// Login User Route
router.post('/login', validate(loginUser), userController.login);

// Logout User Route
router.post('/logout', userController.logout);

// Get Current User Route
router.get('/me', userController.getCurrentUser);

// Update User Profile Route
router.put('/me', requireAuth, validate(updateUser), userController.updateUserProfile);

// Delete User Route
router.delete('/me', requireAuth, userController.deleteUser);

module.exports = router;