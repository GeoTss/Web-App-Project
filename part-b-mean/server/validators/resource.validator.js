const { body } = require('express-validator');
const { CategoryLookup, ResourceTypeLookup } = require('../models/constants');

exports.getResourcesByTypeAndCategory = [
    body('type').optional().isArray().custom(array =>
        array.every(type =>
            Object.values(ResourceTypeLookup).includes(type)
        )
    ).withMessage('Invalid resource type value'),
    body('category').optional().isArray().custom(array =>
        array.every(category =>
            Object.values(CategoryLookup).includes(category)
        )
    ).withMessage('Invalid category value'),
];