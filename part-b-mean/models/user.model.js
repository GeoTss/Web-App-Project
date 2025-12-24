const mongoose = require('mongoose');
const { Schema } = mongoose;

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
            unique: true,
        },

        preferences: {
            type: Map,
            of: String,
            unique: false,
        }
    },  
    {
        timestamps: true,
    } 
);

const user = mongoose.model('User', UserSchema);

module.exports = user;
