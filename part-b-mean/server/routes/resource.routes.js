const express = require('express');
const resourceController = require('../controllers/resource.controller');
const { requireAuth, requireAdmin } = require('../middleware/auth.middleware');
const validate = require('../middleware/request.validator.middleware');
const { getResourcesByTypeAndCategory } = require('../validators/resource.validator');

const router = express.Router();

// USERS ROUTES

// Get all resources
router.get('/', resourceController.getAllResources);

// Get resource by ID
router.get('/:id', resourceController.getResourceById);

// Search resources by type and category
router.post('/search', validate(getResourcesByTypeAndCategory), resourceController.getResourcesByTypeAndCategory);

// ADMIN ROUTES

// Create resources
router.post('/', requireAuth, requireAdmin, resourceController.createResource);

// Update resources
router.put('/:id', requireAuth, requireAdmin, resourceController.updateResource);

// Delete resources
router.delete('/:id', requireAuth, requireAdmin, resourceController.deleteResource);

module.exports = router;