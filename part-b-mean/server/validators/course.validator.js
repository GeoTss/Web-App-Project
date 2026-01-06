const { body } = require('express-validator');
const { DifficultyLookup, CategoryLookup } = require('../models/constants');

exports.getCoursesByDifficultyAndCategory = [
    body('preferences').isObject(),
    body('preferences.difficulties').optional().isArray().custom(array =>
        array.every(difficulty => 
            Object.values(DifficultyLookup).includes(difficulty)
        )
    ),
    body('preferences.categories').optional().isArray().custom(array =>
        array.every(category => 
            Object.values(CategoryLookup).includes(category)
        )
    ),
];
