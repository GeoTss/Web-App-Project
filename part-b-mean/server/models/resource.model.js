const mongoose = require('mongoose');
const { Schema } = mongoose;
const { CategoryLookup } = require('./constants');
const { resourceTypeLookup } = require('../../client/src/modules/category-utils');

const ResourceSchema = Schema(
    {
        type: {
            type: Number,
            required: true,
            enum: [resourceTypeLookup.BOOK, resourceTypeLookup.VIDEO],
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
module.exports = resource;

