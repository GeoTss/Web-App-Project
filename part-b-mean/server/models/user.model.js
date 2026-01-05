const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ROLES } = require('./constants');

const UserSchema = Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },
        preferences: {
            categories: {
                type: Array,
                required: false,
            },
            difficulties: {
                type: Array,
                required: false,
            }
        },
        role: {
            type: Number,
            required: true,
            enum: [ROLES.USER, ROLES.ADMIN],
            default: ROLES.USER
        }
    },
    {
        timestamps: true,
    }
);

const user = mongoose.model('User', UserSchema);

module.exports = user;
