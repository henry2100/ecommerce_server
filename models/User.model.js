const mongoose = require('mongoose');

//Define Schema
const Schema = mongoose.Schema;

// User Schema
const UserSchema = new Schema(
    {
        firstname: {
            type: String,
            required: true,
            index: {
                unique: false
            }
        },
        lastname: {
            type: String,
            required: true,
            index: {
                unique: false
            }
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        country: {
            type: Object,
            required: true
        },
        role: {
            type: String,
            required: true,
            enum: ['seller', 'buyer'],
            default: 'buyer'
        },
        imageUrl: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('user', UserSchema);

module.exports = User;