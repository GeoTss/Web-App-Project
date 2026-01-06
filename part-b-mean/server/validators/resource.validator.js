const { body } = require('express-validator');
const { CategoryLookup, ResourceTypeLookup } = require('../models/constants');

exports.getResourcesByTypeAndCategory = [
    body('filters').isObject(),
    body('filters.type').optional().isArray().custom(array =>
        array.every(type => 
            Object.values(ResourceTypeLookup).includes(type)
        )
    ),
    body('filters.category').optional().isArray().custom(array =>
        array.every(category => 
            Object.values(CategoryLookup).includes(category)
        )
    ),
];