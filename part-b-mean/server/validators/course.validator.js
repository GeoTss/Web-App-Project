const { body } = require('express-validator');
const { DifficultyLookup, CategoryLookup } = require('../models/constants');

exports.getCoursesByDifficultyAndCategory = [
    body('difficulty').optional().isArray().custom(array =>
        array.every(difficulty =>
            Object.values(DifficultyLookup).includes(difficulty)
        )
    ).withMessage('Invalid difficulty value'),
    body('category').optional().isArray().custom(array =>
        array.every(category =>
            Object.values(CategoryLookup).includes(category)
        )
    ).withMessage('Invalid category value'),
];
