const mongoose = require('mongoose');
const { Schema } = mongoose;
const { CategoryLookup, DifficultyLookup } = require('./constants');

const CourseSchema = Schema(
    {
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        title: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        difficulty: {
            type: String,
            required: true,
            enum: Object.values(DifficultyLookup),
        },
        category: {
            type: Number,
            required: true,
            enum: Object.values(CategoryLookup),
        },
    }, 
    {
        timestamps: true,
    } 
);

const course = mongoose.model('Course', CourseSchema);

module.exports = course;