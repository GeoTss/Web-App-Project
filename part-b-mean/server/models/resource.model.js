const mongoose = require('mongoose');
const { Schema } = mongoose;
const { CategoryLookup } = require('./constants');

const ResourceSchema = Schema(
    {
        type: {
            type: String,
            required: true,
            enum: ['BOOK', 'VIDEO'],
        },
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        coverImage: {
            type: String,
            required: false,
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

const resource = mongoose.model('Resource', ResourceSchema);
modules.exports = resource;

